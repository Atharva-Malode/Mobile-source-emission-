import "./globals.css";
import HeaderWrapper from "@/components/HeaderWrapper";

export const metadata = {
  title: "CSIR-NEERI - Mobile Source Vehicle Emission Inventory Dashboard",
  icons: {
    icon: "/neeri_single.png",
  },
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">

        <HeaderWrapper />

        {/* FULL-WIDTH CONTENT */}
        <main className="w-full px-4 lg:px-6 py-6">
          {children}
        </main>

      </body>
    </html>
  );
}
