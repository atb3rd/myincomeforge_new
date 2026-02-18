import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Income Forge",
  description: "US income calculators for self-employed professionals.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
