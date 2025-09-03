export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/remixicon/fonts/remixicon.css"
        />
      </head>
      <body style={{margin: 0}}>
        {children}
      </body>
    </html>
  );
}
