"use client";

import { useEffect, useRef, useState } from "react";
import VehicleCard from "@/components/VehicleCard";
import { WS_ENDPOINTS, REST_ENDPOINTS } from "@/config/backend";

/* ---------------- CSV PARSER ---------------- */
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

export default function Home() {
  const wsRef = useRef(null);

  /* ---------------- LIVE FEED ---------------- */
  const [frameSrc, setFrameSrc] = useState(null);

  const [vehicleCounts, setVehicleCounts] = useState({
    "2w": 0,
    "3w": 0,
    "4w": 0,
    "ldv": 0,
    "hdv": 0,
    "bus": 0,
  });

  /* ---------------- CSV STATE ---------------- */
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [csvHeaders, setCsvHeaders] = useState([]);
  const [csvRows, setCsvRows] = useState([]);
  const [csvError, setCsvError] = useState(null);

  /* ---------------- WEBSOCKET ---------------- */
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

  /* ---------------- CSV FETCH ---------------- */
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
    <section className="w-full space-y-6">

      {/* PAGE TITLE */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-green-700">
          Realtime Mobile Emission Inventory Dashboard
        </h1>
      </div>

      {/* DASHBOARD GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* 1️⃣ LIVE FEED */}
        <div className="lg:col-span-6 border rounded-lg bg-white flex flex-col">
          <div className="border-b px-4 py-3 text-center">
            <h2 className="text-sm font-semibold text-blue-900 uppercase">
              Realtime Vehicle Counting
            </h2>
          </div>

          <div className="flex-1 bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-black w-[640px] h-[480px] flex items-center justify-center">
              {frameSrc ? (
                <img
                  src={frameSrc}
                  alt="Live Feed"
                  className="w-full h-full object-contain"
                />
              ) : (
                <span className="text-gray-300 text-sm">
                  Waiting for live feed…
                </span>
              )}
            </div>
          </div>
        </div>

        {/* 2️⃣ VEHICLE COUNT */}
        <div className="lg:col-span-3 border rounded-lg bg-white flex flex-col">
          <div className="border-b px-4 py-3 text-center">
            <h2 className="text-sm font-semibold text-blue-900 uppercase">
              Vehicle Count
            </h2>
          </div>

          <div className="flex-1 p-4 grid grid-cols-2 grid-rows-3 gap-4">
            <VehicleCard label="2W" count={vehicleCounts["2w"]} icon="/icons/2w.png" />
            <VehicleCard label="3W" count={vehicleCounts["3w"]} icon="/icons/3w.png" />
            <VehicleCard label="4W" count={vehicleCounts["4w"]} icon="/icons/4w.png" />
            <VehicleCard label="LDV" count={vehicleCounts["ldv"]} icon="/icons/ldv.png" />
            <VehicleCard label="HDV" count={vehicleCounts["hdv"]} icon="/icons/hdv.png" />
            <VehicleCard label="BUS" count={vehicleCounts["bus"]} icon="/icons/bus.png" />
          </div>
        </div>

        {/* 3️⃣ CSV DOWNLOAD + PREVIEW */}
        <div className="lg:col-span-3 border rounded-lg bg-white flex flex-col">
          <div className="border-b px-4 py-3 text-center">
            <h2 className="text-sm font-semibold text-blue-900 uppercase">
              Download Data
            </h2>
          </div>

          {/* Controls */}
          <div className="p-4 space-y-4 border-b">
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Select Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full border rounded px-3 py-2 text-sm"
              />
            </div>

            <button
              onClick={() =>
                window.open(
                  `${REST_ENDPOINTS.GET_CSV}?date=${selectedDate}`,
                  "_blank"
                )
              }
              className="w-full bg-blue-900 text-white text-sm py-2 rounded hover:bg-blue-800"
            >
              Download CSV
            </button>
          </div>

          {/* CSV PREVIEW */}
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
                          <td key={h} className="border px-2 py-1 text-center">
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
  );
}

// "use client";

// import { useEffect, useRef, useState } from "react";
// import VehicleCard from "@/components/VehicleCard";
// import { WS_ENDPOINTS } from "@/config/backend";

// export default function Home() {
//   const wsRef = useRef(null);

//   // Live frame
//   const [frameSrc, setFrameSrc] = useState(null);

//   // Vehicle counts (MATCH BACKEND KEYS EXACTLY)
//   const [vehicleCounts, setVehicleCounts] = useState({
//     "2w": 0,
//     "3w": 0,
//     "4w": 0,
//     "ldv": 0,
//     "hdv": 0,
//     "bus": 0,
//   });

//   useEffect(() => {
//     // ✅ USE CONFIG HERE
//     const ws = new WebSocket(WS_ENDPOINTS.VEHICLE_COUNT);
//     wsRef.current = ws;

//     ws.onopen = () => {
//       console.log("✅ WebSocket connected");
//     };

//     ws.onmessage = (event) => {
//       const data = JSON.parse(event.data);

//       // Update live frame
//       if (data.frame) {
//         setFrameSrc(`data:image/jpeg;base64,${data.frame}`);
//       }

