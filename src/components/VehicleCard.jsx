export default function VehicleCard({ label, count, icon }) {
  return (
    <div className="border rounded-lg bg-gray-50 flex flex-col items-center justify-center h-full">

      {icon && (
        <img
          src={icon}
          alt={label}
          className="h-8 w-8 mb-2"
        />
      )}

      <div className="text-lg font-bold text-blue-900">
        {count}
      </div>

      <div className="text-xs text-gray-600">
        {label}
      </div>

    </div>
  );
}
