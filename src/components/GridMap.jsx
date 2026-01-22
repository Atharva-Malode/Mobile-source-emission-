"use client";

import { useEffect, useRef } from "react";
import shp from "shpjs";
import "leaflet/dist/leaflet.css";

export default function GridMap({ city }) {
  const mapRef = useRef(null);

  useEffect(() => {
    let map;

    async function initMap() {
      const L = (await import("leaflet")).default;

      // 🔑 FIX 1: DESTROY EXISTING MAP
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }

      // 🔑 FIX 2: RESET CONTAINER (VERY IMPORTANT)
      const container = document.getElementById("grid-map");
      if (container && container._leaflet_id) {
        container._leaflet_id = null;
      }

      // ----------------------------
      // MAP INIT
      // ----------------------------
      map = L.map("grid-map", {
        zoomControl: true,
        minZoom: 10,
        maxZoom: 18,
      });

      mapRef.current = map;

      // ----------------------------
      // BASE MAP
      // ----------------------------
      const osm = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        { attribution: "" }
      ).addTo(map);

      let gridLayer;
      let roadLayer;

      // ----------------------------
      // CITY CENTERS (DUMMY)
      // ----------------------------
      const cityCenters = {
        nagpur: [21.12262501502752, 79.07361913854234],
        mumbai: [19.076, 72.8777],
        delhi: [28.6139, 77.209],
      };

      const targetLatLng = cityCenters[city] || cityCenters.nagpur;

      // ----------------------------
      // GRID LAYER
      // ----------------------------
      shp("/shape/grid.zip").then((geojson) => {
        gridLayer = L.geoJSON(geojson, {
          onEachFeature: (_, layer) => {
            const isTarget = layer.getBounds().contains(targetLatLng);

            layer.setStyle({
              color: "#455a64",
              weight: 1,
              fillColor: isTarget ? "#1565c0" : "#e0f2f1",
              fillOpacity: isTarget ? 0.6 : 0.4,
            });
          },
        }).addTo(map);

        map.fitBounds(gridLayer.getBounds(), { padding: [30, 30] });
        gridLayer.bringToBack();
        addLayerControl();
      });

      // ----------------------------
      // ROAD NETWORK
      // ----------------------------
      shp("/shape/road_network.zip").then((geojson) => {
        roadLayer = L.geoJSON(geojson, {
          style: (feature) => classifyRoad(feature.properties?.ref),
        }).addTo(map);

        roadLayer.bringToFront();
        addLayerControl();
      });

      function addLayerControl() {
        if (!gridLayer || !roadLayer) return;

        L.control.layers(
          { OpenStreetMap: osm },
          {
            "Grid Layer": gridLayer,
            "Road Network": roadLayer,
          },
          { collapsed: false }
        ).addTo(map);
      }

      function classifyRoad(ref) {
        if (!ref) return { color: "#90a4ae", weight: 1 };
        const code = ref.toUpperCase();
        if (code.startsWith("NH")) return { color: "#b71c1c", weight: 4 };
        if (code.startsWith("SH") || code.startsWith("MSG")) return { color: "#ef6c00", weight: 3 };
        if (code.startsWith("MDR")) return { color: "#fbc02d", weight: 2.5 };
        return { color: "#90a4ae", weight: 1 };
      }
    }

    initMap();

    // CLEANUP
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [city]);

  return <div id="grid-map" className="w-full h-full" />;
}
