import { MapContainer, TileLayer, useMap, Popup, Marker } from "react-leaflet";
import { Icon } from "leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";

export function MapComponent() {
  const SearchField = () => {
    const provider = new OpenStreetMapProvider();

    const map = useMap();
    useEffect(() => {
      map.addControl(searchControl);
      return () => map.removeControl(searchControl);
    }, []);

    // @ts-ignore

    const searchControl = new GeoSearchControl({
      provider: provider,
      // style: "bar",
      autoComplete: true,
    });
  };

  const position = [33.824, -116.55];
  return (
    <div class="leaflet-container">
      <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
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

      {/* <form>
        <input type="text">Search</input>
      </form> */}
      {/* <MapContainer id="map" center={[33.824, -116.55]} zoom={13} scrollWheelZoom={false}>
        {<SearchField />}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer> */}
    </div>
  );
}
