"use client";

import { useEffect, useRef, useState } from "react";
import shp from "shpjs";
import "leaflet/dist/leaflet.css";

/* ----------------------------
   NEERI GRID EMISSION VALUES
   ---------------------------- */
const NEERI_EMISSIONS = {
  PM: 12.5,
  NOx: 28.4,
  HC: 9.1,
  CO: 42.7,
};

export default function GridPage() {
  const mapRef = useRef(null);
  const hasInitializedRef = useRef(false);
  const containerIdRef = useRef("grid-map");
  const [city, setCity] = useState("nagpur");

  useEffect(() => {
    // 🔑 STRICT MODE GUARD
    if (hasInitializedRef.current) return;
    hasInitializedRef.current = true;

    let map;

    const initMap = async () => {
      const L = (await import("leaflet")).default;

      /* ----------------------------
         MAP INIT
      ---------------------------- */
      map = L.map(containerIdRef.current, {
        zoomControl: true,
        minZoom: 10,
        maxZoom: 18,
      });

      mapRef.current = map;

      /* ----------------------------
         BASE MAP
      ---------------------------- */
      const osm = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        { attribution: "" }
      ).addTo(map);

      /* ----------------------------
         FIXED CITY CENTER (NAGPUR)
      ---------------------------- */
      const targetLatLng = [21.12262501502752, 79.07361913854234];

      /* ----------------------------
         GRID LAYER (WITH HOVER DATA)
      ---------------------------- */
      const gridGeojson = await shp("/shape/grid.zip");

      const gridLayer = L.geoJSON(gridGeojson, {
        onEachFeature: (_, layer) => {
          const isTarget = layer.getBounds().contains(targetLatLng);

          layer.setStyle({
            color: "#455a64",
            weight: 1,
            fillColor: isTarget ? "#1565c0" : "#e0f2f1",
            fillOpacity: isTarget ? 0.6 : 0.3,
          });

          /* ---------- TOOLTIP CONTENT ---------- */
          const tooltipHtml = isTarget
            ? `
              <b>NEERI Grid</b><br/>
              PM: ${NEERI_EMISSIONS.PM} Kg/D<br/>
              NOx: ${NEERI_EMISSIONS.NOx} Kg/D<br/>
              HC: ${NEERI_EMISSIONS.HC} Kg/D<br/>
              CO: ${NEERI_EMISSIONS.CO} Kg/D
            `
            : `
              <b>Grid Cell</b><br/>
              PM: 0 Kg/D<br/>
              NOx: 0 Kg/D<br/>
              HC: 0 Kg/D<br/>
              CO: 0 Kg/D/>
            `;

          layer.bindTooltip(tooltipHtml, {
            sticky: true,
            opacity: 0.9,
            direction: "top",
            className: "grid-tooltip",
          });

          /* ---------- HOVER FEEDBACK ---------- */
          layer.on({
            mouseover: (e) => {
              e.target.setStyle({
                weight: 2,
                fillOpacity: 0.7,
              });
            },
            mouseout: (e) => {
              e.target.setStyle({
                weight: 1,
                fillOpacity: isTarget ? 0.6 : 0.3,
              });
            },
          });
        },
      }).addTo(map);

      map.fitBounds(gridLayer.getBounds(), { padding: [30, 30] });
      gridLayer.bringToBack();

      /* ----------------------------
         ROAD NETWORK
      ---------------------------- */
      const roadGeojson = await shp("/shape/road_network.zip");

      const roadLayer = L.geoJSON(roadGeojson, {
        style: (feature) => classifyRoad(feature.properties?.ref),
      }).addTo(map);

      roadLayer.bringToFront();

      /* ----------------------------
         LAYER CONTROL
      ---------------------------- */
      L.control.layers(
        { OpenStreetMap: osm },
        {
          "Grid Layer": gridLayer,
          "Road Network": roadLayer,
        },
        { collapsed: true }
      ).addTo(map);

      /* ----------------------------
         LEGEND
      ---------------------------- */
      const legend = L.control({ position: "topright" });

      legend.onAdd = () => {
        const div = L.DomUtil.create("div");
        div.style.background = "white";
        div.style.padding = "8px";
        div.style.border = "1px solid #999";
        div.style.fontSize = "12px";
        div.style.lineHeight = "16px";

        div.innerHTML = `
          <b>Grid</b><br/>
          <span style="background:#1565c0;width:12px;height:12px;display:inline-block;"></span>
          NEERI Grid<br/>
          <span style="background:#e0f2f1;width:12px;height:12px;display:inline-block;"></span>
          Other Grids
          <hr/>
          <b>Road Types</b><br/>
          <span style="background:#b71c1c;width:18px;height:3px;display:inline-block;"></span> NH<br/>
          <span style="background:#ef6c00;width:18px;height:3px;display:inline-block;"></span> SH<br/>
          <span style="background:#fbc02d;width:18px;height:3px;display:inline-block;"></span> MDR<br/>
          <span style="background:#90a4ae;width:18px;height:3px;display:inline-block;"></span> Local
        `;
        return div;
      };

      legend.addTo(map);
    };

    initMap();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  /* ----------------------------
     ROAD CLASSIFICATION
  ---------------------------- */
  function classifyRoad(ref) {
    if (!ref) return { color: "#90a4ae", weight: 1 };
    const code = ref.toUpperCase();
    if (code.startsWith("NH")) return { color: "#b71c1c", weight: 4 };
    if (code.startsWith("SH") || code.startsWith("MSG"))
      return { color: "#ef6c00", weight: 3 };
    if (code.startsWith("MDR"))
      return { color: "#fbc02d", weight: 2.5 };
    return { color: "#90a4ae", weight: 1 };
  }

  return (
    <section className="w-full space-y-4">

      {/* HEADER + DROPDOWN */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-blue-900 text-center flex-1">
          Mobile Emission Load Nagpur City (Kg/D)
        </h1>

        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border px-3 py-2 text-sm rounded bg-white ml-4"
        >
          <option value="nagpur">Nagpur</option>
          <option value="mumbai">Mumbai </option>
          <option value="delhi">Delhi </option>
          <option value="nashik">Nashik </option>
        </select>
      </div>

      {/* MAP */}
      <div className="border rounded-lg bg-white h-[70vh]">
        <div id={containerIdRef.current} className="w-full h-full" />
      </div>

    </section>
  );
}

// "use client";

// import { useEffect, useRef, useState } from "react";
// import shp from "shpjs";
// import "leaflet/dist/leaflet.css";

// export default function GridPage() {
//   const mapRef = useRef(null);
//   const hasInitializedRef = useRef(false);
//   const containerIdRef = useRef("grid-map");
//   const [city, setCity] = useState("nagpur");

//   useEffect(() => {
//     // 🔑 STRICT MODE GUARD (CRITICAL)
//     if (hasInitializedRef.current) return;
//     hasInitializedRef.current = true;

//     let map;

//     const initMap = async () => {
//       const L = (await import("leaflet")).default;

//       // ----------------------------
//       // MAP INIT
//       // ----------------------------
//       map = L.map(containerIdRef.current, {
//         zoomControl: true,
//         minZoom: 10,
//         maxZoom: 18,
//       });

//       mapRef.current = map;

//       // ----------------------------
//       // BASE MAP
//       // ----------------------------
//       const osm = L.tileLayer(
//         "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
//         { attribution: "" }
//       ).addTo(map);

//       // ----------------------------
//       // FIXED CITY CENTER (NAGPUR)
//       // ----------------------------
//       const targetLatLng = [21.12262501502752, 79.07361913854234];

//       // ----------------------------
//       // GRID LAYER
//       // ----------------------------
//       const gridGeojson = await shp("/shape/grid.zip");

//       const gridLayer = L.geoJSON(gridGeojson, {
//         onEachFeature: (_, layer) => {
//           const isTarget = layer.getBounds().contains(targetLatLng);

//           layer.setStyle({
//             color: "#455a64",
//             weight: 1,
//             fillColor: isTarget ? "#1565c0" : "#e0f2f1",
//             fillOpacity: isTarget ? 0.6 : 0.4,
//           });
//         },
//       }).addTo(map);

//       map.fitBounds(gridLayer.getBounds(), { padding: [30, 30] });
//       gridLayer.bringToBack();

//       // ----------------------------
//       // ROAD NETWORK
//       // ----------------------------
//       const roadGeojson = await shp("/shape/road_network.zip");

//       const roadLayer = L.geoJSON(roadGeojson, {
//         style: (feature) => classifyRoad(feature.properties?.ref),
//       }).addTo(map);

//       roadLayer.bringToFront();

//       // ----------------------------
//       // LAYER CONTROL (SAFE)
//       // ----------------------------
//       L.control.layers(
//         { OpenStreetMap: osm },
//         {
//           "Grid Layer": gridLayer,
//           "Road Network": roadLayer,
//         },
//         { collapsed: true }
//       ).addTo(map);

//       // ----------------------------
//       // LEGEND (TOP RIGHT)
//       // ----------------------------
//       const legend = L.control({ position: "topright" });

//       legend.onAdd = () => {
//         const div = L.DomUtil.create("div");
//         div.style.background = "white";
//         div.style.padding = "8px";
//         div.style.border = "1px solid #999";
//         div.style.fontSize = "12px";
//         div.style.lineHeight = "16px";

//         div.innerHTML = `
//           <b>Grid</b><br/>
//           <span style="background:#1565c0;width:12px;height:12px;display:inline-block;"></span> NEERI Grid<br/>
//           <span style="background:#e0f2f1;width:12px;height:12px;display:inline-block;"></span> Other Grids
//           <hr/>
//           <b>Road Types</b><br/>
//           <span style="background:#b71c1c;width:18px;height:3px;display:inline-block;"></span> NH<br/>
//           <span style="background:#ef6c00;width:18px;height:3px;display:inline-block;"></span> SH<br/>
//           <span style="background:#fbc02d;width:18px;height:3px;display:inline-block;"></span> MDR<br/>
//           <span style="background:#90a4ae;width:18px;height:3px;display:inline-block;"></span> Local
//         `;
//         return div;
//       };

//       legend.addTo(map);
//     };

//     initMap();

//     return () => {
//       if (mapRef.current) {
//         mapRef.current.remove();
//         mapRef.current = null;
//       }
//     };
//   }, []);

//   function classifyRoad(ref) {
//     if (!ref) return { color: "#90a4ae", weight: 1 };
//     const code = ref.toUpperCase();
//     if (code.startsWith("NH")) return { color: "#b71c1c", weight: 4 };
//     if (code.startsWith("SH") || code.startsWith("MSG"))
//       return { color: "#ef6c00", weight: 3 };
//     if (code.startsWith("MDR"))
//       return { color: "#fbc02d", weight: 2.5 };
//     return { color: "#90a4ae", weight: 1 };
//   }

//   return (
//     <section className="w-full space-y-4">

//       {/* HEADER + DROPDOWN */}
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold text-blue-900 text-center flex-1">
//           Emission Load Hotspot Map
//         </h1>

//         <select
//           value={city}
//           onChange={(e) => setCity(e.target.value)}
//           className="border px-3 py-2 text-sm rounded bg-white ml-4"
//         >
//           <option value="nagpur">Nagpur</option>
//           <option value="mumbai">Mumbai (Demo)</option>
//           <option value="delhi">Delhi (Demo)</option>
//         </select>
//       </div>

//       {/* MAP */}
//       <div className="border rounded-lg bg-white h-[70vh]">
//         <div id={containerIdRef.current} className="w-full h-full" />
//       </div>

//     </section>
//   );
// }
