import Script from "next/script";
import data from "./thankyou-data.json";

export const metadata = {
  title: "Thank You for Your Purchase! | Manifest 2027 AI",
  robots: "noindex, nofollow",
};

// Cristiane's post-purchase page, published exactly as designed.
export default function ThankYou() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: (data as { html: string }).html }} />
      <Script id="m27-thankyou-logic" strategy="afterInteractive">
        {(data as { js: string }).js}
      </Script>
    </>
  );
}
