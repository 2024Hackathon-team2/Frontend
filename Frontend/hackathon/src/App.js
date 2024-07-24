import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//pages

import MainPage from "./pages/MainPage";
import GoalPage from "./pages/GoalPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/goal" element={<GoalPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
