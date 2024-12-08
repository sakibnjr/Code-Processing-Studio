import React, { useState } from "react";
import InputForm from "./InputForm";
import OutputDisplay from "./OutputDisplay";

function CodeOptimizer({ fetchOptimizedCode }) {
  const [output, setOutput] = useState("");

  const handleSubmit = async (code) => {
    const optimizedCode = await fetchOptimizedCode(code);
    setOutput(optimizedCode);
  };

  return (
    <div className="w-4/5 p-4">
      <InputForm onSubmit={handleSubmit} />
      <OutputDisplay output={output} />
    </div>
  );
}

export default CodeOptimizer;
