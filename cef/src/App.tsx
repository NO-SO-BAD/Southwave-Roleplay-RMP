// src/main.tsx
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";         // Tu index.css (Tailwind directives)
import "./styles/globals.css"; // Tu globals.css (reset + custom)

// Reset y fuerza dark mode para shadcn/ui (fix negro opaco)
document.documentElement.classList.add('dark');  // Fuerza dark mode

// Inyecta Tailwind manualmente (fix production RAGE MP)
const tailwindStyle = document.createElement('style');
tailwindStyle.innerHTML = `
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
    color: white;
    font-family: system-ui, -apple-system, sans-serif;
  }
`;
document.head.appendChild(tailwindStyle);

console.log('[CEF] Tailwind inyectado + dark mode forzado');

createRoot(document.getElementById("root")!).render(<App />);