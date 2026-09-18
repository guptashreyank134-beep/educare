const urls = [
  "https://curriculum.gov.bc.ca/curriculum/science/12/chemistry",
  "https://curriculum.gov.bc.ca/provincial/assessment",
  "https://curriculum.gov.bc.ca/curriculum/mathematics/11/pre-calculus",
  "https://curriculum.gov.bc.ca/curriculum/mathematics/11/foundations-of-mathematics",
  "https://www.sfu.ca/students/admission/admission-requirements/canadian-highschool/bc-yukon.html",
  "https://you.ubc.ca/applying-ubc/requirements/canadian-high-schools/",
  "https://ibo.org/programmes/diploma-programme/",
  "https://you.ubc.ca/applying-ubc/requirements/international-baccalaureate/",
  "https://you.ubc.ca/applying-ubc/requirements/advanced-placement/",
  "https://www.sfu.ca/students/admission/admission-requirements/advanced-placement.html",
  "https://www.sfu.ca/students/admission/admission-requirements/international-baccalaureate.html",
  "https://apstudents.collegeboard.org/exam-dates",
];

async function check(url: string) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15_000);
  try {
    const res = await fetch(url, {
      redirect: "follow",
      signal: controller.signal,
      headers: { "user-agent": "Mozilla/5.0 (compatible; link-check)" },
    });
    const moved = res.url.replace(/\/$/, "") !== url.replace(/\/$/, "");
    return `${res.status}${moved ? `  -> ${res.url}` : ""}  ${url}`;
  } catch (error) {
    return `ERR (${(error as Error).name})  ${url}`;
  } finally {
    clearTimeout(timer);
  }
}

const results = await Promise.all(urls.map(check));
for (const line of results) console.log(line);
