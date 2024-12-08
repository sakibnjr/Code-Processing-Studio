import React, { useState } from "react";
import { motion } from "framer-motion";
import { useCodeProcessing } from "./contexts/CodeProcessingContext";
import {
  FaComments,
  FaCode,
  FaChartPie,
  FaSitemap,
  FaCogs,
  FaTable,
  FaCheckCircle,
} from "react-icons/fa";
import FeatureButton from "./components/FeatureButton";
import Header from "./components/Header";
import Loader from "./components/Loader";
import MainContent from "./components/MainContent";
import CommentRemover from "./components/CommentRemover";
import Tokenizer from "./components/Tokenizer";
import CodeOptimizer from "./components/CodeOptimizer";
import ASTVisualizer from "./components/ASTVisualizer";
import IRGenerator from "./components/IRGenerator";
import SymbolTable from "./components/SymbolTable";
import SyntaxValidation from "./components/SyntaxValidation";

function App() {
  const [activeFeature, setActiveFeature] = useState("comments");
  const [loading, setLoading] = useState(false);
  const {
    tokens,
    fetchProcessedCode,
    fetchTokens,
    fetchOptimizedCode,
    fetchAST,
    fetchIR,
    fetchSymbolTable,
    fetchSyntaxValidation,
  } = useCodeProcessing();

  const features = [
    { name: "comments", label: "Remove Comments", icon: <FaComments /> },
    { name: "tokenizer", label: "Tokenizer", icon: <FaCode /> },
    { name: "optimizer", label: "Optimize Code", icon: <FaCogs /> },
    {
      name: "ast",
      label: "AST Visualization",
      icon: <FaChartPie />,
      isUpcoming: true,
    },
    { name: "ir", label: "IR Generation", icon: <FaSitemap /> },
    { name: "symbols", label: "Symbol Table", icon: <FaTable /> },
    {
      name: "syntax",
      label: "Syntax Validation",
      icon: <FaCheckCircle />,
      isUpcoming: true,
    },
  ];

  const components = {
    comments: <CommentRemover fetchProcessedCode={fetchProcessedCode} />,
    tokenizer: <Tokenizer onSubmit={fetchTokens} tokens={tokens} />,
    optimizer: <CodeOptimizer fetchOptimizedCode={fetchOptimizedCode} />,
    ast: <ASTVisualizer fetchAST={fetchAST} />,
    ir: <IRGenerator fetchIR={fetchIR} />,
    symbols: <SymbolTable fetchSymbolTable={fetchSymbolTable} />,
    syntax: <SyntaxValidation fetchSyntaxValidation={fetchSyntaxValidation} />,
    Loader: <Loader />,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 flex flex-col items-center py-10">
      {/* Header Section */}
      <Header title="Code Processing Studio" />

      {/* Navigation */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 mb-8 w-full max-w-6xl px-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        {features.map((feature) => (
          <FeatureButton
            key={feature.name}
            feature={feature}
            isActive={activeFeature === feature.name}
            onClick={() => {
              setLoading(true);
              setTimeout(() => {
                setActiveFeature(feature.name);
                setLoading(false);
              }, 500);
            }}
          />
        ))}
      </motion.div>

      {/* Main Content Section */}
      <motion.div
        className="card bg-white rounded-lg shadow-md w-4/5 mx-auto p-8 border border-blue-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <MainContent
          activeFeature={activeFeature}
          loading={loading}
          components={components}
        />
      </motion.div>

      {/* Footer */}
      <footer className="mt-10 text-gray-600">
        <p>
          © {new Date().getFullYear()} Code Processing Studio. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
