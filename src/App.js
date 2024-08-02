import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//pages

import MainPage from "./pages/MainPage";
import HomePage from "./pages/HomePage";
import GoalPage from "./pages/GoalPage";
import RecordPage from "./pages/RecordPage";
import RecordDonePage from "./pages/RecordDonePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MyPage from "./pages/MyPage";
import SocialPage from "./pages/SocialPage";
import ProfileSettingPage from "./pages/ProfileSettingPage.js";
import FriendPage from "./pages/FriendPage";
import TimerPage from "./pages/TimerPage";
import TestPage from "./pages/TestPage";
import TestRecordPage from "./pages/TestRecordPage";
import TestCompletePage from "./pages/TestCompletePage.js";

import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/goal" element={<GoalPage />} />
          <Route path="/record" element={<RecordPage />} />
          <Route path="/recorddone" element={<RecordDonePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/social" element={<SocialPage />} />
          <Route path="/profilesetting" element={<ProfileSettingPage />} />
          <Route path="/friend" element={<FriendPage />} />
          <Route path="/timer" element={<TimerPage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/testrecord" element={<TestRecordPage />} />
          <Route path="/testcomplete" element={<TestCompletePage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
