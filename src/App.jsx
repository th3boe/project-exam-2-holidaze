import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/layout";

// Page import

import Home from "./pages/Home/";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
