import { client } from "./client";

export type StudyClubFaq = { question: string; answer: string };

export type StudyClubCmsContent = {
  metaTitle?: string;
  metaDescription?: string;
  openGraphTitle?: string;
  openGraphDescription?: string;
  answerSummary?: string;
  faqs?: StudyClubFaq[];
  serviceDescription?: string;
  serviceAreas?: string[];
  entities?: string[];
};

const QUERY = `*[_type == "studyClubPage" && _id == "studyClubPage"][0]{
  metaTitle,
  metaDescription,
  openGraphTitle,
  openGraphDescription,
  answerSummary,
  faqs[]{question, answer},
  serviceDescription,
  serviceAreas,
  entities
}`;

export async function getStudyClubCmsContent(): Promise<StudyClubCmsContent | null> {
  try {
    return await client.fetch<StudyClubCmsContent | null>(QUERY, {}, { next: { revalidate: 3600 } });
  } catch (error) {
    console.error("Study Club CMS content could not be loaded; using code defaults.", error);
    return null;
  }
}

export function resolveCmsText(value: string | undefined, fallback: string): string {
  return value?.trim() || fallback;
}
