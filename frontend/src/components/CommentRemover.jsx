import React, { useState } from "react";
import InputForm from "./InputForm";
import OutputDisplay from "./OutputDisplay";

function CommentRemover({ fetchProcessedCode }) {
  const [output, setOutput] = useState("");

  const handleSubmit = async (code) => {
    const processedCode = await fetchProcessedCode(code);
    setOutput(processedCode);
  };

  return (
    <div className="w-4/5 p-4">
      <InputForm onSubmit={handleSubmit} />
      <OutputDisplay output={output} />
    </div>
  );
}

export default CommentRemover;
