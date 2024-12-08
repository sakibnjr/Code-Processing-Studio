function OutputDisplay({ output }) {
  return (
    <div className="w-full max-w-3xl mx-auto mt-6 bg-white shadow-lg rounded-xl p-6 border border-gray-200">
      {/* Header */}
      <h2 className="text-2xl font-bold text-blue-600 text-center mb-4">
        Processed Code Output
      </h2>

      {/* Processed Output */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-300">
        {output ? (
          <pre className="text-sm font-mono text-gray-800 overflow-auto whitespace-pre-wrap">
            {output}
          </pre>
        ) : (
          <p className="text-gray-500 text-center italic">
            No output available. Submit your code to see the result here.
          </p>
        )}
      </div>
    </div>
  );
}

export default OutputDisplay;
