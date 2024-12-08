import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaTable, FaClipboard } from "react-icons/fa";

const SymbolTable = ({ fetchSymbolTable }) => {
  const [inputCode, setInputCode] = useState("");
  const [symbolTable, setSymbolTable] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!fetchSymbolTable || typeof fetchSymbolTable !== "function") {
      alert("Error: fetchSymbolTable function is not provided.");
      return;
    }

    try {
      setLoading(true);
      const table = await fetchSymbolTable(inputCode); // Fetch data
      setSymbolTable(table || []); // Set table or empty array if null
    } catch (error) {
      alert("Failed to fetch the Symbol Table. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyTable = () => {
    const tableText = JSON.stringify(symbolTable, null, 2);
    navigator.clipboard
      .writeText(tableText)
      .then(() => alert("Symbol Table copied to clipboard!"))
      .catch(() => alert("Failed to copy the table to clipboard."));
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
        <FaTable className="text-blue-600 text-3xl" />
        <h2 className="text-2xl font-bold text-gray-700">
          Symbol Table Generator
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
          <FaTable />
          <span>{loading ? "Generating..." : "Generate Symbol Table"}</span>
        </button>
      </motion.div>

      {/* Output Section */}
      {symbolTable.length > 0 && (
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-700">
              Symbol Table:
            </h3>
            <button
              className="flex items-center space-x-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-all"
              onClick={handleCopyTable}
            >
              <FaClipboard />
              <span>Copy Table</span>
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="table w-full bg-gray-50 rounded-md border border-gray-300">
              <thead className="bg-blue-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Type</th>
                  <th className="px-4 py-2 text-left">Scope</th>
                  <th className="px-4 py-2 text-left">Memory Address</th>
                  <th className="px-4 py-2 text-left">Value</th>
                  <th className="px-4 py-2 text-left">Data Type</th>
                </tr>
              </thead>
              <tbody>
                {symbolTable.map((symbol, index) => (
                  <tr key={index} className="odd:bg-white even:bg-gray-100">
                    <td className="px-4 py-2">{symbol.name}</td>
                    <td className="px-4 py-2">{symbol.type}</td>
                    <td className="px-4 py-2">{symbol.scope}</td>
                    <td className="px-4 py-2">{symbol.memoryAddress}</td>
                    <td className="px-4 py-2">{symbol.value}</td>
                    <td className="px-4 py-2">{symbol.dataType}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SymbolTable;
