import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  requestTagPrefix: 'educare.website',
  useCdn: false, // The app uses ISR (export const revalidate), so keep this false to avoid serving stale CDN data
})
