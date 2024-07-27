import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//pages

import MainPage from "./pages/MainPage";
import GoalPage from "./pages/GoalPage";
import RecordPage from "./pages/RecordPage";
import RecordDonePage from "./pages/RecordDonePage";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/goal" element={<GoalPage />} />
          <Route path="/record" element={<RecordPage />} />
          <Route path="/recorddone" element={<RecordDonePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
