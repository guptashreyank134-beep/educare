import ts from "typescript";

/** Compare data values, ignoring comments, indentation and string quote style. */
export function routeEntryFingerprints(source: string, arrayName: string): Map<string, string> {
  const file = ts.createSourceFile("route-data.ts", source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const bindings = new Map<string, ts.Expression>();
  for (const statement of file.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      if (ts.isIdentifier(declaration.name) && declaration.initializer) {
        bindings.set(declaration.name.text, declaration.initializer);
      }
    }
  }

  const unwrap = (node: ts.Expression): ts.Expression => {
    while (ts.isParenthesizedExpression(node) || ts.isAsExpression(node) || ts.isSatisfiesExpression(node)) {
      node = node.expression;
    }
    return node;
  };
  const propertyName = (node: ts.PropertyName): string | undefined =>
    ts.isIdentifier(node) || ts.isStringLiteral(node) || ts.isNumericLiteral(node) ? node.text : undefined;

  const fingerprint = (node: ts.Node, resolving = new Set<string>()): unknown => {
    if (ts.isStringLiteralLike(node)) return ["string", node.text];
    if (ts.isNumericLiteral(node)) return ["number", node.text];
    if (ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) return [node.kind, node.text];
    if (ts.isRegularExpressionLiteral(node) || ts.isBigIntLiteral(node)) return [node.kind, node.text];
    if (ts.isIdentifier(node)) {
      const value = bindings.get(node.text);
      if (value && !resolving.has(node.text)) return fingerprint(value, new Set([...resolving, node.text]));
      return ["identifier", node.text];
    }
    if (ts.isPropertyAssignment(node)) {
      return ["property", propertyName(node.name) ?? fingerprint(node.name, resolving), fingerprint(node.initializer, resolving)];
    }
    if (ts.isShorthandPropertyAssignment(node)) {
      return ["property", node.name.text, fingerprint(node.name, resolving)];
    }
    if (ts.isParenthesizedExpression(node) || ts.isAsExpression(node) || ts.isSatisfiesExpression(node)) {
      return fingerprint(node.expression, resolving);
    }
    const children: unknown[] = [];
    ts.forEachChild(node, (child) => { children.push(fingerprint(child, resolving)); });
    return [node.kind, ...children];
  };

  const declaration = bindings.get(arrayName);
  const array = declaration && unwrap(declaration);
  if (!array || !ts.isArrayLiteralExpression(array)) {
    throw new Error(`Cannot find the literal ${arrayName} route array in a committed snapshot`);
  }
  const result = new Map<string, string>();
  for (const entry of array.elements) {
    if (!ts.isObjectLiteralExpression(entry)) throw new Error(`Unsupported non-literal entry in ${arrayName}`);
    const slugProperty = entry.properties.find((property) =>
      ts.isPropertyAssignment(property) && propertyName(property.name) === "slug");
    if (!slugProperty || !ts.isPropertyAssignment(slugProperty) || !ts.isStringLiteralLike(slugProperty.initializer)) {
      throw new Error(`Missing literal slug in ${arrayName}`);
    }
    const slug = slugProperty.initializer.text;
    if (result.has(slug)) throw new Error(`Duplicate slug ${slug} in ${arrayName}`);
    result.set(slug, JSON.stringify(fingerprint(entry)));
  }
  return result;
}

export type RouteSnapshot = { date: string; entries: Map<string, string> };

/** Snapshots arrive newest-first along Git's first-parent history. */
export function routeDatesFromSnapshots(history: Iterable<RouteSnapshot>, slugs: string[]): Map<string, string> {
  const remaining = new Set(slugs);
  const dates = new Map<string, string>();
  let newer: RouteSnapshot | undefined;
  for (const older of history) {
    if (!newer) {
      // A removed entry must not borrow a date from older history if a caller
      // accidentally asks for a slug absent from the current committed data.
      for (const slug of remaining) if (!older.entries.has(slug)) remaining.delete(slug);
    }
    if (newer) {
      for (const slug of remaining) {
        if (newer.entries.has(slug) && newer.entries.get(slug) !== older.entries.get(slug)) {
          dates.set(slug, newer.date);
          remaining.delete(slug);
        }
      }
      if (!remaining.size) return dates;
    }
    newer = older;
  }
  // An entry present in the oldest snapshot was introduced by that commit.
  if (newer) {
    for (const slug of remaining) {
      if (newer.entries.has(slug)) dates.set(slug, newer.date);
    }
  }
  return dates;
}
