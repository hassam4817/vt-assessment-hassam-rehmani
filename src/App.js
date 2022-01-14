import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import ReportsPage from "./pages/ReportsPage";
import TeamsPage from "./pages/TeamsPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Container fluid style={{ width: "95%" }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/teams" element={<TeamsPage />} />
            <Route path="*" element={ <NotFoundPage /> } />
          </Routes>
        </Container>
      </Router>
    </>
  );
}

export default App;
