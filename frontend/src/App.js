import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Profil from './components/Profil';

const App = () => {
  const [username, setUsername] = useState(''); // 存储登录用户的用户名

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/register" />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={<Login setUsername={setUsername} />} // 传递 setUsername 函数
          />
          <Route path="/profil" element={<Profil username={username} />} /> {/* 传递用户名 */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
