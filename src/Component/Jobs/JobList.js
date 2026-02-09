import React from "react";
 





const Joblist = () => {

 
    return (
        <>
            <div className="w-full lg:w-2/4">
                <div className="bg-white rounded-lg shadow-md p-4">


                    {/* 4-Card Information Panel */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        {/* Resume Card */}
                        <div className="border rounded-lg p-4 hover:shadow-md transition cursor-pointer">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-2xl font-bold text-blue-600">5</p>
                                    <p className="text-gray-600 text-sm mt-1">Resume</p>
                                </div>
                                <div className="bg-blue-100 p-2 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Applications Card */}
                        <div className="border rounded-lg p-4 hover:shadow-md transition cursor-pointer">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-2xl font-bold text-green-600">12</p>
                                    <p className="text-gray-600 text-sm mt-1"> Applications</p>
                                </div>
                                <div className="bg-green-100 p-2 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Saved Jobs Card */}
                        <div className="border rounded-lg p-4 hover:shadow-md transition cursor-pointer">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-2xl font-bold text-purple-600">8</p>
                                    <p className="text-gray-600 text-sm mt-1">Saved Jobs</p>
                                </div>
                                <div className="bg-purple-100 p-2 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Saved Search Card */}
                        <div className="border rounded-lg p-4 hover:shadow-md transition cursor-pointer">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-2xl font-bold text-orange-600">3</p>
                                    <p className="text-gray-600 text-sm mt-1">Saved Search</p>
                                </div>
                                <div className="bg-orange-100 p-2 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Recommended Jobs Header with View All Link */}
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Recommended jobs for you</h2>
                        <a
                            href="/jobs"
                            className="text-blue-500 hover:text-blue-700 text-sm font-medium flex items-center"
                        >
                            View all jobs
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </a>
                    </div>
                    {/* Job Listings */}
                    <div className="space-y-4">
                        {[1, 2, 3, 4].map((job) => (
                            <div key={job} className="border rounded-lg p-4 hover:shadow-md transition">
                                <div className="flex gap-4">
                                    <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                                        <img
                                            src="/b.jpg"
                                            alt="Company Logo"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold">Senior Frontend Developer</h3>
                                        <div className="flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 text-gray-500"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor">
                                                <path strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={1.5}
                                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                            <p className="text-gray-600">TechCorp Inc.</p>
                                        </div>
                                        <p className="text-gray-600">Dar Es Salaam, Tanzania</p>
                                        <div className="flex items-center text-sm text-gray-500 mt-1">
                                            <span>Posted</span>
                                            <span className="mx-2">:</span>
                                            <span>2 days ago</span>
                                        </div>
                                    </div>
                                    {/* <button className="self-start bg-blue-500 text-white px-4 py-1 rounded-md text-sm hover:bg-blue-600">
                                                    view job
                                                </button> */}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
export default Joblist;