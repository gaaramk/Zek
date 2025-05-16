import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/Navbar";
import { Toaster } from "react-hot-toast";
import AuthContext from "./_context/AuthContext";
import CartContextProvider from "./_context/CartContext";
import WishContextProvider from "./_context/WishContext";
import Footer from "./_components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "ZEK | E-Commerce Platform",
    template: "%s | ZEK",
  },
  description: "ZEK E-Commerce Platform by MENOBODY",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthContext>
          <WishContextProvider>
            <CartContextProvider>
              <Navbar />

              <main className="">{children}</main>
              <Toaster />

              <Footer />
            </CartContextProvider>
          </WishContextProvider>
        </AuthContext>


      </body>
    </html>
  );
}
