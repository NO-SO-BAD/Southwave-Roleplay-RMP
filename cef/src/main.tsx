// src/main.tsx
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";  // Tu CSS con Tailwind

// Inyecta Tailwind manualmente (fix para RAGE MP CEF production)
const style = document.createElement('style');
style.innerHTML = `
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  html, body, #root {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    background: transparent !important;
    overflow: hidden;
  }
`;
document.head.appendChild(style);

createRoot(document.getElementById("root")!).render(<App />);