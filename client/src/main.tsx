import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Set title
document.title = "InterEd Admin - Student Management";

createRoot(document.getElementById("root")!).render(<App />);
