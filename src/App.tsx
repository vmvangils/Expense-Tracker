import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "@/components/navbar/Navbar"; // Using alias
import Economy from "@/components/economy/economy"; // Using alias

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<div>Dashboard Page</div>} /> {/* Replace with your Dashboard component */}
          <Route path="/economy" element={<Economy />} />
          <Route path="/reports" element={<div>Reports Page</div>} /> {/* Replace with your Reports component */}
          <Route path="/login" element={<div>Login Page</div>} /> {/* Replace with your Login component */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
