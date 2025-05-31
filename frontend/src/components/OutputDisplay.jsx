function OutputDisplay({ output }) {
  return (
    <div className="w-full mt-4 sm:mt-6 bg-white rounded-lg shadow-sm p-3 sm:p-4 md:p-6">
      {/* Header */}
      <h2 className="text-xl sm:text-2xl font-semibold text-blue-600 text-center mb-3 sm:mb-4">
        Processed Code Output
      </h2>

      {/* Processed Output */}
      <div className="bg-gray-50 rounded-md p-3 sm:p-4">
        {output ? (
          <pre className="text-xs sm:text-sm md:text-base font-mono text-gray-800 overflow-x-auto whitespace-pre-wrap break-words">
            {output}
          </pre>
        ) : (
          <p className="text-gray-500 text-center italic text-sm sm:text-base">
            No output available. Submit your code to see the result here.
          </p>
        )}
      </div>
    </div>
  );
}

export default OutputDisplay;
