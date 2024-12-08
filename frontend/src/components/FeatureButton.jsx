import React from "react";
import { motion } from "framer-motion";

function FeatureButton({ feature, isActive, onClick }) {
  const isUpcoming = feature.isUpcoming;

  return (
    <motion.button
      className={`card bg-white shadow-md p-4 border transition-transform rounded-lg ${
        isActive
          ? "border-blue-500 ring-4 ring-blue-100"
          : "hover:border-gray-300"
      } ${isUpcoming ? "opacity-60 cursor-not-allowed" : "hover:scale-105"}`}
      onClick={!isUpcoming ? onClick : undefined} // Disable click for upcoming features
      whileTap={!isUpcoming ? { scale: 0.95 } : {}}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col items-center space-y-2">
        {/* Icon */}
        <div
          className={`text-4xl ${isActive ? "text-blue-500" : "text-gray-600"}`}
        >
          {feature.icon}
        </div>

        {/* Label */}
        <div
          className={`text-sm font-medium ${
            isActive ? "text-blue-500" : "text-gray-700"
          }`}
        >
          {feature.label}
        </div>

        {/* Upcoming Label */}
        {isUpcoming && (
          <span className="mt-1 px-2 py-1 text-xs bg-yellow-100 text-yellow-600 font-semibold rounded-full">
            Upcoming
          </span>
        )}
      </div>
    </motion.button>
  );
}

export default FeatureButton;
