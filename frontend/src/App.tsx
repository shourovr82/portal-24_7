import "rsuite/dist/rsuite-no-reset.min.css";
import { router } from "./routes/router";
import { RouterProvider } from "react-router-dom";
import { CustomProvider } from "rsuite";

function App() {
  return (
    <CustomProvider theme="light">
      <div className="custom-scrollbar">
        <RouterProvider router={router} />
      </div>
    </CustomProvider>
  );
}

export default App;
