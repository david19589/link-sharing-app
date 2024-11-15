import { BrowserRouter } from "react-router-dom";
import PageRoutes from "./routing/routes";

function App() {
  return (
    <>
      <BrowserRouter
        future={{
          v7_startTransition: true,
        }}
      >
        <PageRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
