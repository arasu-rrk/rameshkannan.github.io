import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono, Bitter, Playfair_Display, Raleway } from "next/font/google";
import Navbar from "@/components/Navbar";
import { getImageUrl } from "@/lib/images";
import "./globals.css";

const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
const profileImage = getImageUrl("/images/me/ramesh-kannan.jpeg");

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bitter = Bitter({
  variable: "--font-bitter",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Ramesh Kannan | Senior Software Engineer",
    template: "%s | Ramesh Kannan",
  },
  description:
    "Ramesh Kannan is a senior software engineer specializing in .NET full-stack development, cloud architecture, and scalable systems on Azure, AWS, and GCP.",
  metadataBase: new URL("https://rameshkannan.com"),
  applicationName: "Ramesh Kannan",
  creator: "Ramesh Kannan",
  publisher: "Ramesh Kannan",
  openGraph: {
    type: "website",
    title: "Ramesh Kannan | Senior Software Engineer",
    description:
      "Senior software engineer specializing in .NET full-stack development, cloud architecture, and scalable systems.",
    url: "/",
    siteName: "Ramesh Kannan",
    images: [
      {
        url: profileImage,
        alt: "Ramesh Kannan, senior software engineer",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ramesh Kannan | Senior Software Engineer",
    description:
      "Senior software engineer specializing in .NET full-stack development, cloud architecture, and scalable systems.",
    images: [profileImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${bitter.variable} ${playfairDisplay.variable} ${raleway.variable} antialiased`}>
        {gtmId && (
          <>
            <Script
              id="google-tag-manager"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`,
              }}
            />
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
                title="Google Tag Manager"
              />
            </noscript>
          </>
        )}
        <Navbar />
        {children}
      </body>
    </html>
  );
}
