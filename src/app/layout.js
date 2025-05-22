import React from "react";
import { Montserrat } from "next/font/google";
import "./globals.css";

const font = Montserrat ({
  variable: "--font",
  subsets: ["latin"],
});

export const metadata = {
    title: "Atividade-Avaliativa-FrontEnd",
    icons: {
    icon: "/icon/favicon.ico",
  },
    description: "Atividade Avaliativa FrontEnd",

};

export default function RootLayout({ children }) {
    return (
        <html>
            <body className={font.variable}>{children}</body>
        </html>
    );
}
