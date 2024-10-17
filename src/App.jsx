import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import ProfilePage from "./pages/ProfilePage";
import PrivateRoute from "./components/PrivateRoute";
import AllBooksPage from "./pages/AllBooksPage";
import NewBookPage from "./pages/NewBookPage";
import PostList from "./components/Posts/PostList";
import CreatePost from "./components/Posts/CreatePost";
import MessageList from "./components/Messages/MessageList";
import CreateMessage from "./components/Messages/CreateMessage";
import GroupList from "./components/Groups/GroupList";
import CreateGroup from "./components/Groups/CreateGroup";
import PostPage from "./pages/PostPage";
import MessagesPage from "./pages/MessagesPage";
import GroupsPage from "./pages/GroupsPage";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/posts"
          element={
            <PrivateRoute>
              <PostPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/messages"
          element={
            <PrivateRoute>
              <MessagesPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/groups"
          element={
            <PrivateRoute>
              <GroupsPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<h1>404 Page</h1>} />
      </Routes>
    </>
  );
}

export default App;
