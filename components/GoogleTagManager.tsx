import Script from "next/script";

/**
 * Google Tag Manager (GTM-KPVCVJG3) for the whole site.
 *
 * GTM is the container that manages all marketing/analytics tags (including
 * GA4) from the Tag Manager dashboard — nothing else needs to be added to the
 * site code when you add or change tags inside GTM.
 *
 * Two parts, matching Google's standard snippet:
 *  - The loader <Script> (Google puts this "as high in <head> as possible";
 *    next/script's afterInteractive injects it early without blocking hydration).
 *  - The <noscript> iframe fallback, which Google requires immediately after the
 *    opening <body> tag for users with JavaScript disabled.
 *
 * The container ID is a public identifier and safe to keep in source.
 */
const GTM_ID = "GTM-KPVCVJG3";

export function GoogleTagManagerScript() {
  return (
    <Script id="gtm-init" strategy="afterInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
    </Script>
  );
}

export function GoogleTagManagerNoScript() {
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
}
