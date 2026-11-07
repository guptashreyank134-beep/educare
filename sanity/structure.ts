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
        (item) => !['pageFaq', 'studyClubPage', 'optimizationTask'].includes(item.getId() ?? '')
      ),
      S.listItem()
        .title('SEO, AEO & GEO Optimization Tasks')
        .child(
          S.list()
            .title('Optimization Tasks')
            .items([
              S.listItem()
                .title('Active Tasks')
                .child(
                  S.documentList()
                    .title('Active Tasks')
                    .filter('_type == "optimizationTask" && status != "complete"')
                    .defaultOrdering([{field: 'dueDate', direction: 'asc'}])
                ),
              S.listItem()
                .title('AI Mentions & Citations (GEO)')
                .child(
                  S.documentList()
                    .title('GEO Tasks')
                    .filter('_type == "optimizationTask" && channel == "geo"')
                    .defaultOrdering([{field: 'dueDate', direction: 'asc'}])
                ),
              S.listItem()
                .title('Local / Google Maps')
                .child(
                  S.documentList()
                    .title('Local Tasks')
                    .filter('_type == "optimizationTask" && channel == "local"')
                    .defaultOrdering([{field: 'dueDate', direction: 'asc'}])
                ),
              S.listItem()
                .title('Completed')
                .child(
                  S.documentList()
                    .title('Completed Tasks')
                    .filter('_type == "optimizationTask" && status == "complete"')
                    .defaultOrdering([{field: 'lastCheckedAt', direction: 'desc'}])
                ),
              S.divider(),
              S.documentTypeListItem('optimizationTask').title('All Tasks'),
            ])
        ),
      S.listItem()
        .title('Homework & Study Club — SEO, AEO & GEO')
        .child(
          S.document()
            .schemaType('studyClubPage')
            .documentId('studyClubPage')
            .title('Homework & Study Club')
        ),
      S.divider(),
      S.listItem()
        // These documents hold each landing page's SEO, copy AND FAQs — the old
        // "Page FAQs" label hid the location pages from editors looking for them.
        .title('Landing Pages (Locations & SEO)')
        .child(
          S.list()
            .title('Landing Pages')
            .items([
              S.listItem()
                .title('Location / City Pages')
                .child(
                  S.documentList()
                    .title('Location / City Pages')
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
                .title('All Landing Pages')
                .child(
                  S.documentList()
                    .title('All Landing Pages')
                    .filter('_type == "pageFaq"')
                    .defaultOrdering([{field: 'title', direction: 'asc'}])
                ),
            ])
        ),
    ])
