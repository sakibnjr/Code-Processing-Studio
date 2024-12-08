import React from "react";

function MainContent({ activeFeature, loading, components }) {
  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-50">
      {loading
        ? components.Loader || <div>Loading...</div>
        : components[activeFeature] || <div>No Feature Selected</div>}
    </div>
  );
}

export default MainContent;
