"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-blue-900 text-white">
      <div className="w-full flex items-center gap-18 px-6 py-4 text-sm font-bold">

        <Link href="/" className="hover:text-blue-200">
          Home
        </Link>

        <a
          href="https://www.neeri.res.in/divisions/details/sub-verticals-air-resource#googtrans(en|en)"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-200"
        >
          About Us
        </a>

        {/* GIS DROPDOWN */}
        <div className="relative group">
          <span className="cursor-pointer hover:text-blue-200 flex items-center gap-1">
            GIS
            {/* Down Arrow */}
            <span className="text-xs">▼</span>
          </span>

          {/* Dropdown Menu */}
          <div className="absolute left-0 mt-2 w-64 bg-white text-blue-900 border border-blue-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">


            <Link
              href="/gis/city-road-network"
              className="flex items-center justify-between px-4 py-3 hover:bg-blue-100"
            >
              <span>City Road Network</span>
              {/* Right Arrow */}
              <span className="text-sm">›</span>
            </Link>

            {/* Divider */}
            <div className="border-t border-blue-200" />

            <Link
              href="/gis/emission-load"
              className="flex items-center justify-between px-4 py-3 hover:bg-blue-100"
            >
              <span>Emission Load</span>
              {/* Right Arrow */}
              <span className="text-sm">›</span>
            </Link>

          </div>
        </div>

        <Link href="/analytics" className="hover:text-blue-200">
          Analytics
        </Link>

        <Link href="/grid" className="hover:text-blue-200">
          Gridded Emission Load
        </Link>

        <Link href="/award" className="hover:text-blue-200">
          Awards & Recognition
        </Link>

      </div>
    </nav>
  );
}
