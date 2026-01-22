import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-blue-900 text-white">
      <div className="mx-auto max-w-7xl flex gap-8 px-6 py-4 text-sm font-medium">

        <Link href="/" className="hover:text-blue-200">
          Home
        </Link>

        <Link href="/about" className="hover:text-blue-200">
          About Us
        </Link>

        <Link href="/analysis" className="hover:text-blue-200">
          Analysis
        </Link>

        <Link href="/gis" className="hover:text-blue-200">
          GIS
        </Link>

      </div>
    </nav>
  );
}
