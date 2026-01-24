"use client";

import { useEffect, useRef, useState } from "react";
import VehicleCard from "@/components/VehicleCard";
import AnimatedSpacer from "@/components/AnimatedSpacer";
import { WS_ENDPOINTS, REST_ENDPOINTS } from "@/config/backend";

/* ================= VEHICLE META ================= */
const VEHICLE_META = {
  "2w": { label: "Two Wheeler", color: "#b4081f", icon: "/icons/2w.png" },
  "3w": { label: "Three Wheeler", color: "#0f766e", icon: "/icons/3w.png" },
  "4w": { label: "Four Wheeler", color: "#c008b7", icon: "/icons/4w.png" },
  ldv: { label: "Light Duty Vehicle", color: "#a5a209", icon: "/icons/ldv.png" },
  hdv: { label: "Heavy Duty Vehicle", color: "#1b09b8", icon: "/icons/hdv.png" },
  bus: { label: "Buses", color: "#065f46", icon: "/icons/bus.png" },
};

/* ================= CSV PARSER ================= */
function parseCSV(csvText) {
  const lines = csvText.trim().split("\n");
  const headers = lines[0].split(",");

  const rows = lines.slice(1).map((line) => {
    const values = line.split(",");
    return headers.reduce((obj, header, index) => {
      obj[header] = values[index];
      return obj;
    }, {});
  });

  return { headers, rows };
}

