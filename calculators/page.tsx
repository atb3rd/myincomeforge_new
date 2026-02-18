import Link from "next/link";

export default function CalculatorsPage() {
  return (
    <main style={{ padding: 40, fontFamily: "Arial, sans-serif", maxWidth: 900 }}>
      <h1>Calculators</h1>
      <p>Free US-focused tools for self-employed professionals and independent earners.</p>

      <div style={{ marginTop: 24, display: "grid", gap: 16 }}>
        <Link
          href="/calculators/real-hourly-rate"
          style={{
            border: "1px solid #e5e5e5",
            borderRadius: 14,
            padding: 16,
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <h2 style={{ margin: 0 }}>Real Hourly Rate Calculator</h2>
          <p style={{ margin: "8px 0 0", color: "#444" }}>
            See what you actually earn per hour after mileage and expenses.
          </p>
        </Link>
      </div>
    </main>
  );
}
