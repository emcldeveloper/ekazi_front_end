const TemplateError = ({ children }) => {
  return (
    <div className="p-4">
      <div className="bg-red-100 text-red-700 p-3 rounded">{children}</div>
    </div>
  );
};

export default TemplateError;
