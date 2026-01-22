import VehicleCard from "@/components/VehicleCard";

export default function Home() {
  return (
    <section className="w-full">

      {/* DASHBOARD GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* 1️⃣ LIVE FEED */}
        <div className="lg:col-span-6 border rounded-lg bg-white flex flex-col">

          {/* Header */}
          <div className="border-b px-4 py-3">
            <h2 className="text-sm font-semibold text-blue-900 uppercase">
              Live Feed
            </h2>
          </div>

          {/* Feed Area */}
          <div className="flex-1 bg-gray-50 flex items-center justify-center text-gray-400 text-sm">
            Live feed will appear here
          </div>

        </div>

        {/* 2️⃣ VEHICLE COUNT */}
        <div className="lg:col-span-3 border rounded-lg bg-white flex flex-col">

          {/* Header */}
          <div className="border-b px-4 py-3">
            <h2 className="text-sm font-semibold text-blue-900 uppercase">
              Vehicle Count
            </h2>
          </div>

          {/* Cards Area (Scrollable if needed) */}
          <div className="p-4 grid grid-cols-2 gap-4 overflow-y-auto">

            <VehicleCard label="2W" count="0" />
            <VehicleCard label="3W" count="0" />
            <VehicleCard label="4W" count="0" />
            <VehicleCard label="LDV" count="0" />
            <VehicleCard label="HDV" count="0" />
            <VehicleCard label="BUS" count="0" />

          </div>

        </div>

        {/* 3️⃣ CSV DOWNLOAD */}
        <div className="lg:col-span-3 border rounded-lg bg-white flex flex-col">

          {/* Header */}
          <div className="border-b px-4 py-3">
            <h2 className="text-sm font-semibold text-blue-900 uppercase">
              Download Data
            </h2>
          </div>

          {/* Content */}
          <div className="p-4 space-y-4 overflow-y-auto">

            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Select Date
              </label>
              <input
                type="date"
                className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <button
              className="w-full bg-blue-900 text-white text-sm py-2 rounded hover:bg-blue-800"
            >
              Download CSV
            </button>

            <p className="text-xs text-gray-500 leading-5">
              Download vehicle count data for the selected date in CSV format.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}
