import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../Redux/api/callAuth.jsx';

const Form = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem('rememberedUsername');
    const storedPassword = localStorage.getItem('rememberedPassword');
    const storedRememberMe = localStorage.getItem('rememberedRememberMe');

    if (storedUsername && storedPassword && storedRememberMe === 'true') {
      setUsername(storedUsername);
      setPassword(storedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleSignIn = async () => {
    try {     
      await signIn(username, password, dispatch, navigate);
      if (rememberMe) {
        localStorage.setItem('rememberedUsername', username);
        localStorage.setItem('rememberedPassword', password);
        localStorage.setItem('rememberedRememberMe', 'true');
      } else {
        // Si Remember Me n'est pas coché, effacez les informations stockées
        localStorage.removeItem('rememberedUsername');
        localStorage.removeItem('rememberedPassword');
        localStorage.removeItem('rememberedRememberMe');
      }
    } catch (error) {
      setError("Erreur lors de la connexion. Veuillez vérifier vos identifiants.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    await handleSignIn();
  }; 

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="username" >Username</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="input-remember">
          <input type="checkbox" id="remember-me" checked={rememberMe} onChange={(e) => {
            setRememberMe(e.target.checked);
            // Si l'utilisateur décoche "Remember Me", effacez les informations stockées
            if (!e.target.checked) {
              localStorage.removeItem('rememberedUsername');
              localStorage.removeItem('rememberedPassword');
              localStorage.removeItem('rememberedRememberMe');
            }
          }} />
          <label htmlFor="remember-me">Remember me</label>
        </div> 
        {error && <div className="error-message">{error}</div>}              
        <button type="submit" className="sign-in-button">Sign In</button>    
      </form>
    </div>
  );
};

export default Form;