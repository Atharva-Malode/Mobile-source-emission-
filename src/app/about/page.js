export default function About() {
  return (
    <section className="w-full space-y-4">

      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-center">
        <h1
          className="text-2xl font-bold text-center"
          style={{ color: "var(--about-heading-color)" }}
        >
          AI Dashboard
        </h1>
      </div>

      {/* ================= CONTENT BOX ================= */}
      <div className="border rounded-lg bg-white p-6 max-w-6xl mx-auto space-y-6 text-left">

        <p
          className="leading-7"
          style={{ color: "var(--about-text-color)" }}
        >
          The CSIR–National Environmental Engineering Research Institute (CSIR-NEERI)
          is a premier research institute, established in 1958 and funded by the
          Government of India. Functioning under the Council of Scientific &
          Industrial Research (CSIR), Ministry of Science & Technology, the institute
          has played a pioneering role in environmental science and engineering,
          supporting evidence-based policy, regulation, and sustainable development
          across the country.
        </p>

        <p
          className="leading-7"
          style={{ color: "var(--about-text-color)" }}
        >
          Air Resources is one of the major R&amp;D verticals of CSIR-NEERI, focused on
          addressing air pollution in Indian cities through integrated field
          monitoring, emission inventory development, atmospheric modelling, and
          advanced data analytics. The vertical supports national and state agencies
          by providing scientifically robust assessments for air quality management
          and mitigation planning.
        </p>

        <p
          className="leading-7"
          style={{ color: "var(--about-text-color)" }}
        >
          The AI/ML-enabled Gridded Mobile Emission Inventory Dashboard developed by
          CSIR-NEERI is a decision-support platform that estimates and visualises
          road transport emissions at high spatial and temporal resolution under
          complex Indian traffic conditions. The platform integrates AI/ML-based
          vehicle identification and counting with activity-based emission
          estimation, enabling a dynamic bottom-up approach that overcomes the
          limitations of conventional, averaged emission inventories.
        </p>

        {/* No mx-auto, no centering */}
        <div
          className="leading-7"
          style={{ color: "var(--about-text-color)" }}
        >
          By generating road- and grid-level emission maps and time-resolved
          emission profiles, the dashboard supports hotspot identification,
          corridor-level analysis, and scenario evaluation for traffic and policy
          interventions.
        </div>

      </div>
    </section>
  );
}

// export default function About() {
//   return (
//     <section className="w-full space-y-4">

//       {/* ================= HEADER ================= */}
//       <div className="flex items-center justify-center">
//         <h1
//           className="text-2xl font-bold text-center"
//           style={{ color: "var(--about-heading-color)" }}
//         >
//           AI Dashboard
//         </h1>
//       </div>

//       {/* ================= CONTENT BOX ================= */}
//       <div className="border rounded-lg bg-white p-6 max-w-6xl mx-auto space-y-6 text-center">

//         <p
//           className="leading-7"
//           style={{ color: "var(--about-text-color)" }}
//         >
//           The CSIR–National Environmental Engineering Research Institute (CSIR-NEERI)
//           is a premier research institute, established in 1958 and funded by the
//           Government of India. Functioning under the Council of Scientific &
//           Industrial Research (CSIR), Ministry of Science & Technology, the institute
//           has played a pioneering role in environmental science and engineering,
//           supporting evidence-based policy, regulation, and sustainable development
//           across the country.
//         </p>

//         <p
//           className="leading-7"
//           style={{ color: "var(--about-text-color)" }}
//         >
//           Air Resources is one of the major R&amp;D verticals of CSIR-NEERI, focused on
//           addressing air pollution in Indian cities through integrated field
//           monitoring, emission inventory development, atmospheric modelling, and
//           advanced data analytics. The vertical supports national and state agencies
//           by providing scientifically robust assessments for air quality management
//           and mitigation planning.
//         </p>

//         <p
//           className="leading-7"
//           style={{ color: "var(--about-text-color)" }}
//         >
//           The AI/ML-enabled Gridded Mobile Emission Inventory Dashboard developed by
//           CSIR-NEERI is a decision-support platform that estimates and visualises
//           road transport emissions at high spatial and temporal resolution under
//           complex Indian traffic conditions. The platform integrates AI/ML-based
//           vehicle identification and counting with activity-based emission
//           estimation, enabling a dynamic bottom-up approach that overcomes the
//           limitations of conventional, averaged emission inventories.
//         </p>

//         {/* Highlight paragraph (no green line now) */}
//         <div
//           className="leading-7 max-w-4xl mx-auto"
//           style={{ color: "var(--about-text-color)" }}
//         >
//           By generating road- and grid-level emission maps and time-resolved
//           emission profiles, the dashboard supports hotspot identification,
//           corridor-level analysis, and scenario evaluation for traffic and policy
//           interventions.
//         </div>

//       </div>
//     </section>
//   );
// }
