"use client";

import React, { useState, useEffect } from "react";
import {JSON_ENDPOINTS} from "@/config/backend";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Label,
} from "recharts";

/* Analytics-grade vehicle colors (single source of truth) */
const VEHICLE_COLORS = {
  "2W": "var(--color-2w)",
  "3W": "var(--color-3w)",
  "4W": "var(--color-4w)",
  LDV: "var(--color-ldv)",
  HDV: "var(--color-hdv)",
};

/* Numeric safety helper */
const toNumber = (v) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};

export default function VehicleCountChart({ selectedDate }) {
  const [vehicleData, setVehicleData] = useState([]);
  const [checkedLines, setCheckedLines] = useState({
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
          `${JSON_ENDPOINTS.GET_JSON}?current_date=${selectedDate}`
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

        /* CSV fallback (index-based, no headers) */
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

  function handleCheckboxChange(e) {
    setCheckedLines((prev) => ({
      ...prev,
      [e.target.name]: e.target.checked,
    }));
  }

  return (
    <div className="border rounded-lg p-4 space-y-4 bg-white">
      {/* Header + colored checkboxes (acts as legend) */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-gray-800">
          Vehicle Count
        </h2>

        <div className="flex flex-wrap gap-4 text-m font-bold">
          {Object.keys(checkedLines).map((key) => (
            <label
              key={key}
              className="flex items-center gap-2 text-l font-bold"
              style={{ color: VEHICLE_COLORS[key] }}
            >
              <input
                type="checkbox"
                name={key}
                checked={checkedLines[key]}
                onChange={handleCheckboxChange}
              />
              <span>{key}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={vehicleData}>
            <CartesianGrid
              stroke="var(--grid-color)"
              strokeDasharray="3 3"
            />

            {/* X Axis */}
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

            {/* Y Axis */}
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
                  textAnchor: "middle",
                  fontWeight: "bold",
                }}
              />
            </YAxis>

            <Tooltip
              contentStyle={{
                backgroundColor: "var(--tooltip-bg)",
                border: "1px solid var(--tooltip-border)",
                fontSize: "16px",
                FontWeight: "bold"
              }}
            />

            {checkedLines["2W"] && (
              <Line
                type="monotone"
                dataKey="2W"
                stroke={VEHICLE_COLORS["2W"]}
                strokeWidth={3}
                dot={false}
              />
            )}
            {checkedLines["3W"] && (
              <Line
                type="monotone"
                dataKey="3W"
                stroke={VEHICLE_COLORS["3W"]}
                strokeWidth={3}
                dot={false}
              />
            )}
            {checkedLines["4W"] && (
              <Line
                type="monotone"
                dataKey="4W"
                stroke={VEHICLE_COLORS["4W"]}
                strokeWidth={3}
                dot={false}
              />
            )}
            {checkedLines.LDV && (
              <Line
                type="monotone"
                dataKey="LDV"
                stroke={VEHICLE_COLORS.LDV}
                strokeWidth={3}
                dot={false}
              />
            )}
            {checkedLines.HDV && (
              <Line
                type="monotone"
                dataKey="HDV"
                stroke={VEHICLE_COLORS.HDV}
                strokeWidth={3}
                dot={false}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}


