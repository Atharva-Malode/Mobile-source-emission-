"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-blue-900 text-white">
      <div className="w-full flex items-center gap-14 px-6 py-4 text-base font-bold">

        <Link href="/" className="hover:text-blue-200">Home</Link>

        {/* ABOUT US */}
        <div className="relative group">
          <span className="cursor-pointer hover:text-blue-200 flex items-center gap-1">
            About Us <span className="text-xs">▼</span>
          </span>

          <div className="absolute left-0 mt-2 w-64 bg-white text-blue-900 border border-blue-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <a href="https://www.neeri.res.in/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between px-4 py-3 hover:bg-blue-100">
              <span>CSIR-NEERI</span><span>›</span>
            </a>
            <div className="border-t border-blue-200" />
            <a href="https://www.neeri.res.in/divisions/details/sub-verticals-air-resource#googtrans(en|en)" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between px-4 py-3 hover:bg-blue-100">
              <span>Air Resource Sub-Vertical</span><span>›</span>
            </a>
          </div>
        </div>

        {/* GIS */}
        <div className="relative group">
          <span className="cursor-pointer hover:text-blue-200 flex items-center gap-1">
            GIS <span className="text-xs">▼</span>
          </span>

          <div className="absolute left-0 mt-2 w-64 bg-white text-blue-900 border border-blue-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <Link href="/gis/city-road-network" className="flex items-center justify-between px-4 py-3 hover:bg-blue-100">
              <span>City Road Network</span><span>›</span>
            </Link>
            <div className="border-t border-blue-200" />
            <Link href="/gis/emission-load" className="flex items-center justify-between px-4 py-3 hover:bg-blue-100">
              <span>Emission Load</span><span>›</span>
            </Link>
          </div>
        </div>

        <Link href="/team" className="hover:text-blue-200">Our Team</Link>
        <Link href="/analytics" className="hover:text-blue-200">Analytics</Link>
        <Link href="/grid" className="hover:text-blue-200">Gridded Emission Load</Link>
        <Link href="/award" className="hover:text-blue-200">Awards & Recognition</Link>
        <Link href="/contact" className="hover:text-blue-200">Contact Us</Link>

      </div>
    </nav>
  );
}

// "use client";
// import Link from "next/link";

// export default function Navbar() {
//   return (
//     <nav className="w-full bg-blue-900 text-white">
//       <div className="w-full flex items-center gap-14 px-6 py-4 text-base font-bold">

//         {/* HOME */}
//         <Link href="/" className="hover:text-blue-200">
//           Home
//         </Link>

//         {/* ================= ABOUT US DROPDOWN ================= */}
//         <div className="relative group">
//           <span className="cursor-pointer hover:text-blue-200 flex items-center gap-1">
//             About Us
//             <span className="text-xs">▼</span>
//           </span>

//           <div
//             className="absolute left-0 mt-2 w-64 bg-white text-blue-900
//                        border border-blue-200 rounded-md shadow-lg
//                        opacity-0 invisible group-hover:opacity-100
//                        group-hover:visible transition-all duration-200 z-50"
//           >
//             <a
//               href="https://www.neeri.res.in/"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="flex items-center justify-between px-4 py-3 hover:bg-blue-100"
//             >
//               <span>CSIR-NEERI</span>
//               <span className="text-sm">›</span>
//             </a>

//             <div className="border-t border-blue-200" />

//             <a
//               href="https://www.neeri.res.in/divisions/details/sub-verticals-air-resource#googtrans(en|en)"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="flex items-center justify-between px-4 py-3 hover:bg-blue-100"
//             >
//               <span>Air Resource Sub-Vertical</span>
//               <span className="text-sm">›</span>
//             </a>
//           </div>
//         </div>

//         {/* ================= GIS DROPDOWN ================= */}
//         <div className="relative group">
//           <span className="cursor-pointer hover:text-blue-200 flex items-center gap-1">
//             GIS
//             <span className="text-xs">▼</span>
//           </span>

//           <div
//             className="absolute left-0 mt-2 w-64 bg-white text-blue-900
//                        border border-blue-200 rounded-md shadow-lg
//                        opacity-0 invisible group-hover:opacity-100
//                        group-hover:visible transition-all duration-200 z-50"
//           >
//             <Link
//               href="/gis/city-road-network"
//               className="flex items-center justify-between px-4 py-3 hover:bg-blue-100"
//             >
//               <span>City Road Network</span>
//               <span className="text-sm">›</span>
//             </Link>

//             <div className="border-t border-blue-200" />

//             <Link
//               href="/gis/emission-load"
//               className="flex items-center justify-between px-4 py-3 hover:bg-blue-100"
//             >
//               <span>Emission Load</span>
//               <span className="text-sm">›</span>
//             </Link>
//           </div>
//         </div>

//         {/* OUR TEAM */}
//         <Link href="/team" className="hover:text-blue-200">
//           Our Team
//         </Link>

//         {/* ANALYTICS */}
//         <Link href="/analytics" className="hover:text-blue-200">
//           Analytics
//         </Link>

//         {/* GRID */}
//         <Link href="/grid" className="hover:text-blue-200">
//           Gridded Emission Load
//         </Link>

//         {/* AWARDS */}
//         <Link href="/award" className="hover:text-blue-200">
//           Awards & Recognition
//         </Link>

//         {/* CONTACT */}
//         <Link href="/contact" className="hover:text-blue-200">
//           Contact Us
//         </Link>

//       </div>
//     </nav>
//   );
// }

