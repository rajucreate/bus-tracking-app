import { useLocation } from "react-router-dom";
import busData from "./busData.json";
import { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./BusDetails.css";

// Example city coordinates (latitude, longitude)
const cityCoords = {
  Ludhiana: [30.9010, 75.8573],
  Amritsar: [31.6340, 74.8723],
  Jalandhar: [31.3260, 75.5762],
  Patiala: [30.3398, 76.3869],
  Bathinda: [30.2110, 74.9455],
  Moga: [30.8165, 75.1715],
  Hoshiarpur: [31.5326, 75.9126],
  Sangrur: [30.2455, 75.8422],
  Firozpur: [30.9160, 74.6190],
  Faridkot: [30.6723, 74.7569],
  Kapurthala: [31.3799, 75.3849],
  Ropar: [30.9666, 76.5330],
};

export default function BusDetails() {
  const location = useLocation();
  const { source, destination } = location.state || {};
  const [selectedBus, setSelectedBus] = useState(null);

  const route = busData.find(
    (item) =>
      item.source.toLowerCase() === source.toLowerCase() &&
      item.destination.toLowerCase() === destination.toLowerCase()
  );

  useEffect(() => {
    if (selectedBus && source && destination) {
      const map = L.map("map").setView(cityCoords[source], 10);

      // OpenStreetMap layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/">OSM</a> contributors',
      }).addTo(map);

      // Add markers for source and destination
      L.marker(cityCoords[source]).addTo(map).bindPopup(`Source: ${source}`).openPopup();
      L.marker(cityCoords[destination]).addTo(map).bindPopup(`Destination: ${destination}`);

      // Draw red line between source and destination
      const latlngs = [cityCoords[source], cityCoords[destination]];
      L.polyline(latlngs, { color: "red", weight: 4 }).addTo(map);

      // Fit map bounds to show the entire line
      map.fitBounds(latlngs);

      return () => map.remove();
    }
  }, [selectedBus, source, destination]);

  return (
    <div className="bus-details">
      <h2>
        Buses from {source} → {destination}
      </h2>

      {route && route.buses.length > 0 ? (
        route.buses.map((bus, index) => (
          <div
            key={index}
            className="bus-card"
            onClick={() => setSelectedBus(bus)}
          >
            <p><strong>{bus.name}</strong></p>
            <p>Departure: {bus.departureTime}</p>
            <p>Arrival: {bus.arrivalTime}</p>
            <p>Fare: ₹{bus.fare}</p>
          </div>
        ))
      ) : (
        <p>No buses found for this route.</p>
      )}

      {selectedBus && (
        <div className="map-container">
          <h3>Route for: {selectedBus.name}</h3>
          <div id="map" style={{ width: "100%", height: "400px", borderRadius: "10px" }}></div>
        </div>
      )}
    </div>
  );
}
