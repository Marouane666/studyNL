import { PartnersTeaser } from "./components/ApprovedPartners";
import { HelpCentreSearch } from "./components/HelpCentreSearch";
import { Hero } from "./components/Hero";
import { MovePlan } from "./components/MovePlan";
import { PopularTopics } from "./components/PopularTopics";

export default function Home() {
  return (
    <>
      <Hero />
      <PopularTopics />
      <MovePlan />
      <PartnersTeaser />
      <HelpCentreSearch />
    </>
  );
}
