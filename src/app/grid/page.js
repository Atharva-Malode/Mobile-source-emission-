"use client";

import { useState } from "react";
import GridMap from "@/components/GridMap";

export default function GridPage() {
  const [city, setCity] = useState("nagpur");

  return (
    <section className="w-full space-y-4">

      {/* HEADER + CONTROLS */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">

        <div>
          <h1 className="text-2xl font-bold text-blue-900">
            Grid-based Emission Visualization
          </h1>
          <p className="text-sm text-gray-600">
            Spatial grid and road network view
          </p>
        </div>

        {/* CITY DROPDOWN */}
        <div className="w-64">
          <label className="block text-xs text-gray-600 mb-1">
            Select City
          </label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full border rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-700"
          >
            <option value="nagpur">Nagpur</option>
            <option value="Nashik">Nashik</option>
            <option value="mumbai">Mumbai </option>
            <option value="delhi">Delhi </option>
          </select>
        </div>

      </div>

      {/* MAP CONTAINER */}
      <div className="border rounded-lg bg-white h-[75vh] overflow-hidden">
        <GridMap city={city} />
      </div>

    </section>
  );
}
