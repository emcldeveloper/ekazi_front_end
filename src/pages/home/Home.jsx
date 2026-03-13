import { useEffect } from "react";

import MainLayout1 from "../../layouts/MainLayout1";
import HeroSection from "./HeroSection";
import JobCategoriesSection from "./JobCategoriesSection";
import FeaturedEmployerSection from "./FeaturedEmployerSection";
import BannerSection from "./BannerSection";
import FeaturedJobsSection from "./FeaturedJobsSection";
import FeaturedCandidateSection from "./FeaturedCandidateSection";
import ArticlesSection from "./articles/ArticlesSection";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ backgroundColor: "#DFE3E2" }}>
      <MainLayout1>
        <HeroSection />
        <BannerSection />
        <FeaturedEmployerSection />
        <JobCategoriesSection />
        <FeaturedJobsSection />
        <FeaturedCandidateSection />
        <ArticlesSection />
      </MainLayout1>
    </div>
  );
};

export default Home;
