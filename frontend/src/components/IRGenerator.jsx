// components/IRGenerator.js
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCode, FaCogs, FaClipboard } from "react-icons/fa";

const IRGenerator = ({ fetchIR }) => {
  const [inputCode, setInputCode] = useState("");
  const [ir, setIr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const generatedIR = await fetchIR(inputCode);
    setIr(generatedIR);
    setLoading(false);
  };

  const handleCopyIR = () => {
    navigator.clipboard.writeText(JSON.stringify(ir, null, 2));
    alert("IR copied to clipboard!");
  };

  return (
    <motion.div
      className="w-4/5 my-4 mx-auto p-6 bg-white shadow-md rounded-lg border border-gray-200 space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header Section */}
      <motion.div
        className="flex items-center space-x-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <FaCogs className="text-blue-600 text-3xl" />
        <h2 className="text-2xl font-bold text-gray-700">
          Intermediate Representation Generator
        </h2>
      </motion.div>

      {/* Input Section */}
      <motion.div
        className="flex flex-col space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <textarea
          className="textarea textarea-bordered w-full h-40 p-4 text-sm font-mono bg-gray-50 focus:ring-2 focus:ring-blue-400"
          placeholder="Enter your code here..."
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}
        ></textarea>
        <button
          className={`btn btn-primary btn-block flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium hover:from-blue-600 hover:to-blue-800 transition-all ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
          onClick={handleSubmit}
          disabled={loading}
        >
          <FaCode />
          <span>{loading ? "Generating..." : "Generate IR"}</span>
        </button>
      </motion.div>

      {/* Output Section */}
      {ir && (
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-700">
              Generated Intermediate Representation:
            </h3>
            <button
              className="flex items-center space-x-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-all"
              onClick={handleCopyIR}
            >
              <FaClipboard />
              <span>Copy IR</span>
            </button>
          </div>
          <pre className="p-4 bg-gray-100 rounded-md overflow-x-auto text-sm font-mono">
            {JSON.stringify(ir, null, 2)}
          </pre>
        </motion.div>
      )}
    </motion.div>
  );
};

export default IRGenerator;
