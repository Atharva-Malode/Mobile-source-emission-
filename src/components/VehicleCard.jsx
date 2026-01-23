export default function VehicleCard({ label, count }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center gap-3">
      
      {/* Count - Very Large and Bold */}
      <div className="text-6xl font-bold text-gray-900">
        {count}
      </div>

      {/* Label - Large and Clear */}
      <div className="text-2xl font-semibold text-gray-700">
        {label}
      </div>

    </div>
  );
}