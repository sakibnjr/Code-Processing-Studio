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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 flex flex-col items-center px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Header Section */}
      <Header title="Code Processing Studio" />

      {/* Navigation */}
      <motion.div
        className="w-full max-w-7xl px-2 sm:px-4 lg:px-6 mb-6 sm:mb-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4 md:gap-6">
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
        </div>
      </motion.div>

      {/* Main Content Section */}
      <motion.div
        className="w-full max-w-7xl px-2 sm:px-4 lg:px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="card bg-white rounded-lg shadow-md p-4 sm:p-6 lg:p-8 border border-blue-200">
          <MainContent
            activeFeature={activeFeature}
            loading={loading}
            components={components}
          />
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="mt-6 sm:mt-10 text-gray-600 text-sm sm:text-base text-center px-4">
        <p>
          © {new Date().getFullYear()} Code Processing Studio. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
