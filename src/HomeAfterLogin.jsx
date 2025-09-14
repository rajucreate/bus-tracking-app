import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App2.css";

export default function HomeAfterLogin() {
  const [isOffline, setIsOffline] = useState(false);
  const [user, setUser] = useState(null);
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/app"); // redirect to login if not logged in
    }

    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => setIsOffline(false);

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/"); // go back to landing page
  };

  const handleSearch = () => {
    if (!source || !destination) {
      alert("Please select both source and destination.");
      return;
    }

    if (source === destination) {
      alert("Source and Destination cannot be the same.");
      return;
    }

    navigate("/busdetails", { state: { source, destination } });
  };

  if (!user) return null;

  return (
    <>
      <div id="home_main">
        <header>
          <h1>Bus Tracker</h1>

          <div className="search-bar">
            <input type="text" placeholder="Enter Bus Number" />
            <button>Search</button>
          </div>

          <div className="auth-buttons">
            <span>Welcome, {user.name}!</span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </header>

        <main>
          <div className="card">
            <h2>Nearest Stop</h2>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.83834362837!2d76.7794183!3d30.7333148!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fed0d8b2b2f07%3A0x8b86b1b845a70d2!2sBus%20Stop!5e0!3m2!1sen!2sin!4v1694523412345"
              width="100%" height="160"
              style={{ border: 0, borderRadius: "10px" }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>

          <div className="card">
            <h2>Plan Your Trip</h2>
            <label htmlFor="source">Source:</label>
            <select id="source" value={source} onChange={(e) => setSource(e.target.value)}>
              <option value="">--Select Source--</option>
              <option>Ludhiana</option>
              <option>Amritsar</option>
              <option>Jalandhar</option>
              <option>Patiala</option>
              <option>Bathinda</option>
              <option>Moga</option>
              <option>Hoshiarpur</option>
              <option>Sangrur</option>
              <option>Firozpur</option>
              <option>Faridkot</option>
              <option>Kapurthala</option>
              <option>Ropar</option>
            </select>

            <label htmlFor="destination">Destination:</label>
            <select id="destination" value={destination} onChange={(e) => setDestination(e.target.value)}>
              <option value="">--Select Destination--</option>
              <option>Ludhiana</option>
              <option>Amritsar</option>
              <option>Jalandhar</option>
              <option>Patiala</option>
              <option>Bathinda</option>
              <option>Moga</option>
              <option>Hoshiarpur</option>
              <option>Sangrur</option>
              <option>Firozpur</option>
              <option>Faridkot</option>
              <option>Kapurthala</option>
              <option>Ropar</option>
            </select>

            <button className="search-btn" onClick={handleSearch}>Search</button>
          </div>
        </main>

        <footer>© 2025 Bus Tracker. All rights reserved.</footer>
      </div>

      {isOffline && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>⚠ Network Not Connected</h3>
            <p>
              Your internet connection is lost. To get information about available buses, please contact: <br />
              <b>+91 8393729037</b>
            </p>
            <button onClick={() => setIsOffline(false)}>OK</button>
          </div>
        </div>
      )}
    </>
  );
}
