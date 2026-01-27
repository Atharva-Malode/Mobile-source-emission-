"use client";

import { useEffect, useRef, useState } from "react";
import { EMISSION_CALCULATION_ENDPOINT } from "@/config/backend";
import shp from "shpjs";
import "leaflet/dist/leaflet.css";

/* ----------------------------
   NUMERIC SAFETY
---------------------------- */
const toNumber = (v) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};

export default function GridPage() {
  const mapRef = useRef(null);
  const gridLayerRef = useRef(null);
  const roadLayerRef = useRef(null);
  const hasInitializedRef = useRef(false);
  const containerIdRef = useRef("grid-map");

  const [city, setCity] = useState("nagpur");
  const [selectedDate, setSelectedDate] = useState("");

  const [gridEmissions, setGridEmissions] = useState({
    PM: 0,
    NOx: 0,
    HC: 0,
    CO: 0,
  });

  /* ----------------------------
     DEFAULT DATE = TODAY
  ---------------------------- */
  useEffect(() => {
    if (!selectedDate) {
      const today = new Date().toISOString().split("T")[0];
      setSelectedDate(today);
    }
  }, [selectedDate]);

  /* ----------------------------
     FETCH + CUMULATE EMISSIONS
  ---------------------------- */
  useEffect(() => {
    if (!selectedDate) return;

    async function fetchGridEmissions() {
      try {
        const RdLength = 1;

        const response = await fetch(
          `${EMISSION_CALCULATION_ENDPOINT.CALCULATE}?RdLength=${RdLength}&current_date=${selectedDate}`
        );

        if (!response.ok) throw new Error("Emission API fetch failed");

        const result = await response.json();
        const emissions = result.emissions || [];

        const aggregated = emissions.reduce(
          (acc, curr) => {
            acc.PM += toNumber(curr.Total_PM);
            acc.NOx += toNumber(curr.Total_NOx);
            acc.HC += toNumber(curr.Total_HC);
            acc.CO += toNumber(curr.Total_CO);
            return acc;
          },
          { PM: 0, NOx: 0, HC: 0, CO: 0 }
        );

        setGridEmissions(aggregated);
      } catch (err) {
        console.error("Grid emission fetch failed:", err);
        setGridEmissions({ PM: 0, NOx: 0, HC: 0, CO: 0 });
      }
    }

    fetchGridEmissions();
  }, [selectedDate]);

  /* ----------------------------
     MAP INIT (RUNS ONCE)
  ---------------------------- */
  useEffect(() => {
    if (hasInitializedRef.current) return;
    hasInitializedRef.current = true;

    let map;

    const initMap = async () => {
      const L = (await import("leaflet")).default;

      map = L.map(containerIdRef.current, {
        zoomControl: true,
        minZoom: 10,
        maxZoom: 18,
      });

      mapRef.current = map;

      /* BASE MAP */
      const osm = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ).addTo(map);

      const targetLatLng = [21.12262501502752, 79.07361913854234];

      /* ---------------- GRID LAYER (ON BY DEFAULT) ---------------- */
      const gridGeojson = await shp("/shape/grid.zip");

      const gridLayer = L.geoJSON(gridGeojson, {
        onEachFeature: (_, layer) => {
          const isTarget = layer.getBounds().contains(targetLatLng);
          layer._isTarget = isTarget;

          layer.setStyle({
            color: "#455a64",
            weight: 1,
            fillColor: isTarget ? "#1565c0" : "#e0f2f1",
            fillOpacity: isTarget ? 0.6 : 0.3,
          });

          layer.on({
            mouseover: (e) =>
              e.target.setStyle({ weight: 2, fillOpacity: 0.7 }),
            mouseout: (e) =>
              e.target.setStyle({
                weight: 1,
                fillOpacity: isTarget ? 0.6 : 0.3,
              }),
          });
        },
      }).addTo(map); // ✅ added by default

      gridLayerRef.current = gridLayer;
      map.fitBounds(gridLayer.getBounds(), { padding: [30, 30] });
      gridLayer.bringToBack();

      /* ---------------- ROAD NETWORK (RED, OFF BY DEFAULT) ---------------- */
      const roadGeojson = await shp("/shape/road_network.zip");

      const roadLayer = L.geoJSON(roadGeojson, {
        style: {
          color: "#d32f2f",
          weight: 3,
          opacity: 0.9,
        },
      });

      roadLayerRef.current = roadLayer; // ❌ NOT added to map

      /* ---------------- LAYER CONTROL ---------------- */
      L.control.layers(
        { OpenStreetMap: osm },
        {
          "Grid Layer": gridLayer,
          "Road Network": roadLayer,
        },
        { collapsed: true }
      ).addTo(map);

      /* ---------------- LEGEND ---------------- */
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
        `;
        return div;
      };

      legend.addTo(map);
    };

    initMap();

    return () => {
      if (mapRef.current) mapRef.current.remove();
    };
  }, []);

  /* ----------------------------
     UPDATE TOOLTIP WHEN DATA CHANGES
  ---------------------------- */
  useEffect(() => {
    if (!gridLayerRef.current) return;

    gridLayerRef.current.eachLayer((layer) => {
      if (!layer._isTarget) return;

      const tooltipHtml = `
        <b>NEERI Grid</b><br/>
        PM: ${gridEmissions.PM.toFixed(3)} Kg/d<br/>
        NOx: ${gridEmissions.NOx.toFixed(3)} Kg/d<br/>
        HC: ${gridEmissions.HC.toFixed(3)} Kg/d<br/>
        CO: ${gridEmissions.CO.toFixed(3)} Kg/d
      `;

      if (layer.getTooltip()) {
        layer.setTooltipContent(tooltipHtml);
      } else {
        layer.bindTooltip(tooltipHtml, {
          sticky: true,
          opacity: 0.9,
          direction: "top",
          className: "grid-tooltip",
        });
      }
    });
  }, [gridEmissions]);

  return (
    <section className="w-full space-y-4">
      {/* HEADER + CONTROLS */}
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-blue-900 flex-1 text-center">
          Mobile Emission Load Nagpur City (Kg/d)
        </h1>

        <div className="flex items-center gap-3">
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="border px-3 py-2 text-sm rounded bg-white"
          >
            <option value="nagpur">Nagpur</option>
            <option value="mumbai">Mumbai</option>
            <option value="delhi">Delhi</option>
            <option value="nashik">Nashik</option>
          </select>

          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border px-3 py-2 text-sm rounded bg-white"
          />
        </div>
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
// import { EMISSION_CALCULATION_ENDPOINT } from "@/config/backend";
// import shp from "shpjs";
// import "leaflet/dist/leaflet.css";

// /* ----------------------------
//    NUMERIC SAFETY
// ---------------------------- */
// const toNumber = (v) => {
//   const n = Number(v);
//   return Number.isFinite(n) ? n : 0;
// };

// export default function GridPage() {
//   const mapRef = useRef(null);
//   const gridLayerRef = useRef(null);
//   const roadLayerRef = useRef(null);
//   const hasInitializedRef = useRef(false);
//   const containerIdRef = useRef("grid-map");

//   const [city, setCity] = useState("nagpur");
//   const [selectedDate, setSelectedDate] = useState("");

//   const [gridEmissions, setGridEmissions] = useState({
//     PM: 0,
//     NOx: 0,
//     HC: 0,
//     CO: 0,
//   });

//   /* ----------------------------
//      DEFAULT DATE = TODAY
//   ---------------------------- */
//   useEffect(() => {
//     if (!selectedDate) {
//       const today = new Date().toISOString().split("T")[0];
//       setSelectedDate(today);
//     }
//   }, [selectedDate]);

//   /* ----------------------------
//      FETCH + CUMULATE EMISSIONS
//   ---------------------------- */
//   useEffect(() => {
//     if (!selectedDate) return;

//     async function fetchGridEmissions() {
//       try {
//         const RdLength = 1;

//         const response = await fetch(
//           `${EMISSION_CALCULATION_ENDPOINT.CALCULATE}?RdLength=${RdLength}&current_date=${selectedDate}`
//         );

//         if (!response.ok) throw new Error("Emission API fetch failed");

//         const result = await response.json();
//         const emissions = result.emissions || [];

//         const aggregated = emissions.reduce(
//           (acc, curr) => {
//             acc.PM += toNumber(curr.Total_PM);
//             acc.NOx += toNumber(curr.Total_NOx);
//             acc.HC += toNumber(curr.Total_HC);
//             acc.CO += toNumber(curr.Total_CO);
//             return acc;
//           },
//           { PM: 0, NOx: 0, HC: 0, CO: 0 }
//         );

//         console.log("Grid emissions fetched:", aggregated);
//         setGridEmissions(aggregated);
//       } catch (err) {
//         console.error("Grid emission fetch failed:", err);
//         setGridEmissions({ PM: 0, NOx: 0, HC: 0, CO: 0 });
//       }
//     }

//     fetchGridEmissions();
//   }, [selectedDate]);

//   /* ----------------------------
//      MAP INIT (RUNS ONCE)
//   ---------------------------- */
//   useEffect(() => {
//     if (hasInitializedRef.current) return;
//     hasInitializedRef.current = true;

//     let map;

//     const initMap = async () => {
//       const L = (await import("leaflet")).default;

//       map = L.map(containerIdRef.current, {
//         zoomControl: true,
//         minZoom: 10,
//         maxZoom: 18,
//       });

//       mapRef.current = map;

//       /* BASE MAP */
//       const osm = L.tileLayer(
//         "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       ).addTo(map);

//       const targetLatLng = [21.12262501502752, 79.07361913854234];

//       /* ---------------- GRID LAYER ---------------- */
//       const gridGeojson = await shp("/shape/grid.zip");

//       const gridLayer = L.geoJSON(gridGeojson, {
//         onEachFeature: (_, layer) => {
//           const isTarget = layer.getBounds().contains(targetLatLng);
//           layer._isTarget = isTarget;

//           layer.setStyle({
//             color: "#455a64",
//             weight: 1,
//             fillColor: isTarget ? "#1565c0" : "#e0f2f1",
//             fillOpacity: isTarget ? 0.6 : 0.3,
//           });

//           layer.on({
//             mouseover: (e) =>
//               e.target.setStyle({ weight: 2, fillOpacity: 0.7 }),
//             mouseout: (e) =>
//               e.target.setStyle({
//                 weight: 1,
//                 fillOpacity: isTarget ? 0.6 : 0.3,
//               }),
//           });
//         },
//       }).addTo(map);

//       gridLayerRef.current = gridLayer;

//       map.fitBounds(gridLayer.getBounds(), { padding: [30, 30] });
//       gridLayer.bringToBack();

//       /* ---------------- ROAD NETWORK ---------------- */
//       const roadGeojson = await shp("/shape/road_network.zip");

//       const roadLayer = L.geoJSON(roadGeojson, {
//         style: (feature) => classifyRoad(feature.properties?.ref),
//       }).addTo(map);

//       roadLayer.bringToFront();
//       roadLayerRef.current = roadLayer;

//       /* ---------------- LAYER CONTROL (RESTORED) ---------------- */
//       L.control.layers(
//         { OpenStreetMap: osm },
//         {
//           "Grid Layer": gridLayer,
//           "Road Network": roadLayer,
//         },
//         { collapsed: true }
//       ).addTo(map);

//       /* ---------------- LEGEND (RESTORED) ---------------- */
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
//           <span style="background:#1565c0;width:12px;height:12px;display:inline-block;"></span>
//           NEERI Grid<br/>
//           <span style="background:#e0f2f1;width:12px;height:12px;display:inline-block;"></span>
//           Other Grids
//         `;
//         return div;
//       };

//       legend.addTo(map);
//     };

//     initMap();

//     return () => {
//       if (mapRef.current) mapRef.current.remove();
//     };
//   }, []);

//   /* ----------------------------
//      UPDATE TOOLTIP WHEN DATA CHANGES
//   ---------------------------- */
//   useEffect(() => {
//     if (!gridLayerRef.current) return;

//     gridLayerRef.current.eachLayer((layer) => {
//       if (!layer._isTarget) return;

//       const tooltipHtml = `
//         <b>NEERI Grid</b><br/>
//         PM: ${gridEmissions.PM.toFixed(3)} Kg/D<br/>
//         NOx: ${gridEmissions.NOx.toFixed(3)} Kg/D<br/>
//         HC: ${gridEmissions.HC.toFixed(3)} Kg/D<br/>
//         CO: ${gridEmissions.CO.toFixed(3)} Kg/D
//       `;

//       if (layer.getTooltip()) {
//         layer.setTooltipContent(tooltipHtml);
//       } else {
//         layer.bindTooltip(tooltipHtml, {
//           sticky: true,
//           opacity: 0.9,
//           direction: "top",
//           className: "grid-tooltip",
//         });
//       }
//     });
//   }, [gridEmissions]);

//   /* ----------------------------
//      ROAD CLASSIFICATION
//   ---------------------------- */
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
//       {/* HEADER + CONTROLS */}
//       <div className="flex items-center justify-between gap-4">
//         <h1 className="text-2xl font-bold text-blue-900 flex-1 text-center">
//           Mobile Emission Load Nagpur City (Kg/D)
//         </h1>

//         <div className="flex items-center gap-3">
//           <select
//             value={city}
//             onChange={(e) => setCity(e.target.value)}
//             className="border px-3 py-2 text-sm rounded bg-white"
//           >
//             <option value="nagpur">Nagpur</option>
//             <option value="mumbai">Mumbai</option>
//             <option value="delhi">Delhi</option>
//             <option value="nashik">Nashik</option>
//           </select>

//           <input
//             type="date"
//             value={selectedDate}
//             onChange={(e) => setSelectedDate(e.target.value)}
//             className="border px-3 py-2 text-sm rounded bg-white"
//           />
//         </div>
//       </div>

//       {/* MAP */}
//       <div className="border rounded-lg bg-white h-[70vh]">
//         <div id={containerIdRef.current} className="w-full h-full" />
//       </div>
//     </section>
//   );
// }
