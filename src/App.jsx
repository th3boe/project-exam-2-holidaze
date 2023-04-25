// other imports

import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/layout";
import "bootstrap/dist/css/bootstrap.min.css";

// Page import

import Home from "./pages/Home/";
import Venues from "./pages/Venues/";
import SpecificVenue from "./pages/SpecificVenue/";
import Register from "./pages/Register/";
import SignIn from "./pages/SignIn/";
import Profile from "./pages/Profile/";

// Bootstrap import

<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
  integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
  crossorigin="anonymous"
/>;

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="venues" element={<Venues />} />
          <Route path="venue/:id" element={<SpecificVenue />} />
          <Route path="register" element={<Register />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
