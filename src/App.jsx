import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedAuth from "./components/ProtectedAuth";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import "./App.css";
import Inbox from "./pages/Inbox";
import FriendsList from "./pages/FriendsList";
import Profile from "./pages/Profile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Message from "./pages/Message";
import Groups from "./pages/Groups";
import Group from "./pages/Group";
import Welcome from "./components/Welcome";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route element={<ProtectedAuth />}>
            <Route exact path="/signup" element={<SignUp />} />
            <Route index element={<Login />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route exact path="/home" element={<Home />}>
              <Route index element={<Welcome />} />
              <Route path="inbox" element={<Inbox />}>
                <Route path=":uid" element={<Message />} />
              </Route>
              <Route path="friends" element={<FriendsList />}>
                <Route path=":friendId" element={<Profile />} />
              </Route>
              <Route path="groups" element={<Groups />}>
                <Route path=":groupId" element={<Group />} />
              </Route>
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
