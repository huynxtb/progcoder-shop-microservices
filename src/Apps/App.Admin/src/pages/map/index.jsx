import React from "react";
import Card from "@/components/ui/Card";
import BasicMap from "./basic-map";
import MarkerMap from "./marker-map";
import GeoJSON from "./GeoJSON";
import VMap from "./VectoreMap";
const MapPage = () => {
  return (
    <div className=" space-y-5">
      <Card title="Basic Map">
        <BasicMap />
      </Card>
      <Card title="Leaflet Marker, Circle & Polygon Map">
        <MarkerMap />
      </Card>
      <Card title="Leaflet GeoJSON Map">
        <GeoJSON />
      </Card>
      <Card title="React Vector Maps">
        <VMap />
      </Card>
    </div>
  );
};

export default MapPage;
