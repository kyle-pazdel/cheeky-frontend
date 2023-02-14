import { MapContainer, TileLayer, useMap, Popup, Marker } from "react-leaflet";
import L from "leaflet";
import marker from "./assets/lipstick2.svg";
import "leaflet/dist/leaflet.css";

export function MapComponent(props) {
  const position = [props.latitude, props.longitude];

  const myIcon = new L.icon({
    iconUrl: marker,
    iconSize: [80, 80],
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
  });

  return (
    <div>
      <div className="leaflet-container">
        {props.longitude !== undefined ? (
          <MapContainer center={position} zoom={14} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={myIcon}>
              <Popup>
                {props.booking.event_name}
                <br />
                {props.booking.address}, <br />
                {props.booking.city}, {props.booking.state}
              </Popup>
            </Marker>
          </MapContainer>
        ) : null}
      </div>
    </div>
  );
}
