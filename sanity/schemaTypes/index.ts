import { type SchemaTypeDefinition } from 'sanity'
import { metaData } from './metaData'
import { faqAnswer } from './faqAnswer'
import { page } from './page'
import { programPage } from './programPage'
import { resourcePage } from './resourcePage'
import { lead } from './lead'
import { post } from './post'
import { vancouverPage } from './vancouverPage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [metaData, faqAnswer, page, programPage, resourcePage, lead, post, vancouverPage],
}
