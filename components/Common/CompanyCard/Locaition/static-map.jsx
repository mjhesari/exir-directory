'use client'
// Public imports
import dynamic from 'next/dynamic';

//* Import utils
import { convertToObjectLocation } from '@/utils/functions/functions';

//* Import components
import 'leaflet/dist/leaflet.css';
import markerSrc from '@/public/marker.png';
import L from 'leaflet';

// Marker configuration (ensuring it only runs on the client)
const createMarkerIcon = () => {
  return L.icon({
    iconUrl: markerSrc.src,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

// Dynamic imports for Leaflet components
const Map = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false });
const TileLayerDynamic = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), {
  ssr: false,
});
const MarkerDynamic = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), {
  ssr: false,
});

const StaticMap = ( {position }) => {
  if (!position) return null;

  const location = convertToObjectLocation(position)
  const isValidLocation = location && !isNaN(location.lat) && !isNaN(location.lng);
  const safeLocation = isValidLocation ? location : { lat: 32, lng: 54 };
  const LocationMarker = () => {
    return position === null ? null : (
      <MarkerDynamic
        position={safeLocation}
        icon={createMarkerIcon()}
      />
    );
  };

  return (
    <Map
    center={safeLocation}
    scrollWheelZoom={false}
    touchZoom={false}
    zoom={14}
    className="h-full w-full rounded-lg border z-10"
    whenReady={(map) => map.target.invalidateSize()}
  >
    <TileLayerDynamic
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
    />
    <LocationMarker />
  </Map>
  );
};

export default StaticMap;



