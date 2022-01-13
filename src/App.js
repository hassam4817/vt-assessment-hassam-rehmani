import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ReportsPage from "./pages/ReportsPage";
import TeamsPage from "./pages/TeamsPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={ <HomePage /> } />
          <Route path="/teams" element={ <TeamsPage /> } />
          <Route path="/reports" element={ <ReportsPage /> } />
        </Routes>
      </Router>
    </>
  );
}

export default App;
