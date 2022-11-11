import { MapContainer, TileLayer, useMap, Popup, Marker } from "react-leaflet";
import { Icon } from "leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";

export function MapComponent(props) {
  // const SearchField = () => {
  //   const provider = new OpenStreetMapProvider();

  //   const map = useMap();
  //   useEffect(() => {
  //     map.addControl(searchControl);
  //     return () => map.removeControl(searchControl);
  //   }, []);

  //   const searchControl = new GeoSearchControl({
  //     provider: provider,
  //     style: "bar",
  //     autoComplete: true,
  //   });

  //   return null;
  // };
  const position = [props.latitude, props.longitude];
  // const position = [33.8031041, -116.5253072];

  return (
    <div>
      <div className="leaflet-container">
        {props.longitude !== undefined ? (
          <MapContainer center={position} zoom={15} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
        ) : null}
      </div>
      <h1>LAT: {props.latitude}</h1>
      <h1>LONG: {props.longitude}</h1>
    </div>
  );
}
