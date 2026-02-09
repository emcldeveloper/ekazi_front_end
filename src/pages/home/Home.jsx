import MainLayout1 from "../../layouts/MainLayout1";
import HeroSection from "./HeroSection";
import JobSearchSection from "./JobSearchSection";
import StatisticsSection from "./StatisticsSection";
import JobCategoriesSection from "./JobCategoriesSection";
import FeaturedEmployerSection from "./FeaturedEmployerSection";
import BannerSection from "./BannerSection";
import FeaturedJobsSection from "./FeaturedJobsSection";
import FeaturedCandidateSection from "./FeaturedCandidateSection";
import ArticlesSection from "./articles/ArticlesSection";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ backgroundColor: "#DFE3E2" }}>
      <MainLayout1>
        <HeroSection />
        <JobSearchSection />
        <BannerSection />
        <StatisticsSection />
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
