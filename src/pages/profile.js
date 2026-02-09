import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StepsContext } from "../layouts/mainLayout";

import axios from "axios";
import Swal from 'sweetalert2';



import { FaDownload } from "react-icons/fa";

const ApplicantProfile = () => {
    const [margin, setMargin] = useState("mt-32 opacity-0 ")
    const [showModalpay, setShowModalpay] = useState(false);


    // Benefits data
    const premiumBenefits = [
        "Priority job applications",
        "Unlimited resume downloads",
        "Featured profile in search results",
        "Direct messaging with recruiters",
        "Advanced analytics dashboard",
        "Exclusive job listings",
        "Custom resume templates"
    ];

    // Plan comparison data
    const planFeatures = [
        "Access basic jobs",
        "3 resume downloads/month",
        "Standard profile visibility",
        "Basic analytics",
        "Priority customer support",
        "Unlimited applications"
    ];




    return (
        <div className="min-h-screen overflow-x-hidden bg-gray-50 p-4">
            {/* Your existing dashboard content */}


            <div className="container mx-auto flex flex-col lg:flex-row gap-6">
                <div className="min-h-screen overflow-x-hidden bg-gray-50 p-4">
                    <div className="container mx-auto flex flex-col lg:flex-row gap-6">
                        {/* Left Side - Profile Section */}
                        <div className="w-full lg:w-1/4 flex flex-col gap-4">
                            <div className="bg-white rounded-lg shadow-md p-4">
                                <h3 className="text-lg font-bold mb-3">Sponsored Companies</h3>
                                <div className="space-y-4">
                                    {[1, 2, 3].map((ad) => (
                                        <div key={ad} className="border rounded-lg p-3 hover:shadow-md transition cursor-pointer">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                                                    <img
                                                        src={`/c.jpg`}
                                                        alt="Company Logo"
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold">Exactmanpower consult ltd</h4>
                                                    <p className="text-xs text-gray-500">Sponsored</p>
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-600 mb-2">Hiring for multiple positions in your area</p>
                                            <button className="w-full bg-blue-50 text-blue-600 text-xs py-1 rounded hover:bg-blue-100 transition">
                                                View Openings
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Middle Section - Job Listings */}
                        <div className="w-full lg:w-2/4">
                            <div className="bg-white rounded-lg shadow-md p-6">
                                {/* Profile Header with Background */}
                                <div className="relative mb-16">
                                    <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-700 rounded-t-lg"></div>
                                    <div className="absolute -bottom-12 left-6">
                                        <div className="relative">
                                            <div className="w-24 h-24 rounded-full border-4 border-white bg-gray-200 overflow-hidden">
                                                <img src="/profile.jpg" alt="Profile" className="w-full h-full object-cover" />
                                            </div>
                                            <button
                                                className="absolute -bottom-1 -right-1 bg-gray-100 p-2 rounded-full shadow-md hover:bg-gray-200 transition-all"
                                                onClick={() => window.location.href = '/edit-profile'}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-4 w-4 text-gray-700"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex justify-end mt-4">
                                        <button className="bg-white text-blue-500 border border-blue-500 px-4 py-1 rounded-full text-sm hover:bg-blue-50">
                                            Connect
                                        </button>
                                        <button className="ml-2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm hover:bg-blue-600">
                                            More
                                        </button>
                                    </div>
                                </div>

                                {/* Main Profile Info */}
                                <div className="mt-8 mb-6">
                                    <h2 className="text-2xl font-bold">John Doe</h2>
                                    <p className="text-gray-600">Senior Frontend Developer at TechCorp Inc.</p>
                                    <p className="text-sm text-gray-500">Dar Es Salaam, Tanzania · <span className="text-blue-500">500+ connections</span></p>
                                </div>

                                {/* Open To Work */}
                                <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-6">
                                    <div className="flex items-start">
                                        <div className="bg-blue-100 p-1 rounded-full mr-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm">Open to work</p>
                                            <p className="text-xs text-gray-600">Frontend Developer, React Developer, UI Engineer roles</p>
                                        </div>
                                    </div>
                                </div>

                                {/* About Section */}
                                <div className="mb-6 relative group">
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="text-lg font-semibold">About</h3>
                                        <button className="text-blue-500 text-sm hover:underline">Edit</button>
                                    </div>
                                    <p className="text-gray-700 mb-2">
                                        Passionate frontend developer with 5+ years of experience building responsive web applications.
                                        Skilled in React, Tailwind CSS, and modern JavaScript frameworks.
                                        Strong advocate for accessibility and performance optimization.
                                    </p>
                                    <p className="text-gray-700">
                                        Currently leading the frontend team at TechCorp, where I've helped scale our web platform to serve
                                        over 1 million monthly active users.
                                    </p>
                                </div>

                                {/* Experience Section */}
                                <div className="mb-6 relative group">
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="text-lg font-semibold">Experience</h3>
                                        <button className="text-blue-500 text-sm hover:underline">Edit</button>
                                    </div>

                                    <div className="border-l-2 border-gray-200 pl-4 space-y-4">
                                        {/* Current Experience */}
                                        <div className="relative">
                                            <div className="absolute -left-4 top-0 w-3 h-3 bg-blue-500 rounded-full"></div>
                                            <div className="pb-4">
                                                <h4 className="font-bold">TechCorp Inc.</h4>
                                                <p className="text-sm text-gray-600">Senior Frontend Developer</p>
                                                <p className="text-xs text-gray-500">Jan 2020 - Present · 3 yrs 8 mos</p>
                                                <p className="text-sm text-gray-600 mt-1">Dar Es Salaam, Tanzania</p>
                                                <p className="text-sm text-gray-700 mt-2">
                                                    Leading the development of scalable user interfaces and collaborating with designers and backend teams.
                                                    Implemented design systems that improved development speed by 40%.
                                                </p>
                                            </div>
                                        </div>

                                        {/* Previous Experience */}
                                        <div className="relative">
                                            <div className="absolute -left-4 top-0 w-3 h-3 bg-gray-300 rounded-full"></div>
                                            <div className="pb-4">
                                                <h4 className="font-bold">WebSolutions Ltd</h4>
                                                <p className="text-sm text-gray-600">Frontend Developer</p>
                                                <p className="text-xs text-gray-500">Jun 2018 - Dec 2019 · 1 yr 7 mos</p>
                                                <p className="text-sm text-gray-600 mt-1">Dar Es Salaam, Tanzania</p>
                                                <p className="text-sm text-gray-700 mt-2">
                                                    Developed responsive web applications using React and Redux.
                                                    Collaborated with UX designers to implement pixel-perfect interfaces.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Education Section */}
                                <div className="mb-6 relative group">
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="text-lg font-semibold">Education</h3>
                                        <button className="text-blue-500 text-sm hover:underline">Edit</button>
                                    </div>

                                    <div className="border rounded-lg p-4">
                                        <div className="flex items-start">
                                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h4 className="font-bold">University of Dar Es Salaam</h4>
                                                <p className="text-sm text-gray-600">BSc in Computer Science</p>
                                                <p className="text-xs text-gray-500">2015 - 2019</p>
                                                <p className="text-sm text-gray-600 mt-1">Grade: First Class Honors</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Skills Section */}
                                <div className="mb-6 relative group">
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="text-lg font-semibold">Skills</h3>
                                        <button className="text-blue-500 text-sm hover:underline">Edit</button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {["React", "TypeScript", "JavaScript", "Tailwind CSS", "Redux", "Git", "Node.js", "GraphQL", "Jest", "Webpack"].map((skill) => (
                                            <span key={skill} className="bg-gray-100 text-sm px-3 py-1 rounded-full hover:bg-gray-200 cursor-pointer">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Recommendations */}
                                <div className="mb-6 relative group">
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="text-lg font-semibold">Recommendations</h3>
                                        <button className="text-blue-500 text-sm hover:underline">Ask for recommendation</button>
                                    </div>
                                    <div className="border rounded-lg p-4">
                                        <div className="flex items-start mb-3">
                                            <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden mr-3">
                                                <img src="/user1.jpg" alt="User" className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-sm">Sarah Johnson</h4>
                                                <p className="text-xs text-gray-500">CTO at TechCorp Inc.</p>
                                                <p className="text-sm text-gray-700 mt-1">
                                                    "John is an exceptional frontend developer who consistently delivers high-quality work. His attention to detail and problem-solving skills are outstanding."
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Information */}
                                <div className="mb-6 relative group">
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="text-lg font-semibold">Contact Information</h3>
                                        <button className="text-blue-500 text-sm hover:underline">Edit</button>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="font-medium text-gray-600">Email</p>
                                            <p className="text-blue-500">johndoe@example.com</p>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-600">Phone</p>
                                            <p>+255 712 345 678</p>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-600">LinkedIn</p>
                                            <p className="text-blue-500">linkedin.com/in/johndoe</p>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-600">Portfolio</p>
                                            <p className="text-blue-500">johndoe.dev</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Featured Companies */}
                        <div className="w-full lg:w-1/4 flex flex-col gap-4">
                            <div className="bg-white rounded-lg shadow-md p-4">
                                <h3 className="text-lg font-bold mb-3">Sponsored Content</h3>
                                <div className="space-y-4">
                                    {/* Video Ad Example */}
                                    <div className="border rounded-lg overflow-hidden hover:shadow-md transition">
                                        <div className="bg-gray-100 p-2 text-center text-xs text-gray-500 flex items-center justify-between">
                                            <span>Google Ad</span>
                                            <span className="text-xs">Sponsored</span>
                                        </div>
                                        <div className="p-0">
                                            <div className="relative">
                                                <img
                                                    src="/ad-video-thumbnail.jpg"
                                                    alt="Video Ad Thumbnail"
                                                    className="w-full h-40 object-cover"
                                                />
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="bg-black bg-opacity-50 rounded-full p-3">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-3">
                                                <h4 className="font-medium text-sm mb-1">Boost Your Career with Online Courses</h4>
                                                <p className="text-xs text-gray-600 mb-2">Udemy - 50% off all professional development courses this week</p>
                                                <div className="flex justify-between items-center text-xs text-gray-500">
                                                    <span>udemy.com</span>
                                                    <button className="text-blue-500 hover:underline">Learn More</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Image Ad Example */}
                                    <div className="border rounded-lg overflow-hidden hover:shadow-md transition">
                                        <div className="bg-gray-100 p-2 text-center text-xs text-gray-500 flex items-center justify-between">
                                            <span>Google Ad</span>
                                            <span className="text-xs">Sponsored</span>
                                        </div>
                                        <div className="p-0">
                                            <img
                                                src="/job-recruitment-ad.jpg"
                                                alt="Job Recruitment Ad"
                                                className="w-full h-40 object-cover"
                                            />
                                            <div className="p-3">
                                                <h4 className="font-medium text-sm mb-1">TechCorp is Hiring Developers!</h4>
                                                <p className="text-xs text-gray-600 mb-2">Multiple positions available for React and Node.js developers</p>
                                                <div className="flex items-center text-xs text-gray-500 mb-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                    <span>Dar Es Salaam, Tanzania</span>
                                                </div>
                                                <button className="w-full bg-blue-50 text-blue-600 text-xs py-1.5 rounded hover:bg-blue-100 transition">
                                                    Apply Now
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Text Ad Example */}
                                    <div className="border rounded-lg overflow-hidden hover:shadow-md transition">
                                        <div className="bg-gray-100 p-2 text-center text-xs text-gray-500 flex items-center justify-between">
                                            <span>Google Ad</span>
                                            <span className="text-xs">Sponsored</span>
                                        </div>
                                        <div className="p-3">
                                            <div className="flex items-start mb-2">
                                                <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden mr-2">
                                                    <img
                                                        src="/d.jpg"
                                                        alt="LinkedIn Premium"
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-sm">LinkedIn Premium</h4>
                                                    <p className="text-xs text-gray-600">See who's viewed your profile</p>
                                                </div>
                                            </div>
                                            <p className="text-xs text-gray-700 mb-3">
                                                Get 3x more profile views and access to salary insights with LinkedIn Premium.
                                            </p>
                                            <button className="w-full bg-gray-100 text-gray-600 text-xs py-1.5 rounded hover:bg-gray-200 transition">
                                                Try for Free
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Ad Disclaimer */}
                                <p className="text-xs text-gray-500 mt-3">
                                    Ads help keep this service free. <span className="text-blue-500 cursor-pointer hover:underline">Learn more</span>
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    );
}

export default ApplicantProfile;