import { Route, Routes } from "react-router-dom";
import Login from "../pages/login";
import CreateAccount from "../pages/create-account";
import Home from "../pages/home";

function PageRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
}
export default PageRoutes;
