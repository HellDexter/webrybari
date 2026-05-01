"use client";

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix pro chybějící ikony leafletu v Next.js
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

// Zelená ikona pro začátek, červená pro konec (použijeme defaultní barevné filtry nebo jiné ikony, pro teď default)
const startIcon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const endIcon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface RevirMapProps {
  startPos: [number, number];
  endPos: [number, number];
  revirName: string;
}

// Komponenta pro automatické vycentrování mapy tak, aby obsáhla oba body
function FitBounds({ bounds }: { bounds: L.LatLngBoundsExpression }) {
  const map = useMap();
  useEffect(() => {
    map.fitBounds(bounds, { padding: [50, 50] });
  }, [map, bounds]);
  return null;
}

export default function RevirMap({ startPos, endPos, revirName }: RevirMapProps) {
  const bounds: L.LatLngBoundsExpression = [startPos, endPos];

  return (
    <div className="h-full w-full rounded-b-2xl overflow-hidden z-0 relative">
      <MapContainer 
        bounds={bounds} 
        scrollWheelZoom={false} 
        className="h-full w-full"
        style={{ height: '100%', width: '100%', minHeight: '300px' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Vykreslení zjednodušené spojnice mezi body (čára nepůjde přesně po řece) */}
        <Polyline 
          positions={[startPos, endPos]} 
          color="#3b82f6" // blue-500
          weight={4}
          opacity={0.6}
          dashArray="10, 10"
        />

        <Marker position={startPos} icon={startIcon}>
          <Popup>
            <strong>{revirName}</strong><br/>
            Začátek revíru
          </Popup>
        </Marker>
        
        <Marker position={endPos} icon={endIcon}>
          <Popup>
            <strong>{revirName}</strong><br/>
            Konec revíru
          </Popup>
        </Marker>
        
        <FitBounds bounds={bounds} />
      </MapContainer>
    </div>
  );
}
