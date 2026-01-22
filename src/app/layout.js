import "./globals.css";
import HeaderWrapper from "@/components/HeaderWrapper";

export const metadata = {
  title: "CSIR-NEERI - Mobile Source Vehicle Emission Inventory Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">

        <HeaderWrapper />

        {/* PAGE CONTENT */}
        <main className="mx-auto max-w-7xl px-6 py-10">
          {children}
        </main>

      </body>
    </html>
  );
}
