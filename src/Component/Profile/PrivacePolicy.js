import React, { useState } from 'react';

const PrivacyPolicySettings = () => {
  // Initial state based on Tanzania data protection considerations
  const [privacySettings, setPrivacySettings] = useState({
    availableForJob: true,
    profileVisiblePublic: true,
    contactVisiblePublic: false,
    salaryVisiblePublic: false,
    refereeVisiblePublic: false,
  });

  const [showPolicy, setShowPolicy] = useState(false);

  const handleToggle = (setting) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleSave = () => {
   
 
    alert('Privacy settings saved successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Privacy Settings</h1>
      
      {/* Privacy Policy Section */}
      <div className="mb-8">
        <button 
          onClick={() => setShowPolicy(!showPolicy)}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          {showPolicy ? 'Hide' : 'View'} Tanzania Privacy Policy
        </button>
        
        {showPolicy && (
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <h2 className="text-xl font-semibold mb-3">Privacy Policy (Tanzania)</h2>
            <p className="mb-2">
              This privacy policy complies with Tanzania's Personal Data Protection Act of 2022.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>We collect only necessary personal information for employment purposes</li>
              <li>Your data will be processed fairly and lawfully</li>
              <li>We implement appropriate security measures to protect your information</li>
              <li>You have the right to access and correct your personal data</li>
              <li>Data will not be transferred outside Tanzania without your consent</li>
              <li>We retain your information only as long as necessary for the stated purposes</li>
            </ul>
          </div>
        )}
      </div>

      {/* Privacy Settings Controls */}
      <div className="space-y-6">
        <div className="flex items-center justify-between p-1 border rounded-lg">
          <div>
            <h5 className="font-medium">Available for Job Opportunities</h5>
            <p className="text-sm text-gray-600">Show recruiters you're actively seeking employment</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={privacySettings.availableForJob}
              onChange={() => handleToggle('availableForJob')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-1 border rounded-lg">
          <div>
            <h5 className="font-medium">Public Profile Visibility</h5>
            <p className="text-sm text-gray-600">Make your profile visible to all visitors</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={privacySettings.profileVisiblePublic}
              onChange={() => handleToggle('profileVisiblePublic')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-1 border rounded-lg">
          <div>
            <h5 className="font-medium">Contact Information Visibility</h5>
            <p className="text-sm text-gray-600">Show your email and phone number publicly</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={privacySettings.contactVisiblePublic}
              onChange={() => handleToggle('contactVisiblePublic')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-1 border rounded-lg">
          <div>
            <h5 className="font-medium">Salary Expectations Visibility</h5>
            <p className="text-sm text-gray-600">Display your salary expectations on your profile</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={privacySettings.salaryVisiblePublic}
              onChange={() => handleToggle('salaryVisiblePublic')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-1 border rounded-lg">
          <div>
            <h5 className="font-medium">Referee Information Visibility</h5>
            <p className="text-sm text-gray-600">Show your referees' contact information</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={privacySettings.refereeVisiblePublic}
              onChange={() => handleToggle('refereeVisiblePublic')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Save Settings
        </button>
      </div>

      <div className="mt-8 p-4 bg-yellow-50 rounded-md">
        <h3 className="font-medium text-yellow-800">Note on Tanzania Data Protection</h3>
        <p className="text-sm text-yellow-700 mt-1">
          According to Tanzania's data protection laws, you have the right to control how your personal information is shared.
          We recommend being cautious about sharing contact details and referee information publicly.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicySettings;