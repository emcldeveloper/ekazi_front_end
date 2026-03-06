import { useState } from "react";

import EmployersPricingCards from "./EmployersPricingCards";
import ApplicantsPricingCards from "./ApplicantsPricingCards";

const Pricing = () => {
  const [activeTab, setActiveTab] = useState("applicants");

  return (
    <div className="w-full min-h-screen bg-gray-100  py-5 px-6">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <h1 className="text-4xl font-semibold text-gray-900 mb-6">
          Our Pricing Plans
        </h1>

        {/* Toggle */}
        <div className="inline-flex bg-gray-200 rounded-full p-1 mb-14">
          <button
            onClick={() => setActiveTab("applicants")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition ${
              activeTab === "applicants"
                ? "bg-white shadow text-gray-900"
                : "text-gray-500"
            }`}
          >
            Job Seekers
          </button>

          <button
            onClick={() => setActiveTab("employers")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition ${
              activeTab === "employers"
                ? "bg-white shadow text-gray-900"
                : "text-gray-500"
            }`}
          >
            Employers
          </button>
        </div>

        {/* Pricing Cards */}
        {activeTab === "applicants" && <ApplicantsPricingCards />}

        {activeTab === "employers" && <EmployersPricingCards />}
      </div>
    </div>
  );
};

export default Pricing;
