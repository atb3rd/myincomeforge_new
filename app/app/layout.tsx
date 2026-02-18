export const metadata = {
  title: "My Income Forge",
  description: "US income calculators for self-employed professionals."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
