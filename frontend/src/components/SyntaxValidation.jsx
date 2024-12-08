// components/SyntaxValidation.js
import React, { useState } from "react";

const SyntaxValidation = ({ fetchSyntaxValidation }) => {
  const [inputCode, setInputCode] = useState("");
  const [validationResult, setValidationResult] = useState("");

  const handleSubmit = async () => {
    const result = await fetchSyntaxValidation(inputCode);
    setValidationResult(result);
  };

  return (
    <div className="w-full max-w-lg space-y-4">
      <textarea
        className="w-full p-4 border rounded"
        rows="10"
        placeholder="Enter code to validate syntax"
        value={inputCode}
        onChange={(e) => setInputCode(e.target.value)}
      ></textarea>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleSubmit}
      >
        Validate Syntax
      </button>
      <div className="mt-4">
        <h3 className="font-bold">Validation Result:</h3>
        <pre className="p-4 bg-gray-200 rounded">{validationResult}</pre>
      </div>
    </div>
  );
};

export default SyntaxValidation;
