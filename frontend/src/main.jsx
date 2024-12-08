import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { CodeProcessingProvider } from "./contexts/CodeProcessingContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CodeProcessingProvider>
      <App />
    </CodeProcessingProvider>
  </React.StrictMode>
);
