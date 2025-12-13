
  import { createRoot } from "react-dom/client";
  import App from "./App.tsx";
  import "./index.css";
  import './globals.css';  // O tu CSS principal

  createRoot(document.getElementById("root")!).render(<App />);
  