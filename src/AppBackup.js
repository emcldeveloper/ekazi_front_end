
import './index.css';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import { HideFieldsProvider } from './layouts/HideFieldsContext';
import IntroductionDetails from './pages/introductionDetails';
import Template1 from './templates/template1';
import ProfessionalSummary from './pages/professionalSummary';
import Education from './pages/education';
import Educations from './pages/education';
import WorksExperiences from './pages/workExperience';
import Skills from './pages/skills';
import Certifications from './pages/proficiency';
import Refrees from './pages/refrees';
import Complete from './pages/complete';
import AboutUs from './samples/aboutUs';
import Proficiency from './pages/proficiency';
import A4Paper from './samples/a4Paper';
import Template2 from './templates/template2';
import Template3 from './templates/template3';
import ProfileLayout from './layouts/profileLayout';
import ManagePrimaryInformations from './pages/profile/managePrimaryInfo';
import Languages from './pages/language';
import Training from './pages/training';
import MySubscription from './pages/mySubscription';
import MyCv from './pages/mycv';
import Samplemplate from './pages/sampletemplate'
import CoverLetterGenerator from './pages/coverletter';
import Template4 from './templates/template4';
import Template5 from './templates/template5';
import Template6 from './templates/template6';
import Template7 from './templates/template7';
import Template8 from './templates/template8';
import Template9 from './templates/template9';
import Template10 from './templates/template10';
import AdminPage from './pages/admin';
import FeactursJob from './pages/job';
import JobListing from './pages/job';
import JobApply from './pages/applijob';
import CoverLetterForm from './pages/applijob';
import ApplicantProfile from './pages/profile';

import Home from './pages/Home';
import JobSeekerDashboard from './pages/JobSeeker/JobSeekerDashboard';





function App() {
  return (
    <HideFieldsProvider>
 <BrowserRouter>
  <Routes>
  {/* Root route */}
  <Route path="/" element={<Home />} />

  {/* Jobseeker dashboard */}
  <Route path="jobseeker/dashboard" element={<JobSeekerDashboard />} />
  <Route path="edit-profile" element={<ApplicantProfile />} />

  {/* CV building sections */}
  <Route path="introduction/:uuid/:template" element={<IntroductionDetails />} />
  <Route path="professional_summary/:uuid/:template" element={<ProfessionalSummary />} />
  <Route path="educations/:uuid/:template" element={<Educations />} />
  <Route path="experiences/:uuid/:template" element={<WorksExperiences />} />
  <Route path="skills/:uuid/:template" element={<Skills />} />
  <Route path="Languages/:uuid/:template" element={<Languages />} />
  <Route path="proficiency/:uuid/:template" element={<Proficiency />} />
  <Route path="Training/:uuid/:template" element={<Training />} />
  <Route path="refrees/:uuid/:template" element={<Refrees />} />
  <Route path="complete/:uuid/:template" element={<Complete />} />
  <Route path="my-subscription/:uuid/:template" element={<MySubscription />} />
  <Route path="my-cv/:uuid/:template" element={<MyCv />} />
  <Route path="sample-template/:uuid/:template" element={<Samplemplate />} />
  <Route path="cover-letter/:uuid/:template" element={<CoverLetterGenerator />} />
  <Route path="Admin/:uuid/:template" element={<AdminPage />} />
  <Route path="find-job/:uuid/:template" element={<JobListing />} />
  <Route path="apply-job/:uuid/:template" element={<CoverLetterForm />} />

  {/* Profile layout with nested routes */}
  <Route path="profile" element={<ProfileLayout />}>
    <Route path="primaryInfo/:uuid" element={<ManagePrimaryInformations />} />
  </Route>

  {/* Standalone templates */}
  <Route path="template1/:uuid" element={<Template1 />} />
  <Route path="template2/:uuid" element={<Template2 />} />
  <Route path="template3/:uuid" element={<Template3 />} />
  <Route path="template4/:uuid" element={<Template4 />} />
  <Route path="template5/:uuid" element={<Template5 />} />
  <Route path="template6/:uuid" element={<Template6 />} />
  <Route path="template7/:uuid" element={<Template7 />} />
  <Route path="template8/:uuid" element={<Template8 />} />
  <Route path="template9/:uuid" element={<Template9 />} />
  <Route path="template10/:uuid" element={<Template10 />} />
</Routes>

</BrowserRouter>
   </HideFieldsProvider>
  );
}

export default App;
