"use client";

export default function ContactPage() {
  return (
    <section className="w-full px-6 lg:px-12 py-12 space-y-14">
      {/* ================= HEADING ================= */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900">
          Contact Information
        </h1>
        <p className="text-gray-600 mt-3 text-lg">
          CSIR – National Environmental Engineering Research Institute (NEERI)
        </p>
      </div>

      {/* ================= CONTACT LIST ================= */}
      <div className="max-w-4xl mx-auto space-y-10">
        {/* ================= CONTACT 1 ================= */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">
            Dr. S. Venkata Mohan
          </h2>
          <p className="text-gray-700 font-medium mt-1">
            Director, CSIR-NEERI, Nagpur
          </p>

          <div className="mt-4 space-y-2 text-gray-700">
            <p>
              <span className="font-semibold">Email:</span>{" "}
              <a
                href="mailto:s.mohan@csir.res.in"
                className="text-blue-700 hover:underline"
              >
                s.mohan@csir.res.in
              </a>{" "}
              /{" "}
              <a
                href="mailto:director@csir.res.in"
                className="text-blue-700 hover:underline"
              >
                director@csir.res.in
              </a>
            </p>

            <p>
              <span className="font-semibold">Mobile:</span>{" "}
              <a
                href="tel:+919849306934"
                className="text-blue-700 hover:underline"
              >
                +91 98493 06934
              </a>
            </p>
          </div>
        </div>

        {/* ================= CONTACT 2 ================= */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">
            Dr. K V George
          </h2>
          <p className="text-gray-700 font-medium mt-1">
            Chief Scientist & Chair
          </p>
          <p className="text-gray-700 font-medium">
            Air Quality Management Division
          </p>
          <p className="text-gray-700 font-medium">
            CSIR-NEERI, Nagpur
          </p>

          <div className="mt-4 space-y-2 text-gray-700">
            <p>
              <span className="font-semibold">Email:</span>{" "}
              <a
                href="mailto:kv.george@csir.res.in"
                className="text-blue-700 hover:underline"
              >
                kv.george@csir.res.in
              </a>
            </p>

            <p>
              <span className="font-semibold">Mobile:</span>{" "}
              <a
                href="tel:+919422305272"
                className="text-blue-700 hover:underline"
              >
                +91 94223 05272
              </a>
            </p>
          </div>
        </div>

        {/* ================= CONTACT 3 ================= */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">
            Er. Rahul V. Vyawahare
          </h2>
          <p className="text-gray-700 font-medium mt-1">
            Senior Scientist
          </p>
          <p className="text-gray-700 font-medium">
            Air Quality Management Division
          </p>
          <p className="text-gray-700 font-medium">
            CSIR-NEERI, Nagpur
          </p>

          <div className="mt-4 space-y-2 text-gray-700">
            <p>
              <span className="font-semibold">Email:</span>{" "}
              <a
                href="mailto:rahul.vyawahare@csir.res.in"
                className="text-blue-700 hover:underline"
              >
                rahul.vyawahare@csir.res.in
              </a>
            </p>

            <p>
              <span className="font-semibold">Mobile:</span>{" "}
              <a
                href="tel:+919403253467"
                className="text-blue-700 hover:underline"
              >
                +91 94032 53467
              </a>{" "}
              /{" "}
              <a
                href="tel:+918830686334"
                className="text-blue-700 hover:underline"
              >
                +91 88306 86334
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
