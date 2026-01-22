export default function Header() {
  return (
    <header className="w-full bg-white">
      <div className="flex items-center justify-center gap-6 px-8 py-3">

        {/* LEFT LOGO - Ashoka Emblem */}
        <img
          src="/embelem.jpg"
          alt="Government of India Emblem"
          className="h-24 w-auto"
        />

        {/* CENTER TEXT */}
        <div className="text-center">
          <h1 className="text-blue-900 font-bold text-xl leading-tight uppercase">
            CSIR - National Environmental Engineering Research Institute
          </h1>

          <h2 className="text-blue-800 font-semibold text-lg mt-1 leading-tight">
            CSIR-National Environmental Engineering Research Institute
          </h2>

          <p className="text-gray-700 text-sm mt-1 leading-tight">
            A constituent laboratory of the Council of Scientific and Industrial Research (CSIR)
          </p>

          <p className="text-gray-600 text-xs mt-1 leading-tight">
            (An autonomous organization under the Ministry of Science and Technology, Government of India)
          </p>
        </div>

        {/* RIGHT LOGO - NEERI */}
        <img
          src="/neeri_logo.png"
          alt="NEERI Logo"
          className="h-24 w-auto"
        />

      </div>
    </header>
  );
}