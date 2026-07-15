import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
//
// Everything is the default document-type list, except "Page FAQs" — there are
// 122 of those (one per landing page), so they're grouped by page type instead
// of dumped into one long flat list.
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // All document types except pageFaq, which gets the grouped view below.
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== 'pageFaq'
      ),
      S.divider(),
      S.listItem()
        .title('Page FAQs')
        .child(
          S.list()
            .title('Page FAQs')
            .items([
              S.listItem()
                .title('City Pages')
                .child(
                  S.documentList()
                    .title('City Pages')
                    .filter('_type == "pageFaq" && pageType == "city"')
                    .defaultOrdering([{field: 'title', direction: 'asc'}])
                ),
              S.listItem()
                .title('University & Medical Pages')
                .child(
                  S.documentList()
                    .title('University & Medical Pages')
                    .filter('_type == "pageFaq" && pageType == "vertical"')
                    .defaultOrdering([{field: 'title', direction: 'asc'}])
                ),
              S.listItem()
                .title('SEO Landing Pages')
                .child(
                  S.documentList()
                    .title('SEO Landing Pages')
                    .filter('_type == "pageFaq" && pageType == "seo"')
                    .defaultOrdering([{field: 'title', direction: 'asc'}])
                ),
              S.divider(),
              S.listItem()
                .title('All Page FAQs')
                .child(
                  S.documentList()
                    .title('All Page FAQs')
                    .filter('_type == "pageFaq"')
                    .defaultOrdering([{field: 'title', direction: 'asc'}])
                ),
            ])
        ),
    ])
