import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Economy from "./components/economy/economy"; 
import Dashboard from "./components/dashboard/dashboard";
import Login from "./components/Authentication/login.tsx";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} /> {/* Replace with your Dashboard component */}
          <Route path="/economy" element={<Economy />} />
          <Route path="/reports" element={<div>Reports Page</div>} /> {/* Replace with your Reports component */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
