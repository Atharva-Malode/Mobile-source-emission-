"use client";

import { useState, useEffect } from "react";
import EmissionChart from "./graphs/emissionchart";
import VehicularCount from "./graphs/vehicularcount";
import VehicleCountChart from "./graphs/vehiclecountchart";

/* Camera configuration (rename labels freely) */
const CAMERAS = [
  { id: "cam_01", label: "NH-47 | Wardha Road" },
  { id: "cam_02", label: "Ring Road | Sector 5" },
  { id: "cam_03", label: "City Center | Main Square" },
];

export default function Analysis() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedCamera, setSelectedCamera] = useState("");

  /* Set today's date (yyyy-mm-dd) */
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setSelectedDate(today);
  }, []);

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-blue-900">
          Emission Analysis
        </h2>

        {/* Controls */}
        <div className="flex items-center gap-4">
          {/* Camera Selector */}
          <select
            value={selectedCamera}
            onChange={(e) => setSelectedCamera(e.target.value)}
            className="border rounded-md px-3 py-2 text-gray-900 bg-white"
          >
            <option value="" disabled>
              Select Camera
            </option>

            {CAMERAS.map((cam) => (
              <option key={cam.id} value={cam.id}>
                {cam.label}
              </option>
            ))}
          </select>

          {/* Date Picker */}
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border rounded-md px-3 py-2 text-gray-900"
          />
        </div>
      </div>

      {/* Charts */}
      <div className="space-y-8">
        <div className="border rounded-lg p-4">
          <VehicleCountChart
            selectedDate={selectedDate}
            cameraId={selectedCamera}
          />
        </div>

        <div className="border rounded-lg p-4">
          <EmissionChart
            selectedDate={selectedDate}
            cameraId={selectedCamera}
          />
        </div>

        <div className="border rounded-lg p-4">
          <VehicularCount
            selectedDate={selectedDate}
            cameraId={selectedCamera}
          />
        </div>
      </div>
    </section>
  );
}
