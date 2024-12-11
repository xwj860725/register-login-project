import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Profil from './components/Profil';

const App = () => {
  const [username, setUsername] = useState(''); // Stores the user name of the logged in user

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/register" />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={<Login setUsername={setUsername} />} // Pass the setUsername function
          />
          <Route path="/profil" element={<Profil username={username} />} /> {/* Pass the username */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
