import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../src/Pages/Home.jsx";
import Sign from "../src/Pages/Sign.jsx";
import Error from "../src/Pages/Error.jsx";
import Footer from "./Components/Footer.jsx";
import Nav from "./Components/Nav.jsx";
import Users from "./Pages/Users.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "./Redux/reducers/authSlice";

function App() {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    // Récupérer le token du sessionStorage lors du chargement de l'application
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      // Mettre à jour le token dans le store Redux s'il existe
      dispatch(setToken(storedToken));
    }
  }, [dispatch]);

  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign" element={<Sign />} />
        <Route path="/*" element={<Error />} />
        <Route path="/users" element={token ? <Users /> : <Error />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;