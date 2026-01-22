"use client";

import { useState, useEffect } from "react";
import EmissionChart from "./graphs/emissionchart";
import VehicularCount from "./graphs/vehicularcount";
import VehicleCountChart from "./graphs/vehiclecountchart";

export default function Analysis() {
  const [selectedDate, setSelectedDate] = useState("");

  // Set today's date (yyyy-mm-dd)
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setSelectedDate(today);
  }, []);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <section className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-blue-900">
          Emission Analysis
        </h2>

        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="border rounded-md px-3 py-2 text-sm"
        />
      </div>

      {/* Charts Layout (simple for now) */}
      <div className="space-y-8">

        <div className="border rounded-lg p-4">
          <VehicleCountChart selectedDate={selectedDate} />
        </div>

        <div className="border rounded-lg p-4">
          <EmissionChart selectedDate={selectedDate} />
        </div>

        <div className="border rounded-lg p-4">
          <VehicularCount selectedDate={selectedDate} />
        </div>

      </div>

    </section>
  );
}
