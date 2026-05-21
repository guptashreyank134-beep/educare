/** @format */

import dynamic from "next/dynamic";
import HomeBanner from "./HomeBanner";
import TrustedBrands from "./TrustedBrands";
import LearningProcess from "./LearningProcess";
import FocusedLearning from "./FocusedLearning";
import ExplorePrograms from "./ExplorePrograms";
import Team from "./Team";

const Reviews = dynamic(() => import("./Reviews"));

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HomeBanner />
      <LearningProcess />
      <FocusedLearning />
      <ExplorePrograms />
      <Team />
      <TrustedBrands />
      <Reviews />
    </main>
  );
}
