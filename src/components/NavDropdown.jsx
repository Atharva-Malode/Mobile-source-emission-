import Link from "next/link";

export default function NavDropdown({ title, items }) {
  return (
    <div className="relative group">
      <span className="cursor-pointer hover:text-blue-200 flex items-center gap-1">
        {title}
        <span className="text-xs">▼</span>
      </span>

      <div className="absolute left-0 mt-2 w-64 bg-white text-blue-900 border border-blue-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {items.map((item, idx) => (
          <div key={idx}>
            <Link
              href={item.href}
              className="flex items-center justify-between px-4 py-3 hover:bg-blue-100"
            >
              <span>{item.label}</span>
              <span className="text-sm">›</span>
            </Link>

            {idx < items.length - 1 && (
              <div className="border-t border-blue-200" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
