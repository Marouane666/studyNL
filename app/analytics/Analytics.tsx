"use client";

// Loads Google Analytics, Microsoft Clarity and Zuko, and only once the visitor
// has accepted analytics cookies. IDs come from lib/siteConfig.ts; a tool with
// no ID configured is never loaded.
//
// Page views on client-side navigation need no extra code: GA4's enhanced
// measurement ("page changes based on browser history events", on by default)
// and Clarity both follow the App Router's history changes themselves.

import Script from "next/script";
import { clarityProjectId, googleAnalyticsId, hasZuko } from "@/lib/siteConfig";
import { useConsent } from "./consent";
import { markZukoReady } from "./zuko";

export function Analytics() {
  const consent = useConsent();
  if (consent !== "granted") return null;

  const gaId = googleAnalyticsId();
  const clarityId = clarityProjectId();

  return (
    <>
      {gaId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
          </Script>
        </>
      )}

      {clarityId && (
        <>
          <Script id="clarity-init" strategy="afterInteractive">
            {`window.clarity=window.clarity||function(){(window.clarity.q=window.clarity.q||[]).push(arguments)};`}
          </Script>
          <Script src={`https://www.clarity.ms/tag/${clarityId}`} strategy="afterInteractive" />
        </>
      )}

      {hasZuko() && (
        <Script
          src="https://assets.zuko.io/js/v2/client.min.js"
          strategy="afterInteractive"
          onReady={markZukoReady}
        />
      )}
    </>
  );
}
