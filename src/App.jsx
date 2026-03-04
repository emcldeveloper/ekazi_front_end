import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Home from "./pages/home/Home";

import Correspondence from "./pages/correspondence/Correspondence";

import JobMatch from "./pages/MyApplicantion/JobMatch";
import JobPreview from "./pages/home/components/JobPreview";

import MyProfile from "./pages/JobSeeker/MyProfile";
import CvBuilder from "./pages/CvBuilder";
import FeaturedProfile from "./pages/home/components/FeaturedProfile";
import SampleTemplate from "./pages/JobSeeker/Cv/SampleTemplate";
import AppliedJob from "./pages/JobSeeker/JobSeeker/MyApplication";
import SavedJob from "./pages/JobSeeker/Jobs/SavedJob";
import SavedSearchJob from "./pages/JobSeeker/Jobs/SavedSearchJob";
import AllFeaturedJobSeeker from "./pages/JobSeeker/AllFeaturedJobSeeker";
import MyAccount from "./pages/JobSeeker/MyAccount";
import ChangePassword from "./pages/JobSeeker/Auth/ChangePassword";
import Privatepolicy from "./pages/JobSeeker/PrivatePolicy";
import CoverLetter from "./pages/JobSeeker/CoverLetter";
import Mycv from "./pages/JobSeeker/MyCv";
import SalaryCalculator from "./pages/calculator/TaxCalculator";

import NotVerifiedPage from "./pages/Auth/NotVerifiedPage";

import IntroductionData from "./pages/JobSeeker/Cv/Introduction";
import ObjectDetail from "./pages/JobSeeker/Cv/Objective";
import EducationCv from "./pages/JobSeeker/Cv/Education";
import AboutPage from "./pages/AboutPage";
import PricePage from "./pages/PricePage";
import ExperinceCv from "./pages/JobSeeker/Cv/Experience";
import SkillsCv from "./pages/JobSeeker/Cv/Skills";
import LanguageCv from "./pages/JobSeeker/Cv/Language";
import RefereeCv from "./pages/JobSeeker/Cv/Referee";
import HomeCv from "./pages/JobSeeker/Cv/Home";

import CVComponent from "./Component/Cv/Stepprogress";
import Proficiencycv from "./pages/JobSeeker/Cv/Proficiency";
import TrainingCv from "./pages/JobSeeker/Cv/Training";
import Applyjob from "./pages/JobSeeker/Jobs/Applyjob";
import Complete from "./pages/JobSeeker/Cv/CompleteCv";
import Jobemial from "./pages/JobSeeker/Jobs/EmailJob";
import ApplyJobEmail from "./pages/JobSeeker/Jobs/ApplyJobEmail";
import ResetPassword from "./pages/Auth/ResetPassword";
import VerificationSuccess from "./pages/Auth/VerificationSuccess";

