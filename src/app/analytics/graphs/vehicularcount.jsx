"use client";

import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";
import VehicleBarChart from "./vehicularBarChart";

/* Muted, consistent analytics colors */
const COLORS = [
  "var(--color-pm)",
  "var(--color-nox)",
  "var(--color-hc)",
  "var(--color-co)",
];

export default function VehicularCount({ selectedDate }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!selectedDate) return;

      try {
        const RdLength = 1;

        const response = await fetch(
          `http://${process.env.NEXT_PUBLIC_APP_IP}:8000/calculate-emissions?RdLength=${RdLength}&current_date=${selectedDate}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        const emissions = result.emissions;

        const aggregatedData = emissions.reduce(
          (acc, curr) => {
            acc.PM += curr.Total_PM;
            acc.NOx += curr.Total_NOx;
            acc.HC += curr.Total_HC;
            acc.CO += curr.Total_CO;
            return acc;
          },
          { PM: 0, NOx: 0, HC: 0, CO: 0 }
        );

        const total =
          aggregatedData.PM +
          aggregatedData.NOx +
          aggregatedData.HC +
          aggregatedData.CO;

        const processedData =
          total > 0
            ? [
                { name: "PM", value: aggregatedData.PM },
                { name: "NOx", value: aggregatedData.NOx },
                { name: "HC", value: aggregatedData.HC },
                { name: "CO", value: aggregatedData.CO },
              ]
            : [];

        setData(processedData);
      } catch (error) {
        console.error("Error fetching emissions data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [selectedDate]);

  if (loading) {
    return <div className="text-gray-600 p-4">Loading…</div>;
  }

  return (
    <div className="flex flex-col md:flex-row items-start gap-6">
      {/* Pie Chart */}
      <div className="border rounded-lg p-4 bg-white w-full max-w-[420px]">
        <h2 className="text-lg font-semibold text-gray-800 text-center mb-2">
          Air Pollutant Emission (Share)
        </h2>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ value }) => {
                  const totalValue = data.reduce(
                    (acc, entry) => acc + entry.value,
                    0
                  );
                  return `${((value / totalValue) * 100).toFixed(1)}%`;
                }}
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index]}
                  />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar Chart */}
      <VehicleBarChart selectedDate={selectedDate} />
    </div>
  );
}
