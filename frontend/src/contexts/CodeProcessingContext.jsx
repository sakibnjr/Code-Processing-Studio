import React, { createContext, useContext, useState } from "react";

const CodeProcessingContext = createContext();

export const CodeProcessingProvider = ({ children }) => {
  const [tokens, setTokens] = useState([]);

  const fetchProcessedCode = async (code) => {
    const response = await fetch("http://localhost:5000/process", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });
    const data = await response.json();
    return data.processedCode;
  };

  const fetchTokens = async (code) => {
    const response = await fetch("http://localhost:5000/tokenize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });
    const data = await response.json();
    setTokens(data.tokens);
  };

  const fetchOptimizedCode = async (code) => {
    const response = await fetch("http://localhost:5000/optimize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });
    const data = await response.json();
    return data.optimizedCode;
  };

  const fetchAST = async (code) => {
    const response = await fetch("http://localhost:5000/generate-ast", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });
    const data = await response.json();
    return data.ast;
  };

  const fetchIR = async (code) => {
    const response = await fetch("http://localhost:5000/generate-ir", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });
    const data = await response.json();
    return data.ir;
  };

  const fetchSymbolTable = async (code) => {
    const response = await fetch(
      "http://localhost:5000/generate-symbol-table",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      }
    );
    const data = await response.json();
    return data.symbolTable;
  };

  const fetchSyntaxValidation = async (code) => {
    const response = await fetch("http://localhost:5000/validate-syntax", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });
    const data = await response.json();
    return data.validationResult;
  };

  return (
    <CodeProcessingContext.Provider
      value={{
        tokens,
        setTokens,
        fetchProcessedCode,
        fetchTokens,
        fetchOptimizedCode,
        fetchAST,
        fetchIR,
        fetchSymbolTable,
        fetchSyntaxValidation,
      }}
    >
      {children}
    </CodeProcessingContext.Provider>
  );
};

export const useCodeProcessing = () => useContext(CodeProcessingContext);
