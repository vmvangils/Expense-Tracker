import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Economy from './routes/economy';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/economy" element={<Economy />} />
          {/* Other routes */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
