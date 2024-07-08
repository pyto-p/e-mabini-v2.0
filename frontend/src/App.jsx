import React from "react";
import { Redirect, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import MainHeader from './components/common/Navigation/MainHeader';
import MainNavigation from "./components/common/Navigation/MainNavigation";
import AssignmentPage from './pages/AssignmentPage/AssignmentPage';
import CalendarPage from './pages/CalendarPage/CalendarPage';
import ChatPage from './pages/ChatPage/ChatPage';
import CourseListPage from './pages/CourseListPage/CourseListPage';
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from './pages/LoginPage/LoginPage';
import SignUpPage from "./pages/SignUpPage/SignUpPage";

function App() {
  return (
    <Router>
      <MainHeader />
      <div className="main-content">
        <MainNavigation />
        <Switch>
          <Route path="/" exact>
            <LandingPage />
          </Route>
          <Route path="/signup" exact>
            <SignUpPage />
          </Route>
          <Route path="/login" exact>
            <LoginPage />
          </Route>
          <Route path="/home" exact>
            <CourseListPage />
          </Route>
          <Route path="/calendar" exact>
            <CalendarPage />
          </Route>
          <Route path="/courses" exact>
            <CourseListPage />
          </Route>
          <Route path="/chat" exact>
            <ChatPage />
          </Route>
          <Route path="/assignments" exact>
            <AssignmentPage />
          </Route>
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
