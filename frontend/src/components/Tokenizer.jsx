import React, { useState } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#d45087",
  "#4caf50",
  "#ff8042",
];

function Tokenizer({ onSubmit, tokens }) {
  const [code, setCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(code);
  };

  // Group tokens by type and calculate counts
  const groupedTokens = tokens.reduce((acc, token) => {
    if (!acc[token.type]) {
      acc[token.type] = [];
    }
    acc[token.type].push(token.value);
    return acc;
  }, {});

  const tokenSummary = Object.entries(groupedTokens).map(([type, values]) => ({
    type,
    count: values.length,
  }));

  return (
    <div className="flex flex-col items-center p-6 min-h-screen bg-gradient-to-b from-gray-100 to-blue-50">
      {/* Header */}
      <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        Tokenizer
      </h2>
      <p className="text-sm text-gray-500 mb-8 text-center">
        Paste your C code below to tokenize and analyze the different components
        of your code.
      </p>

      {/* Input Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-6 border border-gray-200"
      >
        <textarea
          className="textarea textarea-bordered w-full h-40 font-mono bg-gray-50"
          placeholder="Paste your C code here..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
        ></textarea>
        <button
          type="submit"
          className="btn btn-primary mt-4 w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800"
        >
          Tokenize Code
        </button>
      </form>

      {/* Token Table */}
      <div className="w-full max-w-5xl mt-10">
        <h3 className="text-xl font-bold text-gray-700 mb-4">Tokens</h3>
        {Object.keys(groupedTokens).length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Values</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(groupedTokens).map(([type, values]) => (
                  <tr key={type}>
                    <td className="font-medium text-blue-600">{type}</td>
                    <td className="truncate">{values.join(", ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-6">
            No tokens to display yet.
          </p>
        )}
      </div>

      {/* Summary Chart */}
      <div className="w-full max-w-4xl mt-12">
        <h3 className="text-xl font-bold text-gray-700 mb-4">Summary</h3>
        {tokenSummary.length > 0 ? (
          <div className="flex justify-center">
            <PieChart width={400} height={400}>
              <Pie
                data={tokenSummary}
                dataKey="count"
                nameKey="type"
                cx="50%"
                cy="50%"
                outerRadius={150}
                fill="#8884d8"
                label
              >
                {tokenSummary.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-6">
            No data to summarize yet.
          </p>
        )}
      </div>
    </div>
  );
}

export default Tokenizer;
