import React from "react";
import FooterLogo from "./Footer/FooterLogo";

const Footer = () => {
  return (
    <div className="container">
      <div className="flex bg-[#0000] z-10 pt-5">
        <div className="w-full md:w-1/2 text-center">
          {/* Replace with your React component or content */}
          {/* @livewire('footer.footer.editsubscribe') */}
        </div>

        {/* Replace with your React component or content */}
        {/* @livewire('applicant.job.job-alert') */}
      </div>
      <div className="w-full py-4">
        <div className="container-fluid">
          <hr className="border-t border-gray-300" />

          <div className="flex flex-wrap">
            <div className="w-full md:w-5/12">
              <FooterLogo></FooterLogo>
            </div>

            <div className="w-full md:w-2/12 text-lg">
              &nbsp;
              {/* Replace with your React component or content */}
              {/* @livewire('footer.footer.about-on-footer') */}
            </div>

            <div className="w-full md:w-2/12 text-lg">
              &nbsp;
              <h6 className="font-bold">FOR FREELANCER</h6>
              Browser Freelancers
              <br />
              Hire me
              <br />
              Post Project
            </div>

            <div className="w-full md:w-3/12">
              &nbsp;
              <h6 className="font-bold">FOR EMPLOYER</h6>
              Browse jobs
              <br />
              <a
                href="/employer/job/post"
                className="text-blue-600 hover:text-blue-800"
              >
                Post Job
              </a>
              {/* Replace with your React component or content */}
              {/* @livewire('footer.footer.footer-phone') */}
            </div>
          </div>
        </div>
      </div>
      &nbsp;
    </div>
  );
};

export default Footer;
