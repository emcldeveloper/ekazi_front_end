import MainLayout1 from "../layouts/MainLayout1";
import { CheckCircle } from "lucide-react";

const AboutPage = () => {
  const features = [
    "Multi-user access for team collaboration",
    "One-click candidate suitability flagging",
    "Customizable filters to view shortlists",
    "Secure and compliant candidate data storage",
    "Comprehensive application and activity history",
    "Calendar-synced interview scheduling",
    "Email and SMS communication with candidates",
    "Bulk messaging to multiple candidates instantly",
    "Predefined email templates for faster outreach",
    "Upload internal documents, CVs, and forms",
    "Keyword-based candidate search",
    "Tagging system for easier future searches",
    "Quick access to previously applied candidates",
    "View candidates’ online social profiles",
    "Build and manage a talent pool from applications",
  ];

  return (
    <MainLayout1>
      <div className="bg-gray-200 min-h-screen">
        {/* HERO */}
        <section className="bg-Blue text-white py-8">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold mb-2">About Us</h1>
            {/* <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              A modern recruitment platform designed to help businesses hire
              smarter, faster, and more efficiently.
            </p> */}
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <p className="text-gray-700 text-lg leading-relaxed">
              ekazi is a modern online recruitment platform tailored for Small
              and Medium Enterprises (SMEs), where efficiency is critical to
              business growth. Our mission is to empower SMEs to achieve optimal
              results in their hiring process. The eKazi platform is accessible
              24/7 from anywhere in the world on any device, allowing you to
              manage recruitment easily and conveniently.
            </p>
          </div>
        </section>

        {/* FEATURES */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">
              Key Features of eKazi
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-5 rounded-xl border border-gray-200 bg-gray-50 hover:shadow-md transition"
                >
                  <CheckCircle className="text-green-500 mt-1" size={20} />

                  <p className="text-gray-700 text-sm">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gray-100">
          <div className="max-w-4xl mx-auto text-center px-6">
            <h2 className="text-3xl font-bold mb-4">
              Ready to simplify your recruitment?
            </h2>

            <p className="text-gray-600 mb-6">
              Join thousands of companies already hiring smarter with eKazi.
            </p>

            <a
              href="https://www.ekazi.co.tz"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-medium transition"
            >
              Get Started
            </a>
          </div>
        </section>
      </div>
    </MainLayout1>
  );
};

export default AboutPage;
