import React, { useState } from "react";

function InputForm({ onSubmit }) {
  const [code, setCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(code);
  };

  return (
    <div className="w-full">
      <form
        className="w-full bg-white rounded-lg shadow-sm p-3 sm:p-4 md:p-6"
        onSubmit={handleSubmit}
      >
        {/* Header */}
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-blue-600 mb-2 sm:mb-3 md:mb-4 text-center">
          Enhance Your Code: Optimize and Clean Up with Ease
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 text-center mb-4 sm:mb-6">
          Enter your C code below, and we'll process it for you.
        </p>

        {/* Textarea Input */}
        <div className="mb-3 sm:mb-4">
          <textarea
            className="w-full h-32 sm:h-40 md:h-48 p-3 sm:p-4 text-xs sm:text-sm md:text-base font-mono bg-gray-50 rounded-md border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors resize-none"
            placeholder="Paste your C code here..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm sm:text-base font-medium rounded-md hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 ease-in-out"
          >
            Process Code
          </button>
        </div>
      </form>
    </div>
  );
}

export default InputForm;
