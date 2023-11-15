import "./App.css";
import "rsuite/dist/rsuite-no-reset.min.css";
import { router } from "./routes/router";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <div className="custom-scrollbar">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
