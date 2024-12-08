import React from "react";
import { Typewriter } from "react-simple-typewriter";

function Header({ title }) {
  return (
    <div className="flex flex-col items-center justify-center mb-10">
      {/* Typing Effect */}
      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500">
        <Typewriter
          words={[title]} // Animated text
          loop={1} // Type only once
          typeSpeed={70} // Speed of typing
          deleteSpeed={50} // Speed of deleting (if loop is true)
          cursor
          cursorStyle="|"
        />
      </h1>
      {/* Subtext */}
      <p className="text-lg text-gray-600 mt-2">
        Unleash the power of code transformation and analysis.
      </p>
    </div>
  );
}

export default Header;
