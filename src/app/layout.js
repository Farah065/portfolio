import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Farah El-Taher",
  description: "Personal portfolio of Farah El-Taher",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={ibmPlexMono.className} suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
