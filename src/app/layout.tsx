import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "IJM First City Harmony Mihan, Nagpur | Premium 2, 2.5 & 3 BHK Apartments",
  description: "Experience luxury living at IJM First City Mihan, Nagpur. A premium 7.5-acre gated community featuring 690 apartments, 100+ amenities, clubhouse, and unmatched connectivity. Enquire now for starting price ₹73 Lakhs.",
  keywords: "IJM First City, First City Nagpur, MIHAN apartments, flats in Nagpur, Harmony Mihan, Symphony Mihan, Nagpur property, IJM Group",
  authors: [{ name: "Nagpur Integrated Township Pvt. Ltd." }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} scroll-smooth`}>
      <body className="antialiased text-gray-900 bg-[#fafafa]">
        {children}
      </body>
    </html>
  );
}
