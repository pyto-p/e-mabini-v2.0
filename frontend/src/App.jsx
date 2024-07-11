import React from "react";
import { Redirect, Route, BrowserRouter as Router, Switch, useLocation } from "react-router-dom";
import MainHeader from './components/common/Navigation/MainHeader';
import MainNavigation from "./components/common/Navigation/MainNavigation";
import AssignmentPage from './pages/AssignmentPage/AssignmentPage';
import AuthPage from './pages/AuthPage/AuthPage';
import CalendarPage from './pages/CalendarPage/CalendarPage';
import ChatPage from './pages/ChatPage/ChatPage';
import ClassroomPage from './pages/ClassroomPage/ClassroomPage';
import CourseListPage from './pages/CourseListPage/CourseListPage';
import CreateCoursePage from './pages/CourseListPage/CreateCoursePage';
import UpdateCoursePage from "./pages/CourseListPage/UpdateCoursePage";
import LandingPage from "./pages/LandingPage/LandingPage";
import CreatePostPage from "./pages/PostPage/CreatePostPage";
import PostPage from "./pages/PostPage/PostPage";
import UpdatePostPage from './pages/PostPage/UpdatePostPage';

const App = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/auth';

  return (
    <>
      {!isAuthPage && <MainHeader />}
      <div className="main-content">
        {!isAuthPage && <MainNavigation />}
        <Switch>
          <Route path="/home" exact>
            <LandingPage />
          </Route>
          <Route path="/calendar" exact>
            <CalendarPage />
          </Route>
          <Route path="/courses" exact>
            <CourseListPage />
          </Route>
          <Route path="/courses/new" exact>
            <CreateCoursePage />
          </Route>
          <Route path="/courses/:courseid" exact>
            <UpdateCoursePage />
          </Route>
          <Route path="/course/:courseid" exact>
            <ClassroomPage />
          </Route>
          <Route path="/course/:courseid/new" exact>
            <CreatePostPage />
          </Route>
          <Route path="/course/:courseid/:postid/edit" exact>
            <UpdatePostPage />
          </Route>
          <Route path="/course/:courseid/:postid" exact>
            <PostPage />
          </Route>
          <Route path="/chat" exact>
            <ChatPage />
          </Route>
          <Route path="/assignments" exact>
            <AssignmentPage />
          </Route>
          <Route path="/auth" exact>
            <AuthPage />
          </Route>
          <Redirect to="/home" />
        </Switch>
      </div>
    </>
  );
};

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;
