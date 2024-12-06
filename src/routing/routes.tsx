import { Route, Routes } from "react-router-dom";
import Login from "../pages/login";
import CreateAccount from "../pages/create-account";
import Home from "../pages/home";
import Preview from "../pages/preview";
import { useEffect, useState } from "react";
import SharedLink from "../pages/shared-link";

const storedLoginInfo = localStorage.getItem("loginInfo");
const checkLogIn = storedLoginInfo ? JSON.parse(storedLoginInfo) : false;

function PageRoutes() {
  const [loggedIn, setLoggedIn] = useState(checkLogIn);

  useEffect(() => {
    localStorage.setItem("loginInfo", JSON.stringify(loggedIn));
  }, [loggedIn]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Login setLoggedIn={setLoggedIn} />} />
        <Route path="/create-account" element={<CreateAccount />} />
        {loggedIn && (
          <>
            <Route path="/home" element={<Home setLoggedIn={setLoggedIn} />} />
            <Route path="/preview" element={<Preview />} />
          </>
        )}
        <Route path="/shared-link/:uniqueId" element={<SharedLink />} />
      </Routes>
    </>
  );
}
export default PageRoutes;
