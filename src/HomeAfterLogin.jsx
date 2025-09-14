import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App2.css"; // same CSS as Home.jsx

export default function HomeAfterLogin() {
  const [isOffline, setIsOffline] = useState(false);
  const [user, setUser] = useState(null);

  // ✅ Added source & destination state
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/app"); // redirect to login/signup if not logged in
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

    // Navigate to BusDetails page and pass source & destination
    navigate("/busdetails", { state: { source, destination } });
  };

  if (!user) return null; // wait while checking

  return (
    <>
      <div id="home_main">
        {/* Header */}
        <header>
          <h1>Bus Tracker</h1>

          {/* Search Bar */}
          <div className="search-bar">
            <input type="text" placeholder="Enter Bus Number" />
            <button>Search</button>
          </div>

          {/* User Info + Logout */}
          <div className="auth-buttons">
            <span>Welcome, {user.name}!</span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </header>

        {/* Main */}
        <main>
          {/* Nearest Stop Card */}
          <div className="card">
            <h2>Nearest Stop</h2>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.83834362837!2d76.7794183!3d30.7333148!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fed0d8b2b2f07%3A0x8b86b1b845a70d2!2sBus%20Stop!5e0!3m2!1sen!2sin!4v1694523412345"
              width="100%"
              height="160"
              style={{ border: 0, borderRadius: "10px" }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>

          {/* Plan Your Trip Card */}
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

        {/* Footer */}
        <footer>© 2025 Bus Tracker. All rights reserved.</footer>
      </div>

      {/* Modal */}
      {isOffline && (
        <div className="modal">
          <div className="modal-content">
            <h3>⚠ Internet Lost</h3>
            <p>
              Your connection has been lost. Please contact <br />
              <b>+91 8393729037</b> for help.
            </p>
            <button onClick={() => setIsOffline(false)}>OK</button>
          </div>
        </div>
      )}
    </>
  );
}