import EditRefereePage from "./components/referees/EditRefereePage";
import EditEducationPage from "./components/education/EditEducationPage";
import EditTraningPage from "./components/training/EditTrainingPage";
import EditExperincePage from "./components/experience/EditExperiencePage";
import EditLanguagePage from "./components/languages/EditLanguagePage";
import EditProficiencyPage from "./components/proficiency/EditProficiencyPage";
import EditJobfitPage from "./components/jobfit/EditJobfitPage";
import ArticlesPage from "./pages/home/articles/ArticlesPage";
import ArticleDetails from "./pages/home/articles/ArticleDetails";
import CvPrintPage from "./pages/JobSeeker/Cv/CvPrintPage";
import { CVDataProvider } from "./context/CVDataContext";
import SentCorrespondence from "./pages/MyApplicantion/SentCorrespondence";
import ArticleResources from "./pages/JobSeeker/Resources/ArticleResources";
import SingleArticle from "./pages/JobSeeker/Resources/SingleArticle";
import JobOffers from "./Component/Jobs/JobOffers";
import Employer from "./components/companies/Employer";
import EmployerDetails from "./components/companies/EmployerDetails";
import ProtectedRoutes from "./layouts/ProtectedRoutes";
import Dashboard from "./pages/dashboard/Dashboard";
import FindJobs from "./pages/jobs/FindJobs";
import Jobs from "./pages/JobSeeker/Jobs/Jobs";
import Calculator from "./pages/JobSeeker/Calculator";
import Companies from "./pages/JobSeeker/Companies";
import CompanyDetails from "./pages/JobSeeker/CompanyDetails";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CVDataProvider>
        <BrowserRouter>
          {/* <ScrollToTop /> */}

          <Routes>
            {/* Account verification  here */}
            <Route path="/verify" element={<VerificationSuccess />} />
            <Route path="/not-verified" element={<NotVerifiedPage />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/cv-builder" element={<CvBuilder />} />
            <Route path="/salary-calculator" element={<SalaryCalculator />} />

            <Route path="/jobs" element={<FindJobs />} />
            <Route path="/jobs/:jobSlug" element={<JobPreview />} />
            <Route path="/apply-job-email" element={<ApplyJobEmail />} />

            <Route path="/employers" element={<Employer />} />
            <Route path="/employer/details" element={<EmployerDetails />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/pricelists" element={<PricePage />} />
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/articles/:slug" element={<ArticleDetails />} />

            <Route
              path="/job-seeker-profile/:slug"
              element={<FeaturedProfile />}
            />

            <Route
              path="/featured-jobseeker"
              element={<AllFeaturedJobSeeker />}
            />

            {/* Protected Routes */}
            {/* Jobseeker */}
            <Route element={<ProtectedRoutes />}>
              <Route path="/jobseeker/dashboard" element={<Dashboard />} />
              <Route path="/jobseeker/jobs" element={<Jobs />} />
              <Route path="/jobseeker/calculator" element={<Calculator />} />
              <Route path="/jobseeker/employers" element={<Companies />} />
              <Route
                path="/jobseeker/employer/details"
                element={<CompanyDetails />}
              />

              <Route
                path="/jobseeker/My-application"
                element={<AppliedJob />}
              />
              <Route
                path="/jobseeker/employer-correspondence"
                element={<Correspondence />}
              />
              <Route
                path="/jobseeker/sent-correspondence"
                element={<SentCorrespondence />}
              />

              <Route
                path="/jobseeker/profile-preview"
                element={<MyProfile />}
              />
              <Route
                path="/jobseeker/saved-searches"
                element={<SavedSearchJob />}
              />

              {/* <Route path="/jobseeker/jobs" element={<FindJobs />} /> */}
              <Route path="/jobseeker/saved-jobs" element={<SavedJob />} />
              <Route path="/jobseeker/job-match" element={<JobMatch />} />
              <Route path="/jobseeker/apply-job" element={<Applyjob />} />
              <Route path="/jobseeker/job-offers" element={<JobOffers />} />

              <Route
                path="/jobseeker/sample-selection"
                element={<SampleTemplate />}
              />
              <Route
                path="/jobseeker/account-settings"
                element={<MyAccount />}
              />
              <Route
                path="/jobseeker/change-password"
                element={<ChangePassword />}
              />
              <Route
                path="/jobseeker/Privacy-policy"
                element={<Privatepolicy />}
              />
              <Route path="/jobseeker/cover-letter" element={<CoverLetter />} />
              <Route path="/jobseeker/apply-job-email" element={<Jobemial />} />
              <Route path="/jobseeker/my-resume" element={<Mycv />} />

              {/* edit profile */}
              <Route
                path="/jobseeker/Edit-Training"
                element={<EditTraningPage />}
              />
              <Route
                path="/jobseeker/Edit-Proficiency"
                element={<EditProficiencyPage />}
              />
              <Route
                path="/jobseeker/Edit-Language"
                element={<EditLanguagePage />}
              />

              <Route
                path="/jobseeker/Edit-Experience"
                element={<EditExperincePage />}
              />

              <Route
                path="/jobseeker/Edit-JobFit"
                element={<EditJobfitPage />}
              />

              <Route
                path="/jobseeker/Edit-Education"
                element={<EditEducationPage />}
              />
              <Route
                path="/jobseeker/Edit-Referee"
                element={<EditRefereePage />}
              />

              {/*   cv temepalte and cv builder */}
              <Route
                path="/jobseeker/introduction"
                element={<IntroductionData />}
              />
              <Route path="/jobseeker/Objective" element={<ObjectDetail />} />
              <Route path="/jobseeker/EducationCv" element={<EducationCv />} />
              <Route path="/jobseeker/ExperienceCv" element={<ExperinceCv />} />
              <Route path="/jobseeker/SkillsCv" element={<SkillsCv />} />
              <Route path="/jobseeker/LanguageCv" element={<LanguageCv />} />
              <Route path="/jobseeker/RefereeCv" element={<RefereeCv />} />
              <Route path="/jobseeker/Home-Cv" element={<HomeCv />} />
              <Route
                path="/jobseeker/proficiencycv"
                element={<Proficiencycv />}
              />
              <Route path="/jobseeker/Trainingcv" element={<TrainingCv />} />
              <Route path="/jobseeker/cvprogress" element={<CVComponent />} />
              <Route path="/jobseeker/CompleteCv" element={<Complete />} />

              {/* Resource routes */}
              <Route
                path="/jobseeker/articles"
                element={<ArticleResources />}
              />
              <Route
                path="/jobseeker/articles/:slug"
                element={<SingleArticle />}
              />
            </Route>

            {/* CV PDF DOWNLOAD PAGE */}
            <Route path="/cv/print/:templateId" element={<CvPrintPage />} />

            {/* <Routes path="jobseeker/Job/Applied-job" element={<AppliedJob />} /> */}
          </Routes>
        </BrowserRouter>
      </CVDataProvider>
    </QueryClientProvider>
  );
}

export default App;
