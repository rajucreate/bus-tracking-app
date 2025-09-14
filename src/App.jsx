import React, { useRef, useState } from 'react';
import './App.css';
import { useNavigate } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const containerRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [lang, setLang] = useState("en");
  const navigate = useNavigate();

  const apiKey = "0de4382d43f54c67a9ae9d56ac8e121b";

  const playTTS = (text) => {
    const voiceLang = lang === "hi" ? "hi-in" : "en-us";
    const url = `https://api.voicerss.org/?key=${apiKey}&hl=${voiceLang}&src=${encodeURIComponent(text)}`;
    const audio = new Audio(url);
    audio.crossOrigin = "anonymous";
    audio.load();
    audio.play().catch(err => console.error("TTS playback failed:", err));
  };

  // Sign In
  const handleSignIn = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (data.success) {
      alert("Login successful!");
      localStorage.setItem("user", JSON.stringify({ email: data.user.email, name: data.user.name }));
      navigate("/homeAfterLogin");
    } else {
      alert(data.message || "Login failed");
    }
  };

  // Sign Up
  const handleSignUp = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    const res = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    if (data.success) {
      alert("Signup successful!");
      localStorage.setItem("user", JSON.stringify({ email, name }));
      navigate("/homeAfterLogin");
    } else {
      alert(data.message || "Signup failed");
    }
  };

  return (
    <div id="main">
      <div
        ref={containerRef}
        className={`container ${isActive ? 'active' : ''}`}
        id="container"
      >

        {/* Sign Up Form */}
        <div className="form-container sign-up">
          <form onSubmit={handleSignUp}>
            <h1>Create Account</h1>
            <div className="social-icons">
              <a href="#" className="icon"><i className="fab fa-google-plus-g"></i></a>
              <a href="#" className="icon"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="icon"><i className="fab fa-github"></i></a>
              <a href="#" className="icon"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <span>or use your email for registration</span>

            <div style={{ display: "flex", alignItems: "center", marginTop: "5px" }}>
              <input type="text" name="name" placeholder="Name" required />
              <button type="button" onClick={() => playTTS(lang === "hi" ? "नाम" : "Name")} style={{ marginLeft: "5px" }}>🔊</button>
            </div>

            <div style={{ display: "flex", alignItems: "center", marginTop: "5px" }}>
              <input type="email" name="email" placeholder="Email" required />
              <button type="button" onClick={() => playTTS(lang === "hi" ? "ईमेल" : "Email")} style={{ marginLeft: "5px" }}>🔊</button>
            </div>

            <div style={{ display: "flex", alignItems: "center", marginTop: "5px" }}>
              <input type="password" name="password" placeholder="Password" required />
              <button type="button" onClick={() => playTTS(lang === "hi" ? "पासवर्ड" : "Password")} style={{ marginLeft: "5px" }}>🔊</button>
            </div>

            <button type="submit">Sign Up</button>
          </form>
        </div>

        {/* Sign In Form */}
        <div className="form-container sign-in">
          <form onSubmit={handleSignIn}>
            <h1>Sign In</h1>
            <div className="social-icons">
              <a href="#" className="icon"><i className="fab fa-google-plus-g"></i></a>
              <a href="#" className="icon"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="icon"><i className="fab fa-github"></i></a>
              <a href="#" className="icon"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <span>or use your email and password</span>

            <div style={{ display: "flex", alignItems: "center", marginTop: "5px" }}>
              <input type="email" name="email" placeholder="Email" required />
              <button type="button" onClick={() => playTTS(lang === "hi" ? "ईमेल" : "Email")} style={{ marginLeft: "5px" }}>🔊</button>
            </div>

            <div style={{ display: "flex", alignItems: "center", marginTop: "5px" }}>
              <input type="password" name="password" placeholder="Password" required />
              <button type="button" onClick={() => playTTS(lang === "hi" ? "पासवर्ड" : "Password")} style={{ marginLeft: "5px" }}>🔊</button>
            </div>

            <a href="#" onClick={() => playTTS(lang === "hi" ? "क्या आपने अपना पासवर्ड भूल गए?" : "Forgot your password?")}>
              Forgot your password?
            </a>
            
            <button type="submit">Sign In</button>
          </form>
        </div>

        {/* Toggle Panels */}
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all of our site’s features</p>
              <button className="hidden" onClick={() => setIsActive(false)}>Sign In</button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>Register with your personal details to use all of our site’s features</p>
              <button className="hidden" onClick={() => setIsActive(true)}>Sign Up</button>
            </div>
          </div>
        </div>

        {/* Language Selector */}
        <div style={{ position: "absolute", top: 10, right: 10 }}>
          <select value={lang} onChange={(e) => setLang(e.target.value)}>
            <option value="en">English</option>
            <option value="hi">हिन्दी (Hindi)</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default App;