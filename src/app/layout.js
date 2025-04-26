import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import NextAuthSessionProviders from "@/Providers/NextAuthSessionProviders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ["400", "600", "800"],
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Learning next js",
    template: "%s | Learning next js"
  },
  keywords: ['Next.js', 'React', 'JavaScript', "learning",],
  description: "Trying to learn nextjs as best as I  can",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <NextAuthSessionProviders>
        <body
          className={` ${poppins.className} antialiased mx-10`}
        >
          <NavBar> </NavBar>
          {children}
        </body>
      </NextAuthSessionProviders>

    </html>
  );
}
