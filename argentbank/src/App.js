import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importer Routes
import Home from './components/Home';
// import Login from './components/Login';
// import User from './components/User';

function App() {
  return (
    <Router>
      <div>
        <Routes> {/* Utiliser Routes comme parent */}
          <Route exact path="/" element={<Home />} /> {/* Utiliser l'attribut element pour spécifier le composant */}
          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route path="/user" element={<User />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;