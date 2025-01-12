import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AICoach from './components/AICoach';
import Auth from './components/Auth';
import Budget from './components/Budget';
import Learn from './components/Learn';
import SaveTogether from './components/SaveTogether';
import Hero from './components/hero/hero';
import Navigation from './components/navigation/navigation';

const PrivateRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  return isLoggedIn ? children : <Navigate to="/auth" replace />;
};

function App() {
  return (
    <Router>
      <div className="App">
          <Navigation />
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Hero />
                  <AICoach />
                  <Budget />
                  <Learn />
                  <SaveTogether />
                </PrivateRoute>
              }
            />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
