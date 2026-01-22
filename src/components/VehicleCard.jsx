export default function VehicleCard({ label, count }) {
  return (
    <div className="border rounded-md px-4 py-3 text-center bg-gray-50">

      <div className="text-xs font-medium text-gray-600 uppercase">
        {label}
      </div>

      <div className="text-2xl font-bold text-blue-900 mt-1">
        {count}
      </div>

    </div>
  );
}
