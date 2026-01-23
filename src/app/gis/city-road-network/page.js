"use client";

import { useEffect, useState } from "react";
import Graph from "./graph";

export default function GISEmissionLoad() {
  const [data, setData] = useState({});
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    fetch("/api/gis?type=road-network-data")
      .then((res) => res.json())
      .then((json) => {
        setData(json);

        // Default city: Nagpur
        if (json.Nagpur) {
          setSelectedCity("Nagpur");
        } else {
          setSelectedCity(Object.keys(json)[0]);
        }
      });
  }, []);

  if (!selectedCity) return null;

  return (
    <section className="w-full space-y-4">

      {/* ================= HEADER + DROPDOWN ================= */}
      <div className="flex items-center justify-between gap-4">

        {/* Center Title */}
        <h1 className="text-2xl font-bold text-blue-900 text-center flex-1">
          City Road Network – {selectedCity}
        </h1>

        {/* City Dropdown */}
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="border px-3 py-2 text-sm rounded bg-white"
        >
          {Object.keys(data).map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>

      </div>

      {/* ================= GRAPHS (FULL WIDTH) ================= */}
      <div className="border rounded-lg bg-white p-4">
        <Graph
          city={selectedCity}
          images={data[selectedCity]}
          basePath="road-network-data"
        />
      </div>

    </section>
  );
}
