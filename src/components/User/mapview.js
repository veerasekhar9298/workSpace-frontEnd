import {
  MapContainer,
  TileLayer,
  Popup,
  Marker,
  CircleMarker,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";
import { Icon } from "leaflet";
import { workSpaceContext } from "../../App";
import { useContext, useEffect, useState } from "react";
function MapViewSpace(props) {
  const navigate = useNavigate();

  const { workSpaceState } = useContext(workSpaceContext);

  console.log(workSpaceState.maps);
  const [userLocation, setUserLocation] = useState(null);
  const customIcon = new Icon({
    // iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
    iconUrl: require("../Payment/placeholder.png"),
    iconSize: [38, 38], // size of the icon
  });

  const handleMarkerClick = (workspaceId) => {
    // Handle the click event here, e.g., redirect to the workspace page with the workspaceId
    // For demonstration purposes, we'll just log the workspaceId to the console.
    console.log(`Clicked on workspace with ID: ${workspaceId}`);

    navigate(`/ShowWorkSpace/${workspaceId}`);
  };

  useEffect(() => {
    // Get the user's geolocation using the Geolocation API
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
      });
    }
  }, []);
  return (
    <>
        <h4 className="display-4 text-center my-2 py-2"> Explore and book spaces near you on Checkout</h4>
      {userLocation && (
        <MapContainer
          className="shadow"
          style={{ width: "100%", height: "800px" }}
          center={userLocation}
          zoom={12}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <TileLayer
            url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
            attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a> contributors'
          />
          <CircleMarker
            center={userLocation}
            pathOptions={{ fillColor: "blue", color: "blue" }}
            radius={6}
          >
            <Popup>You are here</Popup>
          </CircleMarker>

          {/* Map over the workspaces and create markers */}
          {workSpaceState.maps.map((workspace) => (
            <Marker
              key={workspace.workSpaceId}
              position={[workspace.latitude, workspace.longitude]}
              icon={customIcon}
              
            >
              <Popup onClick={() => handleMarkerClick(workspace.workSpaceId)}>
              <span
                  style={{ cursor: "pointer" }}
                  onClick={() => handleMarkerClick(workspace.workSpaceId)}
                >
                  {workspace.address}
                </span>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </>
  );
}

export default MapViewSpace;
