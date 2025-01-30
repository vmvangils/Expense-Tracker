import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Economy from "./components/economy/economy"; 
import Dashboard from "./components/dashboard/dashboard";
import Report from "./components/report/report";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} /> {/* Replace with your Dashboard component */}
          <Route path="/economy" element={<Economy />} />
          <Route path="/report" element={<Report  /> } /> {/* Replace with your Reports component */}
          <Route path="/login" element={<div>Login Page</div>} /> {/* Replace with your Login component */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
