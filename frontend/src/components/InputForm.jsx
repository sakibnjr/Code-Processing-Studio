import React, { useState } from "react";

function InputForm({ onSubmit }) {
  const [code, setCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(code);
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-50">
      <form
        className="w-4/5 bg-white shadow-lg rounded-xl p-6 border border-gray-200"
        onSubmit={handleSubmit}
      >
        {/* Header */}
        <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">
          Enhance Your Code: Optimize and Clean Up with Ease
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Enter your C code below, and we’ll process it for you.
        </p>

        {/* Textarea Input */}
        <div className="form-control mb-4">
          <textarea
            className="textarea textarea-bordered w-full h-40 p-4 text-sm font-mono bg-gray-50"
            placeholder="Paste your C code here..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="btn btn-primary btn-wide bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium hover:from-blue-600 hover:to-blue-800 transition-all"
          >
            Process Code
          </button>
        </div>
      </form>
    </div>
  );
}

export default InputForm;
