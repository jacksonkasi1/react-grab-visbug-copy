import { Script } from "next/script";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Next.js App with VisBug Copy</title>
        {process.env.NODE_ENV === "development" && (
          <>
            <Script
              src="https://unpkg.com/react-grab/dist/index.global.js"
              strategy="beforeInteractive"
            />
            <Script
              src="https://unpkg.com/react-grab-visbug-copy/dist/client/standalone.js"
              strategy="lazyOnload"
            />
          </>
        )}
      </head>
      <body>
        <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
          <h1>Next.js App with VisBug Copy</h1>
          <p>Press Cmd+C to activate React Grab, select elements, and copy changes!</p>
          
          <button
            style={{
              padding: "0.8rem 2rem",
              fontSize: "1rem",
              fontWeight: "600",
              color: "#fff",
              background: "#667eea",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Click me!
          </button>

          <div style={{ marginTop: "2rem", padding: "1rem", background: "#fff3cd", borderRadius: "8px" }}>
            <h3 style={{ margin: "0 0 0.5rem", color: "#856404" }}>Highlight Box</h3>
            <p style={{ margin: 0, color: "#856404" }}>
              Edit this box with VisBug tools!
            </p>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
