import React from "react";

const TemplateLoading = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
      <div className="ml-3 text-gray-700">Loading cv...</div>
    </div>
  );
};

export default TemplateLoading;
