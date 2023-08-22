

import './globals.css'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import type { Metadata } from "next";

const APP_NAME = "PinIt!";
const APP_DEFAULT_TITLE = "My Awesome PWA App";
const APP_TITLE_TEMPLATE = "%s - PinIt!";
const APP_DESCRIPTION = "Best PWA app in the world!";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  themeColor: "#FFFFFF",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        {/*eslint-disable-next-line @next/next/no-sync-scripts*/}
        <script src="bower_components/firebaseui/dist/firebaseui.js"></script>
        {/*eslint-disable-next-line @next/next/no-css-tags*/}
        <link type="text/css" rel="stylesheet" href="bower_components/firebaseui/dist/firebaseui.css" />
        <link href='https://api.mapbox.com/mapbox-gl-js/v2.8.1/mapbox-gl.css' rel='stylesheet' />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
