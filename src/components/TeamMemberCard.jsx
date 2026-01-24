export default function TeamMemberCard({
  name,
  designation,
  role,
  image,
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col items-center text-center gap-3">
      {/* Image OR Initial fallback */}
      {image ? (
        <img
          src={image}
          alt={name}
          className="w-32 h-32 rounded-full object-cover border"
        />
      ) : (
        <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center text-5xl font-bold text-blue-700 border">
          {name.charAt(0)}
        </div>
      )}

      {/* Name */}
      <div className="text-xl font-bold text-gray-900">
        {name}
      </div>

      {/* Designation */}
      <div className="text-base font-semibold text-gray-700">
        {designation}
        {role && (
          <span className="text-gray-500 font-medium">
            {" "}({role})
          </span>
        )}
      </div>
    </div>
  );
}