//       // Update vehicle counts (FULL SNAPSHOT EVERY FRAME)
//       if (data.counts) {
//         setVehicleCounts(data.counts);
//       }
//     };

//     ws.onerror = (err) => {
//       console.error("WebSocket error:", err);
//       ws.close();
//     };

//     ws.onclose = () => {
//       console.warn("WebSocket closed");
//     };

//     return () => {
//       ws.close();
//     };
//   }, []);

//   return (
//     <section className="w-full space-y-6">

//       {/* PAGE TITLE */}
//       <div className="text-center">
//         <h1 className="text-2xl font-bold text-green-700">
//           Realtime Mobile Emission Inventory Dashboard
//         </h1>
//       </div>

//       {/* DASHBOARD GRID */}
//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

//         {/* 1️⃣ LIVE FEED */}
//         <div className="lg:col-span-6 border rounded-lg bg-white flex flex-col">

//           <div className="border-b px-4 py-3 text-center">
//             <h2 className="text-sm font-semibold text-blue-900 uppercase">
//               Realtime Vehicle Counting
//             </h2>
//           </div>

//           <div className="flex-1 bg-gray-50 flex items-center justify-center p-4">
//             <div
//               className="bg-black flex items-center justify-center"
//               style={{ width: "640px", height: "480px" }}
//             >
//               {frameSrc ? (
//                 <img
//                   src={frameSrc}
//                   alt="Live Feed"
//                   className="w-full h-full object-contain"
//                 />
//               ) : (
//                 <span className="text-gray-300 text-sm">
//                   Waiting for live feed…
//                 </span>
//               )}
//             </div>
//           </div>

//         </div>

//         {/* 2️⃣ VEHICLE COUNT */}
//         <div className="lg:col-span-3 border rounded-lg bg-white flex flex-col">

//           <div className="border-b px-4 py-3 text-center">
//             <h2 className="text-sm font-semibold text-blue-900 uppercase">
//               Vehicle Count
//             </h2>
//           </div>

//           <div className="flex-1 p-4 grid grid-cols-2 grid-rows-3 gap-4">

//             <VehicleCard label="2W" count={vehicleCounts["2w"]} icon="/icons/2w.png" />
//             <VehicleCard label="3W" count={vehicleCounts["3w"]} icon="/icons/3w.png" />
//             <VehicleCard label="4W" count={vehicleCounts["4w"]} icon="/icons/4w.png" />
//             <VehicleCard label="LDV" count={vehicleCounts["ldv"]} icon="/icons/ldv.png" />
//             <VehicleCard label="HDV" count={vehicleCounts["hdv"]} icon="/icons/hdv.png" />
//             <VehicleCard label="BUS" count={vehicleCounts["bus"]} icon="/icons/bus.png" />

//           </div>

//         </div>

//         {/* 3️⃣ CSV DOWNLOAD + PREVIEW (UNCHANGED) */}
//         <div className="lg:col-span-3 border rounded-lg bg-white flex flex-col">

//           <div className="border-b px-4 py-3 text-center">
//             <h2 className="text-sm font-semibold text-blue-900 uppercase">
//               Download Data
//             </h2>
//           </div>

//           <div className="p-4 space-y-4 border-b">
//             <div>
//               <label className="block text-sm text-gray-700 mb-1">
//                 Select Date
//               </label>
//               <input
//                 type="date"
//                 className="w-full border rounded px-3 py-2 text-sm
//                            focus:outline-none focus:ring-1 focus:ring-blue-600"
//               />
//             </div>

//             <button
//               className="w-full bg-blue-900 text-white text-sm py-2 rounded
//                          hover:bg-blue-800"
//             >
//               Download CSV
//             </button>
//           </div>

//           <div className="p-4">
//             <div className="max-h-[260px] overflow-y-auto border rounded">

//               <table className="w-full text-xs border-collapse">
//                 <thead className="sticky top-0 bg-gray-100 z-10">
//                   <tr>
//                     <th className="border px-2 py-1">Time</th>
//                     <th className="border px-2 py-1">2W</th>
//                     <th className="border px-2 py-1">3W</th>
//                     <th className="border px-2 py-1">4W</th>
//                     <th className="border px-2 py-1">LDV</th>
//                     <th className="border px-2 py-1">HDV</th>
//                     <th className="border px-2 py-1">BUS</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {Array.from({ length: 24 }).map((_, hour) => {
//                     const timeLabel = `${hour
//                       .toString()
//                       .padStart(2, "0")}:00`;

//                     return (
//                       <tr key={timeLabel}>
//                         <td className="border px-2 py-1">{timeLabel}</td>
//                         <td className="border px-2 py-1">0</td>
//                         <td className="border px-2 py-1">0</td>
//                         <td className="border px-2 py-1">0</td>
//                         <td className="border px-2 py-1">0</td>
//                         <td className="border px-2 py-1">0</td>
//                         <td className="border px-2 py-1">0</td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>

//             </div>
//           </div>

//         </div>

//       </div>
//     </section>
//   );
// }
