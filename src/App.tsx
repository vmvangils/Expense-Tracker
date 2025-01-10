import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Economy from "./components/economy/economy";

function NotFound() {
  return <h2>404 - Page Not Found</h2>;
}

function App() {
  return (
    <Router>
      <div>
        <Economy />

        <Navbar />
        <NotFound />
      </div>
    </Router>
  );
}

export default App;
