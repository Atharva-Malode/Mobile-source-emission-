export default function Award() {
  return (
    <section className="w-full space-y-8">

      {/* PAGE TITLE */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-blue-900">
          SKOCH Award 2025 – Semi-Finalist
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          AI-Integrated GIS-based Line Source Emission Inventory (LSEI) Dashboard
        </p>
      </div>

      {/* SIDE BY SIDE LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* LEFT: CERTIFICATE */}
        <div className="border rounded-lg bg-white p-5 flex flex-col">

          <h2 className="text-base font-semibold text-blue-900 uppercase text-center 
                         border-b border-green-600 pb-2 mb-4">
            Award Certificate
          </h2>

          <div className="flex-1 flex items-center justify-center">
            <img
              src="/certificate.jpg"
              alt="SKOCH Semi-Finalist Award Certificate"
              className="max-w-full h-auto border"
            />
          </div>

        </div>

        {/* RIGHT: VIDEO + DESCRIPTION */}
        <div className="border rounded-lg bg-white p-5 flex flex-col space-y-4">

          <h2 className="text-base font-semibold text-blue-900 uppercase text-center 
                         border-b border-green-600 pb-2">
            Project Overview
          </h2>

          {/* VIDEO */}
          <div className="aspect-video w-full">
            <iframe
              className="w-full h-full border"
              src="https://www.youtube.com/embed/dTudU6azN7A"
              title="AI-Integrated GIS-based LSEI Dashboard Overview"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* DESCRIPTION */}
          <p className="text-sm text-gray-700 leading-6 text-justify">
            This video provides an overview of the AI-integrated GIS-based Line
            Source Emission Inventory (LSEI) dashboard developed at CSIR–NEERI.
            The system automates vehicle detection and classification for Indian
            traffic conditions and estimates time-resolved vehicular emission
            loads using fuel- and engine-specific emission factors. The platform
            enables high-resolution, grid-based spatial analysis to identify
            emission hotspots and support evidence-based air quality management
            and urban planning.
          </p>

        </div>

      </div>

    </section>
  );
}
