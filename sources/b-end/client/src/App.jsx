// import RouterProvider dari react-router-dom
import { RouterProvider } from "react-router-dom";

// import router dari src/routes/index.jsx
import router from "./routes";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
