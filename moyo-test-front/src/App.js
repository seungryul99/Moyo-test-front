import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/test';
import TestPage from './components/testSuccess';

function App() {
  return (
      <Router>
        <div>
          <LoginPage />
          <Routes>
            <Route path="/test" element={<TestPage />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
