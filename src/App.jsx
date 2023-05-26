// other imports

import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/layout";
import { AuthProvider } from "./context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

// Page import

import Home from "./pages/Home/";
import Venues from "./pages/Venues/";
import SpecificVenue from "./pages/SpecificVenue/";
import Register from "./pages/Register/";
import SignIn from "./pages/SignIn/";
import Profile from "./pages/Profile/";
import VenuesByProfile from "./pages/VenueByProfile/";
import CreateVenue from "./pages/CreateVenue";
import UpdateVenue from "./pages/UpdateVenue";
import MyBookings from "./pages/ViewBookingsByProfile";

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
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="venues" element={<Venues />} />
            <Route path="venue/:id" element={<SpecificVenue />} />
            <Route path="register" element={<Register />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="profile/:name" element={<Profile />} />
            <Route path="profile/:name/venues" element={<VenuesByProfile />} />
            <Route path="createvenue" element={<CreateVenue />} />
            <Route path="updatevenue/:id" element={<UpdateVenue />} />
            <Route path="profile/:name/bookings" element={<MyBookings />} />
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
