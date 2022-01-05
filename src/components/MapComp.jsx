import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { whereISS } from "../store/actionISS";
import L from "leaflet";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

// ICON ISS WITH LEAFLET //
const Icon = L.icon({
  iconUrl: "http://open-notify.org//Open-Notify-API/map/ISSIcon.png",
  iconSize: [50, 30],
  iconAnchor: [25, 15],
  popupAnchor: [0, -30],
});

const MapComp = () => {
  const dispatch = useDispatch();
  const issData = useSelector((state) => state.reducerISS.iss.iss_position);
  const [position, setPosition] = useState([0,20]);

  useEffect(() => {
    setInterval(() => {
      dispatch(whereISS());
    }, 10000);
  }, [dispatch]);

  useEffect(() => {
        setPosition([issData.latitude, issData.longitude])
  }, [issData] );

  return (
    <MapContainer
        style={{width: '100vw', height: '100vh'}}
        center={{lat: 0, lng: 20}}
        zoom={2}
        scrollWheelZoom={false}
        minZoom={0}
        maxZoom={7}
        >

      <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position} icon={Icon}></Marker>

    </MapContainer>
  );
};

export default MapComp;
