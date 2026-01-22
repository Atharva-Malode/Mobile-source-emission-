import VehicleCard from "@/components/VehicleCard";

export default function Home() {
  return (
    <section className="w-full">

      {/* MAIN SPLIT LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT: LIVE FEED */}
        <div className="lg:col-span-2 border rounded-lg bg-white">

          {/* Header */}
          <div className="border-b px-4 py-3">
            <h2 className="text-sm font-semibold text-blue-900 uppercase">
              Live Feed
            </h2>
          </div>

          {/* Feed Area */}
          <div className="h-[500px] bg-gray-50 flex items-center justify-center text-gray-400 text-sm">
            Live feed will appear here
          </div>

        </div>

        {/* RIGHT: VEHICLE COUNTS */}
        <div className="border rounded-lg bg-white">

          {/* Header */}
          <div className="border-b px-4 py-3">
            <h2 className="text-sm font-semibold text-blue-900 uppercase">
              Vehicle Count
            </h2>
          </div>

          {/* Cards */}
          <div className="p-4 grid grid-cols-2 gap-4">

            <VehicleCard label="2W" count="0" />
            <VehicleCard label="3W" count="0" />
            <VehicleCard label="4W" count="0" />
            <VehicleCard label="LDV" count="0" />
            <VehicleCard label="HDV" count="0" />
            <VehicleCard label="BUS" count="0" />

          </div>

        </div>

      </div>

    </section>
  );
}
