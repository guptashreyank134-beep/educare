/** @format */

import {
  courseGroupsForSubject,
  COURSE_DISCLAIMER,
  type CourseSubject,
} from "@/data/universityCourses";

/**
 * Renders the "Courses We Support" table for a subject from the single source of
 * truth in data/universityCourses.ts, so every page shows an identical, verified
 * list. Includes the change-may-occur disclaimer and a no-affiliation note.
 */
export default function UniversityCourseTable({
  subject,
  heading = "Courses We Support",
  subheading = "Coverage across the local university and college curriculum",
}: {
  subject: CourseSubject | CourseSubject[];
  heading?: string;
  subheading?: string;
}) {
  const groups = courseGroupsForSubject(subject);
  if (!groups.length) return null;

  const cols =
    groups.length >= 3 ? "md:grid-cols-3" : groups.length === 2 ? "md:grid-cols-2" : "md:grid-cols-1";

  return (
    <section className="mt-32">
      <div className="text-center mb-16">
        <h2 className="text-[32px] font-bricolage font-normal text-slate mb-3 leading-[34px]">
          {heading}
        </h2>
        <p className="text-[18px] font-montserrat text-slate/60">{subheading}</p>
      </div>

      <div className={`grid grid-cols-1 ${cols} gap-8`}>
        {groups.map((group) => {
          const flat = group.categories.length === 1;
          return (
            <div
              key={group.institution}
              className="bg-bg-grey p-10 rounded-[8px] shadow-[0_10px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_70px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 group flex flex-col"
            >
              <h3 className="text-[22px] font-bricolage font-normal leading-[26px] text-slate mb-[18px] inline-block border-b-2 border-yellow-light pb-1 self-start">
                {group.institution}
              </h3>

              <div className="space-y-4">
                {group.categories.map((cat) => (
                  <div key={cat.category}>
                    {!flat && (
                      <p className="text-[13px] font-montserrat font-semibold uppercase tracking-wide text-slate/50 mb-1.5">
                        {cat.category}
                      </p>
                    )}
                    <ul className="space-y-1.5">
                      {cat.courses.map((course) => (
                        <li
                          key={course.code}
                          className="flex items-start gap-3 text-[15px] font-montserrat text-slate"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-slate/20 shrink-0 mt-1.5" />
                          <span>
                            <span className="font-medium">{course.code}</span>
                            {course.title ? ` — ${course.title}` : ""}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {group.note && (
                <p className="text-[13px] font-montserrat text-slate/60 leading-relaxed mt-5 pt-4 border-t border-slate/10">
                  {group.note}
                </p>
              )}

              <a
                href={group.calendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] font-montserrat text-primary hover:text-primary/80 underline decoration-yellow-light decoration-2 underline-offset-2 mt-4"
              >
                Official course calendar →
              </a>
            </div>
          );
        })}
      </div>

      <p className="text-center text-[13px] font-montserrat text-slate/55 leading-relaxed max-w-3xl mx-auto mt-8">
        {COURSE_DISCLAIMER} Dr. Shreyank Educare is an independent tutoring
        service and is not affiliated with, endorsed by, or partnered with any
        university or college listed here.
      </p>
    </section>
  );
}
