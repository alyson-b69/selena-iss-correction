import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { whereISS } from "../store/actionISS";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";

// ICON ISS WITH LEAFLET //

const Icon = L.icon({
  iconUrl: "http://open-notify.org//Open-Notify-API/map/ISSIcon.png",
  iconSize: [50, 30],
  iconAnchor: [25, 15],
  popupAnchor: [0, -30],
});

// function MapISS({ center, zoom }) {
//   const map = useMap();
//   map.setView(center, (zoom = 13));
//   return null;
// }

const MapComp = () => {
  // const [previousLocation, setPreviousLocation] = useState([]);
  const dispatch = useDispatch();
  const issData = useSelector((state) => state.reducerISS.iss.iss_position);
  const [markers, setMarkers] = useState();

  useEffect(() => {
    setInterval(() => {
      dispatch(whereISS());
    }, 1000);
  }, [dispatch]);

  useEffect(() => {
    const checkInput = () => {
      if (issData) {
        setMarkers({
          lat: issData.latitude,
          lng: issData.longitude,
        });
      }
    };
    // const previousLoc = function () {
    //   if (issData) {
    //     let currentLoc = {
    //       lat: issData.latitude,
    //       lng: issData.longitude,
    //       id: issData.timestamp,
    //     };
    //     setPreviousLocation([...previousLocation, currentLoc]);
    //   }
    // };
    // checkInput();
    // previousLoc();
    return () => {
      checkInput();
    };
  }, [issData]);

  return (
    <MapContainer center={markers}>
      {/* <MapISS center={[issData]} /> */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {/* {previousLocation &&
                previousLocation.map((issData, index) => (
                    <Marker position={issData} key={index} icon={Dot}></Marker>
                ))} */}
    </MapContainer>
  );
};

export default MapComp;
