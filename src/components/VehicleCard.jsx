export default function VehicleCard({ label, count, color }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center gap-2">
      {/* Count */}
      <div className="text-4xl font-bold leading-tight" style={{ color }}>
        {count}
      </div>

      {/* Label */}
      <div
        className="text-xl font-semibold whitespace-nowrap text-center"
        style={{ color }}
        title={label}
      >
        {label}
      </div>
    </div>
  );
}
