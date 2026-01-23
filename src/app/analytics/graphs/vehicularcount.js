"use client";

import React, { useEffect, useState } from "react";
import {EMISSION_CALCULATION_ENDPOINT} from "@/config/backend";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import VehicleBarChart from "./vehicularBarChart";

/* Pollutant colors from global.css */
const POLLUTANT_COLORS = {
  PM: "var(--color-pm)",
  NOx: "var(--color-nox)",
  HC: "var(--color-hc)",
  CO: "var(--color-co)",
};

/* Numeric safety helper */
const toNumber = (v) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};

export default function VehicularCount({ selectedDate }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const RdLength = 1;

        const response = await fetch(
          `${EMISSION_CALCULATION_ENDPOINT.CALCULATE}?RdLength=${RdLength}&current_date=${selectedDate}`
        );

        if (!response.ok) {
          throw new Error("API fetch failed");
        }

        const result = await response.json();
        const emissions = result.emissions;

        const aggregated = emissions.reduce(
          (acc, curr) => {
            acc.PM += toNumber(curr.Total_PM);
            acc.NOx += toNumber(curr.Total_NOx);
            acc.HC += toNumber(curr.Total_HC);
            acc.CO += toNumber(curr.Total_CO);
            return acc;
          },
          { PM: 0, NOx: 0, HC: 0, CO: 0 }
        );

        setData([
          { name: "PM", value: aggregated.PM },
          { name: "NOx", value: aggregated.NOx },
          { name: "HC", value: aggregated.HC },
          { name: "CO", value: aggregated.CO },
        ]);
      } catch (error) {
        console.warn("API failed, loading fallback CSV:", error);

        /* CSV fallback */
        try {
          const csvResponse = await fetch("/2025-12-18.csv");
          const csvText = await csvResponse.text();

          const rows = csvText.split("\n").slice(1);
          const totals = rows.reduce(
            (acc, row) => {
              const cols = row.split(",");
              if (cols.length < 5) return acc;

              acc.PM += toNumber(cols[1]);
              acc.NOx += toNumber(cols[2]);
              acc.HC += toNumber(cols[3]);
              acc.CO += toNumber(cols[4]);
              return acc;
            },
            { PM: 0, NOx: 0, HC: 0, CO: 0 }
          );

          setData([
            { name: "PM", value: totals.PM },
            { name: "NOx", value: totals.NOx },
            { name: "HC", value: totals.HC },
            { name: "CO", value: totals.CO },
          ]);
        } catch (csvError) {
          console.error("Fallback CSV also failed:", csvError);
          setData([]);
        }
      } finally {
        setLoading(false);
      }
    }

    if (selectedDate) {
      fetchData();
    }
  }, [selectedDate]);

  if (loading) {
    return <div className="text-gray-600 p-4">Loading…</div>;
  }

  const totalValue = data.reduce((acc, d) => acc + d.value, 0);

  return (
    <div className="flex flex-col md:flex-row items-start gap-6">
      {/* Pie Chart */}
      <div className="border rounded-lg p-4 bg-white w-full max-w-[420px] space-y-3">
        <h2 className="text-xl font-bold text-gray-800 text-center">
          Emission Load %
        </h2>

        {/* Colored labels (legend replacement) */}
        <div className="flex justify-center gap-4 text-m font-bold">
          {data.map((d) => (
            <span
              key={d.name}
              className="text-l font-bold"
              style={{ color: POLLUTANT_COLORS[d.name] }}
            >
              {d.name}
            </span>
          ))}
        </div>

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
                label={({ value }) =>
                  totalValue > 0
                    ? `${((value / totalValue) * 100).toFixed(1)}%`
                    : "0%"
                }
              >
                {data.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={POLLUTANT_COLORS[entry.name]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar Chart */}
      <VehicleBarChart selectedDate={selectedDate} />
    </div>
  );
}
