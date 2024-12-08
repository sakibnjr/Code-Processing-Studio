import React, { useState } from "react";
import Tree from "react-d3-tree";

const ASTVisualizer = ({ fetchAST }) => {
  const [inputCode, setInputCode] = useState("");
  const [ast, setAst] = useState(null);

  const handleSubmit = async () => {
    try {
      const generatedAST = await fetchAST(inputCode);
      console.log("Generated AST:", generatedAST);
      setAst(generatedAST.ast); // Ensure the structure matches what react-d3-tree needs
    } catch (error) {
      console.error("Error fetching AST:", error);
    }
  };

  return (
    <div className="w-full max-w-lg space-y-4">
      <textarea
        className="w-full p-4 border rounded"
        rows="10"
        placeholder="Enter code to generate AST"
        value={inputCode}
        onChange={(e) => setInputCode(e.target.value)}
      ></textarea>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleSubmit}
      >
        Generate AST
      </button>
      <div className="mt-4" style={{ width: "100%", height: "500px" }}>
        {ast ? (
          <Tree
            data={ast}
            orientation="vertical"
            translate={{ x: 200, y: 200 }}
            pathFunc="diagonal"
          />
        ) : (
          <p>No AST generated yet.</p>
        )}
      </div>
    </div>
  );
};

export default ASTVisualizer;
