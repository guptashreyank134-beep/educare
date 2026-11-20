/** Choose the newest known content date, never substituting the build time. */
export function latestContentDate(
  ...dates: Array<string | null | undefined>
): string | undefined {
  let latest: string | undefined;
  let latestTime = -Infinity;
  for (const date of dates) {
    if (!date) continue;
    const time = Date.parse(date);
    if (Number.isFinite(time) && time > latestTime) {
      latest = date;
      latestTime = time;
    }
  }
  return latest;
}
