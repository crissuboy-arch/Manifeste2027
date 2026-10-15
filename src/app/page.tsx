import Script from "next/script";
import data from "./landing-data.json";

// Cristiane's sales page, published exactly as designed.
// Checkout links: edit the CHECKOUT object in landing-data.json ("js" field)
// or paste Digistore24 links there.
export default function Landing() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: (data as { html: string }).html }} />
      <Script id="m27-landing-logic" strategy="afterInteractive">
        {(data as { js: string }).js}
      </Script>
    </>
  );
}
