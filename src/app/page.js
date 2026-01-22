import VehicleCard from "@/components/VehicleCard";

export default function Home() {
  return (
    <section className="w-full space-y-6">

      {/* PAGE TITLE */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-green-700">
          Realtime Mobile Emission Inventory Dashboard
        </h1>
      </div>

      {/* DASHBOARD GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* 1️⃣ LIVE FEED */}
        <div className="lg:col-span-6 border rounded-lg bg-white flex flex-col">

          <div className="border-b px-4 py-3 text-center">
            <h2 className="text-sm font-semibold text-blue-900 uppercase">
              Realtime Vehicle Counting
            </h2>
          </div>

          <div className="flex-1 bg-gray-50 flex items-center justify-center p-4">
            <div
              className="bg-black flex items-center justify-center"
              style={{ width: "640px", height: "480px" }}
            >
              <span className="text-gray-300 text-sm">
                640 × 480 Live Feed
              </span>
            </div>
          </div>

        </div>

        {/* 2️⃣ VEHICLE COUNT */}
        <div className="lg:col-span-3 border rounded-lg bg-white flex flex-col">

          <div className="border-b px-4 py-3 text-center">
            <h2 className="text-sm font-semibold text-blue-900 uppercase">
              Vehicle Count
            </h2>
          </div>

          {/* Cards fill entire height */}
          <div className="flex-1 p-4 grid grid-cols-2 grid-rows-3 gap-4">

            <VehicleCard label="2W" count="0" icon="/icons/2w.png" />
            <VehicleCard label="3W" count="0" icon="/icons/3w.png" />
            <VehicleCard label="4W" count="0" icon="/icons/4w.png" />
            <VehicleCard label="LDV" count="0" icon="/icons/ldv.png" />
            <VehicleCard label="HDV" count="0" icon="/icons/hdv.png" />
            <VehicleCard label="BUS" count="0" icon="/icons/bus.png" />

          </div>

        </div>

        {/* 3️⃣ CSV DOWNLOAD + PREVIEW */}
        <div className="lg:col-span-3 border rounded-lg bg-white flex flex-col">

          <div className="border-b px-4 py-3 text-center">
            <h2 className="text-sm font-semibold text-blue-900 uppercase">
              Download Data
            </h2>
          </div>

          {/* Controls */}
          <div className="p-4 space-y-4 border-b">
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Select Date
              </label>
              <input
                type="date"
                className="w-full border rounded px-3 py-2 text-sm
                           focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <button
              className="w-full bg-blue-900 text-white text-sm py-2 rounded
                         hover:bg-blue-800"
            >
              Download CSV
            </button>
          </div>

          {/* CSV PREVIEW (ONLY THIS SCROLLS) */}
          <div className="p-4">
            <div className="max-h-[260px] overflow-y-auto border rounded">

              <table className="w-full text-xs border-collapse">
                <thead className="sticky top-0 bg-gray-100 z-10">
                  <tr>
                    <th className="border px-2 py-1">Time</th>
                    <th className="border px-2 py-1">2W</th>
                    <th className="border px-2 py-1">3W</th>
                    <th className="border px-2 py-1">4W</th>
                    <th className="border px-2 py-1">LDV</th>
                    <th className="border px-2 py-1">HDV</th>
                    <th className="border px-2 py-1">BUS</th>
                  </tr>
                </thead>

                <tbody>
                  {Array.from({ length: 24 }).map((_, hour) => {
                    const timeLabel = `${hour
                      .toString()
                      .padStart(2, "0")}:00`;

                    return (
                      <tr key={timeLabel}>
                        <td className="border px-2 py-1">{timeLabel}</td>
                        <td className="border px-2 py-1">0</td>
                        <td className="border px-2 py-1">0</td>
                        <td className="border px-2 py-1">0</td>
                        <td className="border px-2 py-1">0</td>
                        <td className="border px-2 py-1">0</td>
                        <td className="border px-2 py-1">0</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
