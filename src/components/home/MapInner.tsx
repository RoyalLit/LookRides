'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './OfficeLocationMap.module.css';

// The specific location
const position: [number, number] = [28.690784, 77.07586];

// The map fly-to animation component
function MapController() {
  const map = useMap();
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // Only animate once when the component mounts
    if (!hasAnimated) {
      // Start zoomed out, then fly into the specific location
      const zoomOutPos: [number, number] = [28.690784 - 0.1, 77.07586 - 0.1];
      map.setView(zoomOutPos, 10);
      
      setTimeout(() => {
        map.flyTo(position, 16, {
          duration: 3,
          easeLinearity: 0.25
        });
        setHasAnimated(true);
      }, 500);
    }
  }, [map, hasAnimated]);

  return null;
}

export default function MapInner() {
  // Create a custom HTML marker for the radar pulse effect
  const customIcon = L.divIcon({
    className: styles.pulseMarker,
    html: `<div class="${styles.pulseMarkerInner}"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });

  return (
    <MapContainer 
      center={position} 
      zoom={16} 
      scrollWheelZoom={false}
      className={styles.mapWrapper}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      <MapController />
      <Marker position={position} icon={customIcon}>
        <Popup>
          <div className={styles.popupContent}>
            <h4>LookRides Office</h4>
            <p>#73 -A Friends Enclave<br/>Sultanpuri, New Delhi, 110083</p>
            <a 
              href="https://www.google.com/maps/place/Friends+enclave/@28.6945182,76.8642591,72840m/data=!3m1!1e3!4m6!3m5!1s0x390d0500633023b5:0xe6fbbe654784e2e7!8m2!3d28.690784!4d77.07586!16s%2Fg%2F11ybybzsc3"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.directionsBtn}
            >
              Get Directions
            </a>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
