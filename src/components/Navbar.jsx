import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-blue-900 text-white">
      <div className="w-full flex justify-between items-center px-6 py-4 text-sm font-medium">

        <Link href="/" className="hover:text-blue-200">
          Home
        </Link>

        {/* External redirect */}
        <a
          href="https://www.neeri.res.in/divisions/details/sub-verticals-air-resource#googtrans(en|en)"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-200"
        >
          About Us
        </a>

        <Link href="/gis" className="hover:text-blue-200">
          GIS
        </Link>

        <Link href="/result" className="hover:text-blue-200">
          Result
        </Link>

        <Link href="/grid" className="hover:text-blue-200">
          Gridded Emission
        </Link>

        <Link href="/award" className="hover:text-blue-200">
          Award
        </Link>

      </div>
    </nav>
  );
}


// import Link from "next/link";

// export default function Navbar() {
//   return (
//     <nav className="w-full bg-blue-900 text-white">
//       <div className="mx-auto max-w-7xl flex gap-8 px-6 py-4 text-sm font-medium">

//         <Link href="/" className="hover:text-blue-200">
//           Home
//         </Link>

//         {/* External redirect */}
//         <a
//           href="https://www.neeri.res.in/divisions/details/sub-verticals-air-resource#googtrans(en|en)"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="hover:text-blue-200"
//         >
//           About Us
//         </a>

//         <Link href="/analytics" className="hover:text-blue-200">
//           Analytics
//         </Link>

//         <Link href="/grid" className="hover:text-blue-200">
//           Gridded Emission
//         </Link>

//         <Link href="/gis" className="hover:text-blue-200">
//           GIS
//         </Link>

//         <Link href="/award" className="hover:text-blue-200">
//           Award
//         </Link>

//         <Link href="/result" className="hover:text-blue-200">
//           Result
//         </Link>

//       </div>
//     </nav>
//   );
// }