export default function HomePage() {
  const wsRef = useRef(null);

  /* ================= LIVE FEED ================= */
  const [frameSrc, setFrameSrc] = useState(null);

  const [vehicleCounts, setVehicleCounts] = useState({
    "2w": 0,
    "3w": 0,
    "4w": 0,
    ldv: 0,
    hdv: 0,
    bus: 0,
  });

  /* ================= CSV STATE ================= */
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [csvHeaders, setCsvHeaders] = useState([]);
  const [csvRows, setCsvRows] = useState([]);
  const [csvError, setCsvError] = useState(null);

  /* ================= WEBSOCKET ================= */
  useEffect(() => {
    const ws = new WebSocket(WS_ENDPOINTS.VEHICLE_COUNT);
    wsRef.current = ws;

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.frame) {
        setFrameSrc(`data:image/jpeg;base64,${data.frame}`);
      }

      if (data.counts) {
        setVehicleCounts(data.counts);
      }
    };

    ws.onerror = () => ws.close();
    return () => ws.close();
  }, []);

  /* ================= CSV FETCH ================= */
  useEffect(() => {
    const fetchCSV = async () => {
      try {
        setCsvError(null);

        const res = await fetch(
          `${REST_ENDPOINTS.GET_CSV}?date=${selectedDate}`
        );

        if (!res.ok) throw new Error("CSV not found");

        const csvText = await res.text();
        const { headers, rows } = parseCSV(csvText);

        setCsvHeaders(headers);
        setCsvRows(rows);
      } catch {
        setCsvHeaders([]);
        setCsvRows([]);
        setCsvError("No CSV data available for this date");
      }
    };

    fetchCSV();
  }, [selectedDate]);

  return (
  <div className="min-h-[100svh] flex flex-col">
    {/* ================= MAIN CONTENT ================= */}
    <section className="w-full space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ================= LIVE FEED ================= */}
        <div className="lg:col-span-6 bg-white rounded-lg overflow-hidden border flex flex-col">
          <div
            className="px-4 py-3 text-center font-semibold text-lg text-white"
            style={{ backgroundColor: "var(--brand-green)" }}
          >
            Realtime Vehicle Counting
          </div>

          <div className="flex-1 bg-black relative overflow-hidden">
            {frameSrc ? (
              <img
                src={frameSrc}
                alt="Live Feed"
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-300 text-sm">
                Waiting for live feed…
              </div>
            )}
          </div>
        </div>

        {/* ================= VEHICLE COUNT ================= */}
        <div className="lg:col-span-3 bg-white rounded-lg overflow-hidden border flex flex-col">
          <div
            className="px-4 py-3 text-center font-semibold text-lg text-white"
            style={{ backgroundColor: "var(--brand-green)" }}
          >
            Vehicle Count
          </div>

          <div className="flex-1 p-4 grid grid-cols-2 grid-rows-3 gap-4">
            {Object.entries(VEHICLE_META).map(([key, meta]) => (
              <VehicleCard
                key={key}
                label={meta.label}
                count={vehicleCounts[key]}
                icon={meta.icon}
                color={meta.color}
              />
            ))}
          </div>
        </div>

        {/* ================= CSV ================= */}
        <div className="lg:col-span-3 bg-white rounded-lg overflow-hidden border flex flex-col">
          <div
            className="px-4 py-3 text-center font-semibold text-lg text-white"
            style={{ backgroundColor: "var(--brand-green)" }}
          >
            Download Data
          </div>

          <div className="p-4 space-y-4 border-b">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm"
            />

            <button
              onClick={() =>
                window.open(
                  `${REST_ENDPOINTS.GET_CSV}?date=${selectedDate}`,
                  "_blank"
                )
              }
              className="w-full text-white text-sm py-2 rounded"
              style={{ backgroundColor: "var(--brand-green)" }}
            >
              Download CSV
            </button>
          </div>

          <div className="p-4">
            <div className="max-h-[260px] overflow-y-auto border rounded">
              <table className="w-full text-xs border-collapse">
                <thead className="sticky top-0 bg-gray-100">
                  <tr>
                    {csvHeaders.map((h) => (
                      <th key={h} className="border px-2 py-1">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {csvError ? (
                    <tr>
                      <td
                        colSpan={csvHeaders.length || 1}
                        className="border px-2 py-4 text-center text-gray-500"
                      >
                        {csvError}
                      </td>
                    </tr>
                  ) : (
                    csvRows.map((row, i) => (
                      <tr key={i}>
                        {csvHeaders.map((h) => (
                          <td
                            key={h}
                            className="border px-2 py-1 text-center"
                          >
                            {row[h]}
                          </td>
                        ))}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ================= SPACER ================= */}
    <div className="mt-6 flex-1 flex">
  <AnimatedSpacer />
</div>

  </div>
);

}

// "use client";

// import { useEffect, useRef, useState } from "react";
// import VehicleCard from "@/components/VehicleCard";
// import AnimatedSpacer from "@/components/AnimatedSpacer";
// import { WS_ENDPOINTS, REST_ENDPOINTS } from "@/config/backend";

// /* ================= VEHICLE META (LABEL + COLOR MAP) ================= */
// const VEHICLE_META = {
//   "2w": {
//     label: "Two Wheeler",
//     color: "#b4081f",
//     icon: "/icons/2w.png",
//   },
//   "3w": {
//     label: "Three Wheeler",
//     color: "#0f766e",
//     icon: "/icons/3w.png",
//   },
//   "4w": {
//     label: "Four Wheeler",
//     color: "#c008b7",
//     icon: "/icons/4w.png",
//   },
//   "ldv": {
//     label: "Light Duty Vehicle",
//     color: "#a5a209",
//     icon: "/icons/ldv.png",
//   },
//   "hdv": {
//     label: "Heavy Duty Vehicle",
//     color: "#1b09b8",
//     icon: "/icons/hdv.png",
//   },
//   "bus": {
//     label: "Buses",
//     color: "#065f46",
//     icon: "/icons/bus.png",
//   },
// };

// /* ---------------- CSV PARSER ---------------- */
// function parseCSV(csvText) {
//   const lines = csvText.trim().split("\n");
//   const headers = lines[0].split(",");

//   const rows = lines.slice(1).map((line) => {
//     const values = line.split(",");
//     return headers.reduce((obj, header, index) => {
//       obj[header] = values[index];
//       return obj;
//     }, {});
//   });

//   return { headers, rows };
// }

// export default function HomePage() {
//   const wsRef = useRef(null);

//   /* ---------------- LIVE FEED ---------------- */
//   const [frameSrc, setFrameSrc] = useState(null);

//   const [vehicleCounts, setVehicleCounts] = useState({
//     "2w": 0,
//     "3w": 0,
//     "4w": 0,
//     "ldv": 0,
//     "hdv": 0,
//     "bus": 0,
//   });

//   /* ---------------- CSV STATE ---------------- */
//   const [selectedDate, setSelectedDate] = useState(
//     new Date().toISOString().split("T")[0]
//   );
//   const [csvHeaders, setCsvHeaders] = useState([]);
//   const [csvRows, setCsvRows] = useState([]);
//   const [csvError, setCsvError] = useState(null);

//   /* ---------------- WEBSOCKET ---------------- */
//   useEffect(() => {
//     const ws = new WebSocket(WS_ENDPOINTS.VEHICLE_COUNT);
//     wsRef.current = ws;

//     ws.onmessage = (event) => {
//       const data = JSON.parse(event.data);

//       if (data.frame) {
//         setFrameSrc(`data:image/jpeg;base64,${data.frame}`);
//       }

//       if (data.counts) {
//         setVehicleCounts(data.counts);
//       }
//     };

//     ws.onerror = () => ws.close();
//     return () => ws.close();
//   }, []);

//   /* ---------------- CSV FETCH ---------------- */
//   useEffect(() => {
//     const fetchCSV = async () => {
//       try {
//         setCsvError(null);

//         const res = await fetch(
//           `${REST_ENDPOINTS.GET_CSV}?date=${selectedDate}`
//         );

//         if (!res.ok) throw new Error("CSV not found");

//         const csvText = await res.text();
//         const { headers, rows } = parseCSV(csvText);

//         setCsvHeaders(headers);
//         setCsvRows(rows);
//       } catch {
//         setCsvHeaders([]);
//         setCsvRows([]);
//         setCsvError("No CSV data available for this date");
//       }
//     };

//     fetchCSV();
//   }, [selectedDate]);

//   return (
//     <>
//       <section className="w-full space-y-6">

//         {/* ================= DASHBOARD GRID ================= */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

//           {/* ================= LIVE FEED ================= */}
//           <div className="lg:col-span-6 bg-white rounded-lg overflow-hidden border flex flex-col">
//             <div
//               className="px-4 py-3 text-center font-semibold text-lg text-white"
//               style={{ backgroundColor: "var(--brand-green)" }}
//             >
//               Realtime Vehicle Counting
//             </div>

//             <div className="flex-1 bg-black relative overflow-hidden">
//               {frameSrc ? (
//                 <img
//                   src={frameSrc}
//                   alt="Live Feed"
//                   className="absolute inset-0 w-full h-full object-cover"
//                 />
//               ) : (
//                 <div className="flex items-center justify-center h-full text-gray-300 text-sm">
//                   Waiting for live feed…
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* ================= VEHICLE COUNT ================= */}
//           <div className="lg:col-span-3 bg-white rounded-lg overflow-hidden border flex flex-col">
//             <div
//               className="px-4 py-3 text-center font-semibold text-lg text-white"
//               style={{ backgroundColor: "var(--brand-green)" }}
//             >
//               Vehicle Count
//             </div>

//             <div className="flex-1 p-4 grid grid-cols-2 grid-rows-3 gap-4">
//               {Object.entries(VEHICLE_META).map(([key, meta]) => (
//                 <VehicleCard
//                   key={key}
//                   label={meta.label}
//                   count={vehicleCounts[key]}
//                   icon={meta.icon}
//                   color={meta.color}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* ================= CSV DOWNLOAD ================= */}
//           <div className="lg:col-span-3 bg-white rounded-lg overflow-hidden border flex flex-col">
//             <div
//               className="px-4 py-3 text-center font-semibold text-lg text-white"
//               style={{ backgroundColor: "var(--brand-green)" }}
//             >
//               Download Data
//             </div>

//             <div className="p-4 space-y-4 border-b">
//               <div>
//                 <label className="block text-sm text-gray-700 mb-1">
//                   Select Date
//                 </label>
//                 <input
//                   type="date"
//                   value={selectedDate}
//                   onChange={(e) => setSelectedDate(e.target.value)}
//                   className="w-full border rounded px-3 py-2 text-sm"
//                 />
//               </div>

//               <button
//                 onClick={() =>
//                   window.open(
//                     `${REST_ENDPOINTS.GET_CSV}?date=${selectedDate}`,
//                     "_blank"
//                   )
//                 }
//                 className="w-full text-white text-sm py-2 rounded"
//                 style={{ backgroundColor: "var(--brand-green)" }}
//               >
//                 Download CSV
//               </button>
//             </div>

//             <div className="p-4">
//               <div className="max-h-[260px] overflow-y-auto border rounded">
//                 <table className="w-full text-xs border-collapse">
//                   <thead className="sticky top-0 bg-gray-100">
//                     <tr>
//                       {csvHeaders.map((h) => (
//                         <th key={h} className="border px-2 py-1">
//                           {h}
//                         </th>
//                       ))}
//                     </tr>
//                   </thead>

//                   <tbody>
//                     {csvError ? (
//                       <tr>
//                         <td
//                           colSpan={csvHeaders.length || 1}
//                           className="border px-2 py-4 text-center text-gray-500"
//                         >
//                           {csvError}
//                         </td>
//                       </tr>
//                     ) : (
//                       csvRows.map((row, i) => (
//                         <tr key={i}>
//                           {csvHeaders.map((h) => (
//                             <td
//                               key={h}
//                               className="border px-2 py-1 text-center"
//                             >
//                               {row[h]}
//                             </td>
//                           ))}
//                         </tr>
//                       ))
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//           </div>

//         </div>
//       </section>

//       {/* ================= ANIMATED SPACER ================= */}
//       <AnimatedSpacer height={180} />
//     </>
//   );
// }
