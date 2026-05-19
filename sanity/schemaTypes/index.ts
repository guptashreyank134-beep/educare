import { type SchemaTypeDefinition } from 'sanity'
import { metaData } from './metaData'
import { page } from './page'
import { programPage } from './programPage'
import { resourcePage } from './resourcePage'
import { lead } from './lead'
import { post } from './post'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [metaData, page, programPage, resourcePage, lead, post],
}
