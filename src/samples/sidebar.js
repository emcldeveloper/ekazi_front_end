import React from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Sidebar = ({ steps, currentStep, isSidebarOpen, toggleSidebar }) => {
    return (
        <>
            {/* Mobile Hamburger Menu Button */}
            <div className="md:hidden fixed top-2 left-2 z-50">
                <button
                    onClick={toggleSidebar}
                    className="text-white bg-primary p-1 rounded-md"
                >
                    {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                </button>
            </div>

            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 w-3/4 md:w-3/12 bg-primary text-white px-6 md:px-12 py-5 transform transition-transform duration-300 ease-in-out ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } md:translate-x-0`}
                style={{ top: '55px' }} // Adjust top position to account for NavBar height
            >
                {/* Sidebar Header */}
                <div>
                    <h1 className="text-white text-2xl font-bold">CV Builder (eKazi)</h1>
                </div>

                {/* Scrollable Content */}
                <div className="mt-8 overflow-y-auto h-[calc(100vh-10rem)]"> {/* Adjust height as needed */}
                    {steps.map((item, index) => (
                        <div
                            key={index}
                            className="font-bold text-opacity-75 border-white border-opacity-50 rounded mb-4"
                        >
                            <div className="flex space-x-2 items-center">
                                <div
                                    className={`h-8 w-8 ${
                                        index < currentStep ? "bg-green-600" : "bg-white bg-opacity-10"
                                    } rounded-full flex justify-center items-center`}
                                >
                                    {index + 1}
                                </div>
                                <h1>{item.title}</h1>
                            </div>
                            {index + 1 !== steps.length && (
                                <div
                                    className={`h-5 ${
                                        index < currentStep ? "bg-green-600" : "bg-white bg-opacity-10"
                                    } ml-4 w-[2px]`}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Overlay for Mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}
        </>
    );
};

export default Sidebar;