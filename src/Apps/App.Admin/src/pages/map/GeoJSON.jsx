import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import L, { divIcon } from "leaflet";
import seg from "./seg.json";
import ecomp from "./ecomp.json";
const GeoJSONMap = () => {
  const position = [37.5004851, -96.2261503];
  const setColor = ({ properties }) => {
    return { weight: 1 };
  };

  const customMarkerIcon = (name) =>
    divIcon({
      html: name,
      className: "icon",
    });
  const setIcon = ({ properties }, latlng) => {
    return L.marker(latlng, { icon: customMarkerIcon(properties.Name) });
  };
  return (
    <div className="w-full h-[300px]">
      <MapContainer
        center={position}
        zoom={4}
        maxZoom={18}
        zoomControl={false}
        minZoom={3}
        animate={true}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON data={seg} style={setColor} />
        <GeoJSON data={ecomp} pointToLayer={setIcon} />
      </MapContainer>
    </div>
  );
};

export default GeoJSONMap;
