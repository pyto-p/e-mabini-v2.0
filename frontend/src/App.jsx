import React from "react";
import { Redirect, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import MainHeader from './components/common/Navigation/MainHeader';
import MainNavigation from "./components/common/Navigation/MainNavigation";
import AssignmentPage from './pages/AssignmentPage/AssignmentPage';
import CalendarPage from './pages/CalendarPage/CalendarPage';
import ChatPage from './pages/ChatPage/ChatPage';
import ClassroomPage from './pages/ClassroomPage/ClassroomPage';
import CourseListPage from './pages/CourseListPage/CourseListPage';
import CreateCoursePage from './pages/CourseListPage/CreateCoursePage';
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from './pages/LoginPage/LoginPage';
import CreatePostPage from "./pages/PostPage/CreatePostPage";
import PostPage from "./pages/PostPage/PostPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";

function App() {
  return (
    <Router>
      <MainHeader />
      <div className="main-content">
        <MainNavigation />
        <Switch>
          <Route path="/home" exact>
            <LandingPage />
          </Route>
          <Route path="/signup" exact>
            <SignUpPage />
          </Route>
          <Route path="/login" exact>
            <LoginPage />
          </Route>
          <Route path="/calendar" exact>
            <CalendarPage />
          </Route>
          <Route path="/courses" exact>
            <CourseListPage />
          </Route>
          <Route path="/create-course" exact>
            <CreateCoursePage />
          </Route>
          <Route path="/course/:courseid" exact>
            <ClassroomPage />
          </Route>
          <Route path="/course/:courseid/:postid" exact>
            <PostPage />
          </Route>
          <Route path="/create-post" exact>
            <CreatePostPage />
          </Route>
          <Route path="/chat" exact>
            <ChatPage />
          </Route>
          <Route path="/assignments" exact>
            <AssignmentPage />
          </Route>
          <Redirect to="/home" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
