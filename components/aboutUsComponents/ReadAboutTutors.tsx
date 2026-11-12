import RelevantTutorProfiles from "@/components/RelevantTutorProfiles";
import { tutors } from "./tutorsData";

// Every biography is present in the HTML and has a stable anchor, so a profile
// link opens the requested tutor for visitors and crawlers without a selector.
export default function ReadAboutTutors() {
  return (
    <div className="mx-auto w-full max-w-5xl py-8">
      <RelevantTutorProfiles
        tutorIds={tutors.map((tutor) => tutor.id)}
        heading="Meet Our Tutors"
        showFullBiography
        idPrefix="tutor"
      />
    </div>
  );
}
