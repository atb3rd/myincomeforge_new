"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

function toNumber(value: string) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function money(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export default function RealHourlyRateCalculator() {
  const [grossEarnings, setGrossEarnings] = useState("0");
  const [hoursWorked, setHoursWorked] = useState("0");
  const [milesDriven, setMilesDriven] = useState("0");
  const [costPerMile, setCostPerMile] = useState("0.30");
  const [otherExpenses, setOtherExpenses] = useState("0");

  const result = useMemo(() => {
    const gross = Math.max(0, toNumber(grossEarnings));
    const hours = Math.max(0, toNumber(hoursWorked));
    const miles = Math.max(0, toNumber(milesDriven));
    const cpm = Math.max(0, toNumber(costPerMile));
    const other = Math.max(0, toNumber(otherExpenses));

    const mileageCost = miles * cpm;
    const totalExpenses = mileageCost + other;
    const netProfit = gross - totalExpenses;

    const realHourlyRate = hours > 0 ? netProfit / hours : 0;
    const profitPerMile = miles > 0 ? netProfit / miles : 0;

    return {
      gross,
      hours,
      miles,
      cpm,
      other,
      mileageCost,
      totalExpenses,
      netProfit,
      realHourlyRate,
      profitPerMile,
    };
  }, [grossEarnings, hoursWorked, milesDriven, costPerMile, otherExpenses]);

  return (
    <main style={{ padding: 40, fontFamily: "Arial, sans-serif", maxWidth: 980 }}>
      <Link href="/calculators" style={{ textDecoration: "none" }}>
        ← Back to Calculators
      </Link>

      <h1 style={{ marginTop: 14 }}>Real Hourly Rate Calculator</h1>
      <p style={{ color: "#444", maxWidth: 820 }}>
        This US-focused tool estimates your <b>real hourly pay</b> after mileage costs and
        other expenses. (Informational only — not tax or financial advice.)
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 18,
          marginTop: 22,
        }}
      >
        <section
          style={{
            border: "1px solid #e5e5e5",
            borderRadius: 16,
            padding: 18,
            background: "#fff",
          }}
        >
          <h2 style={{ marginTop: 0 }}>Inputs</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 14,
            }}
          >
            <Field
              label="Gross earnings ($)"
              value={grossEarnings}
              onChange={setGrossEarnings}
              hint="Total earnings before expenses."
            />
            <Field
              label="Hours worked"
              value={hoursWorked}
              onChange={setHoursWorked}
              hint="Total time spent working."
            />
            <Field
              label="Miles driven"
              value={milesDriven}
              onChange={setMilesDriven}
              hint="Work-related miles."
            />
            <Field
              label="Cost per mile ($)"
              value={costPerMile}
              onChange={setCostPerMile}
              hint="A common estimate is $0.25–$0.40."
            />
            <Field
              label="Other expenses ($)"
              value={otherExpenses}
              onChange={setOtherExpenses}
              hint="Tolls, supplies, parking, etc."
            />
          </div>
        </section>

        <section
          style={{
            border: "1px solid #e5e5e5",
            borderRadius: 16,
            padding: 18,
            background: "#fff",
          }}
        >
          <h2 style={{ marginTop: 0 }}>Results</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 14,
            }}
          >
            <ResultCard title="Net profit" value={money(result.netProfit)} />
            <ResultCard title="Real hourly rate" value={money(result.realHourlyRate) + " / hr"} />
            <ResultCard title="Profit per mile" value={money(result.profitPerMile) + " / mi"} />
            <ResultCard title="Mileage cost" value={money(result.mileageCost)} />
            <ResultCard title="Total expenses" value={money(result.totalExpenses)} />
          </div>

          <p style={{ marginTop: 14, color: "#555" }}>
            Formula: <b>Net Profit</b> = Gross Earnings − (Miles × Cost/Mile) − Other Expenses
          </p>
        </section>

        <section style={{ color: "#555", fontSize: 14, lineHeight: 1.5 }}>
          <h3 style={{ color: "#111" }}>Tip</h3>
          <p>
            If you don’t know your cost per mile, start with <b>$0.30</b>. Adjust over time based on
            charging/fuel, tires, maintenance, and depreciation.
          </p>
        </section>
      </div>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
}) {
  return (
    <label style={{ display: "grid", gap: 6 }}>
      <span style={{ fontWeight: 600 }}>{label}</span>
      <input
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          padding: "10px 12px",
          borderRadius: 12,
          border: "1px solid #d9d9d9",
          fontSize: 16,
          outline: "none",
        }}
      />
      {hint ? <span style={{ color: "#666", fontSize: 13 }}>{hint}</span> : null}
    </label>
  );
}

function ResultCard({ title, value }: { title: string; value: string }) {
  return (
    <div
      style={{
        border: "1px solid #eee",
        borderRadius: 14,
        padding: 14,
        background: "#fafafa",
      }}
    >
      <div style={{ color: "#666", fontSize: 13 }}>{title}</div>
      <div style={{ fontSize: 22, fontWeight: 700, marginTop: 6 }}>{value}</div>
    </div>
  );
}
