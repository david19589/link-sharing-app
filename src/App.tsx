import { BrowserRouter } from "react-router-dom";
import PageRoutes from "./routing/routes";
import { Provider } from "./context/context";

function App() {
  return (
    <Provider>
      <BrowserRouter
        future={{
          v7_startTransition: true,
        }}
      >
        <PageRoutes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
