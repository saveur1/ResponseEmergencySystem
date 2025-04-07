
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Dashboard from "./components/Dashboard/Dashboard";
import IncidentDetails from "./components/incidentDetails/incidentDetails";
import Navigation from "./components/Navigation/Navigation";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <>
                <Navigation />
                <Dashboard />
              </>
            }
          />
          <Route
            path="/incident/:id"
            element={
              <>
                <Navigation />
                <IncidentDetails />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
