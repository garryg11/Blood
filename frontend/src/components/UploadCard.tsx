const UploadCard = () => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('File selected:', file.name);
      // TODO: Handle file upload
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-8 text-center transition-all duration-200 hover:shadow-md">
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>
        </div>
        
        <input
          type="file"
          id="file-upload"
          className="hidden"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileChange}
        />
        
        <label
          htmlFor="file-upload"
          className="inline-block w-full py-4 px-6 bg-[#007aff] text-white font-bold text-lg rounded-full cursor-pointer hover:bg-[#0056b3] transition-colors duration-200 active:scale-[0.98]"
        >
          Upload PDF/Image
        </label>
        
        <p className="text-sm text-gray-500 mt-4">PDF, JPG, PNG files</p>
      </div>
    </div>
  );
};

export default UploadCard;