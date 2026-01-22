"use client";

import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Label,
} from "recharts";

/* Vehicle colors from global.css */
const VEHICLE_COLORS = {
  "2W": "var(--color-2w)",
  "3W": "var(--color-3w)",
  "4W": "var(--color-4w)",
  LDV: "var(--color-ldv)",
  HDV: "var(--color-hdv)",
};

/* Numeric safety */
const toNumber = (v) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};

export default function VehicleBarChart({ selectedDate }) {
  const [vehicleData, setVehicleData] = useState([]);
  const [visibleBars, setVisibleBars] = useState({
    "2W": true,
    "3W": true,
    "4W": true,
    LDV: true,
    HDV: true,
  });

  useEffect(() => {
    async function fetchVehicleData() {
      try {
        const response = await fetch(
          `http://${process.env.NEXT_PUBLIC_APP_IP}:8000/get_json?current_date=${selectedDate}`
        );

        if (!response.ok) {
          throw new Error("API fetch failed");
        }

        const jsonData = await response.json();

        const formattedData = jsonData.map((item, index) => ({
          time: String(index + 1),
          "2W": toNumber(item["2w"]),
          "3W": toNumber(item["3w"]),
          "4W": toNumber(item["4w"]),
          LDV: toNumber(item.ldv),
          HDV: toNumber(item.hdv),
        }));

        setVehicleData(formattedData);
      } catch (error) {
        console.warn("API failed, loading fallback CSV:", error);

        /* CSV fallback (index-based) */
        try {
          const csvResponse = await fetch("/2025-12-18.csv");
          const csvText = await csvResponse.text();

          const rows = csvText.split("\n").slice(1);
          const parsedData = rows
            .map((row, index) => {
              const cols = row.split(",");
              if (cols.length < 6) return null;

              return {
                time: String(index + 1),
                "2W": toNumber(cols[1]),
                "3W": toNumber(cols[2]),
                "4W": toNumber(cols[3]),
                LDV: toNumber(cols[4]),
                HDV: toNumber(cols[5]),
              };
            })
            .filter(Boolean);

          setVehicleData(parsedData);
        } catch (csvError) {
          console.error("Fallback CSV also failed:", csvError);
          setVehicleData([]);
        }
      }
    }

    if (selectedDate) {
      fetchVehicleData();
    }
  }, [selectedDate]);

  function handleToggle(e) {
    setVisibleBars((prev) => ({
      ...prev,
      [e.target.name]: e.target.checked,
    }));
  }

  return (
    <div className="border rounded-lg p-4 bg-white space-y-4 w-full">
      {/* Header + colored toggles */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-gray-800">
          Vehicle Count – Distribution
        </h2>

        <div className="flex flex-wrap gap-4 text-m font-bold">
          {Object.keys(visibleBars).map((key) => (
            <label
              key={key}
              className="flex items-center gap-2 text-l font-bold"
              style={{ color: VEHICLE_COLORS[key] }}
            >
              <input
                type="checkbox"
                name={key}
                checked={visibleBars[key]}
                onChange={handleToggle}
              />
              <span>{key}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={vehicleData}>
            <CartesianGrid
              stroke="var(--grid-color)"
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="time"
              stroke="var(--axis-color)"
              tick={{ fill: "var(--label-color)", fontSize: 14, fontWeight: "bold" }}
            >
              <Label
                value="Time (hr)"
                position="insideBottom"
                offset={-5}
                style={{ fill: "var(--label-color)", fontSize: 16, fontWeight: "bold" }}
              />
            </XAxis>

            <YAxis
              stroke="var(--axis-color)"
              tick={{ fill: "var(--label-color)", fontSize: 14, fontWeight: "bold" }}
            >
              <Label
                value="Vehicle Count"
                angle={-90}
                position="insideLeft"
                style={{
                  fill: "var(--label-color)",
                  fontSize: 16,
                  fontWeight: "bold",
                  textAnchor: "middle",
                }}
              />
            </YAxis>

            <Tooltip
              contentStyle={{
                backgroundColor: "var(--tooltip-bg)",
                border: "1px solid var(--tooltip-border)",
                fontSize: "16px",
              }}
            />

            {visibleBars["2W"] && (
              <Bar dataKey="2W" fill={VEHICLE_COLORS["2W"]} />
            )}
            {visibleBars["3W"] && (
              <Bar dataKey="3W" fill={VEHICLE_COLORS["3W"]} />
            )}
            {visibleBars["4W"] && (
              <Bar dataKey="4W" fill={VEHICLE_COLORS["4W"]} />
            )}
            {visibleBars.LDV && (
              <Bar dataKey="LDV" fill={VEHICLE_COLORS.LDV} />
            )}
            {visibleBars.HDV && (
              <Bar dataKey="HDV" fill={VEHICLE_COLORS.HDV} />
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
