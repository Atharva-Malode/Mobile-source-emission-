"use client";

import React, { useState, useEffect } from "react";
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

/* Analytics-grade pollutant colors (single source of truth) */
const POLLUTANT_COLORS = {
  PM: "var(--color-pm)",
  NOx: "var(--color-nox)",
  HC: "var(--color-hc)",
  CO: "var(--color-co)",
};

function EmissionChart({ selectedDate }) {
  const [emissionsData, setEmissionsData] = useState([]);
  const [checkedLines, setCheckedLines] = useState({
    PM: true,
    NOx: true,
    HC: true,
    CO: true,
  });

  useEffect(() => {
    async function fetchEmissions() {
      try {
        const response = await fetch(
          `http://${process.env.NEXT_PUBLIC_APP_IP}:8000/calculate-emissions?RdLength=1&current_date=${selectedDate}`
        );

        if (!response.ok) {
          throw new Error("API fetch failed");
        }

        const data = await response.json();

        const formattedData = data.emissions.map((item, index) => ({
          time: String(index + 1),
          PM: item.Total_PM,
          NOx: item.Total_NOx,
          HC: item.Total_HC,
          CO: item.Total_CO,
        }));

        setEmissionsData(formattedData);
      } catch (error) {
        console.warn("API failed, loading fallback CSV:", error);

        try {
          const csvResponse = await fetch("/2025-12-18.csv");
          const csvText = await csvResponse.text();

          const rows = csvText.split("\n").slice(1);
          const parsedData = rows
            .map((row, index) => {
              const cols = row.split(",");
              if (cols.length < 5) return null;

              return {
                time: String(index + 1),
                PM: Number(cols[1]),
                NOx: Number(cols[2]),
                HC: Number(cols[3]),
                CO: Number(cols[4]),
              };
            })
            .filter(Boolean);

          setEmissionsData(parsedData);
        } catch (csvError) {
          console.error("Fallback CSV also failed:", csvError);
        }
      }
    }

    if (selectedDate) {
      fetchEmissions();
    }
  }, [selectedDate]);

  function handleCheckboxChange(e) {
    setCheckedLines({
      ...checkedLines,
      [e.target.name]: e.target.checked,
    });
  }

  return (
    <div className="border rounded-lg p-4 space-y-4 bg-white">
      {/* Header + colored checkboxes (acts as legend) */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Emission Load (Kg/hr)
        </h2>

        <div className="flex flex-wrap gap-4 text-sm">
          {Object.keys(checkedLines).map((key) => (
            <label
              key={key}
              className="flex items-center gap-2 font-medium"
              style={{ color: POLLUTANT_COLORS[key] }}
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
          <LineChart data={emissionsData}>
            <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />

            {/* X Axis */}
            <XAxis
              dataKey="time"
              stroke="#374151"
              tick={{ fill: "#374151", fontSize: 12 }}
            >
              <Label
                value="Time (hr)"
                position="insideBottom"
                offset={-5}
                style={{ fill: "#374151", fontSize: 12 }}
              />
            </XAxis>

            {/* Y Axis */}
            <YAxis
              stroke="#374151"
              tick={{ fill: "#374151", fontSize: 12 }}
            >
              <Label
                value="Emission Load (kg)"
                angle={-90}
                position="insideLeft"
                style={{
                  fill: "#374151",
                  fontSize: 12,
                  textAnchor: "middle",
                }}
              />
            </YAxis>

            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #d1d5db",
                fontSize: "12px",
              }}
            />

            {checkedLines.PM && (
              <Line
                type="monotone"
                dataKey="PM"
                stroke={POLLUTANT_COLORS.PM}
                strokeWidth={3}
                dot={false}
              />
            )}
            {checkedLines.NOx && (
              <Line
                type="monotone"
                dataKey="NOx"
                stroke={POLLUTANT_COLORS.NOx}
                strokeWidth={3}
                dot={false}
              />
            )}
            {checkedLines.HC && (
              <Line
                type="monotone"
                dataKey="HC"
                stroke={POLLUTANT_COLORS.HC}
                strokeWidth={3}
                dot={false}
              />
            )}
            {checkedLines.CO && (
              <Line
                type="monotone"
                dataKey="CO"
                stroke={POLLUTANT_COLORS.CO}
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

export default EmissionChart;
