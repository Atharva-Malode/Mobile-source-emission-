"use client";

import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";

export default function VehicleBarChart({ selectedDate }) {
  const [vehicleData, setVehicleData] = useState([]);

  useEffect(() => {
    async function fetchVehicleData() {
      if (!selectedDate) return;

      try {
        const response = await fetch(
          `http://${process.env.NEXT_PUBLIC_APP_IP}:8000/get_json?current_date=${selectedDate}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const jsonData = await response.json();

        const formattedData = jsonData.map((item, index) => ({
          time: index + 1,
          "2W": item["2w"],
          "3W": item["3w"],
          "4W": item["4w"],
          LDV: item.ldv,
          HDV: item.hdv,
        }));

        setVehicleData(formattedData);
      } catch (error) {
        console.error("Error fetching vehicle data:", error);
      }
    }

    fetchVehicleData();
  }, [selectedDate]);

  return (
    <div className="border rounded-lg p-4 bg-white w-full">
      <h2 className="text-lg font-semibold text-gray-800 text-center mb-4">
        Vehicular Count Over Time
      </h2>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={vehicleData}>
            {/* Grid */}
            <CartesianGrid
              stroke="#e5e7eb"
              strokeDasharray="3 3"
            />

            {/* Axes */}
            <XAxis
              dataKey="time"
              stroke="#374151"
              tick={{ fill: "#374151", fontSize: 12 }}
              axisLine={{ stroke: "#374151" }}
              tickLine={{ stroke: "#374151" }}
            />
            <YAxis
              stroke="#374151"
              tick={{ fill: "#374151", fontSize: 12 }}
              axisLine={{ stroke: "#374151" }}
              tickLine={{ stroke: "#374151" }}
            />

            {/* Tooltip & Legend */}
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #d1d5db",
                fontSize: "12px",
              }}
            />
            <Legend />

            {/* Bars (only colored elements) */}
            <Bar dataKey="2W" fill="var(--color-2w)" />
            <Bar dataKey="3W" fill="var(--color-3w)" />
            <Bar dataKey="4W" fill="var(--color-4w)" />
            <Bar dataKey="LDV" fill="var(--color-ldv)" />
            <Bar dataKey="HDV" fill="var(--color-hdv)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
