import Navbar from "./Page/Navbar/Navbar";
import Auth from "./Page/CommonAuthPage/Auth";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Profile from "./Page/Profile/profile";
import Performance from "./Page/Performance/performance";
import AdminLogin from "./Page/AdminLogin/login";
import Dashboard from "./Page/AdminDashboard/dashboard";
import Stream from "./Page/Streams/Stream";
import Subjects from "./Page/Subjects/Subjects";
import Marks from "./Page/Marks/Marks";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token && !window.location.pathname.includes("admin")) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/streams" element={<Stream />} />
        <Route path="/admin/subjects" element={<Subjects />} />
        <Route path="/admin/marks" element={<Marks />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/performance" element={<Performance />} />
        <Route path="*" element={<div>404 Page not found</div>} />
      </Routes>
    </>
  );
}

export default App;
