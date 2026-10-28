import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CalendarDays,
  CarFront,
  IndianRupee,
  LogOut,
  Plus,
  ArrowUpRight,
  Search,
  Phone,
  Sparkles,
  Loader2,
  Wallet,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import { callAppsScript } from "../services/appsScript";

const inr = (n) => "₹" + Number(n || 0).toLocaleString("en-IN");

const statusStyle = {
  Paid: "bg-emerald-400/10 text-emerald-300 ring-emerald-400/30",
  Pending: "bg-amber-400/10 text-amber-300 ring-amber-400/30",
};

function StatCard({ icon: Icon, label, value, hint }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-amber-300/40">
      <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-amber-400/10 blur-3xl transition duration-500 group-hover:bg-amber-400/25" />
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-300 to-amber-600 text-black shadow-lg shadow-amber-500/20">
        <Icon size={22} />
      </div>
      <p className="mt-5 text-sm text-zinc-400">{label}</p>
      <p className="mt-1 text-4xl font-bold tracking-tight">{value}</p>
      <p className="mt-2 text-xs text-zinc-500">{hint}</p>
    </div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  async function loadBookings() {
    setLoading(true);
    setError("");
    try {
      const result = await callAppsScript("getBookings");
      if (!result.success) {
        throw new Error(result.message || "Unable to load bookings.");
      }
      setBookings(result.bookings || []);
      setSummary(result.summary || null);
    } catch (err) {
      console.error("Load bookings error:", err);
      setError(err.message || "Unable to load bookings.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBookings();
  }, []);

  const totalBookings = loading ? "…" : summary ? summary.totalBookings : 0;
  const totalAmount = loading ? "…" : inr(summary?.totalAmount);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return bookings;
    return bookings.filter((b) =>
      [b.customer, b.location, b.bookingFrom, b.id, b.createdBy]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [bookings, query]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#07080c] text-white">
      {/* ambient glow */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-amber-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 top-1/3 h-[26rem] w-[26rem] rounded-full bg-sky-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 py-6 md:px-10 md:py-10">
        {/* Header */}
        <header className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/10 bg-white/[0.04] px-5 py-4 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-300 to-amber-600 text-black">
              <CarFront size={24} />
            </div>
            <div>
              <p className="text-xs font-medium text-amber-300">
                Swamiccha Car Rental
              </p>
              <h1 className="text-xl font-bold md:text-2xl">Admin dashboard</h1>
            </div>
          </div>

          <button
            onClick={() => {
              sessionStorage.removeItem("adminUser");
              navigate("/admin/login");
            }}
            className="flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2 text-sm text-zinc-200 transition hover:border-red-400/50 hover:bg-red-500/10 hover:text-red-300"
          >
            <LogOut size={16} />
            Logout
          </button>
        </header>

        {/* Welcome */}
        <section className="mt-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">
              Welcome back{" "}
              <span className="bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent">
                Admin
              </span>
            </h2>
            <p className="mt-2 text-zinc-400">
              Track bookings and rental income in one place.
            </p>
          </div>
          <button
            onClick={() => navigate("/admin/booking")}
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-300 to-amber-500 px-6 py-3 font-semibold text-black shadow-lg shadow-amber-500/25 transition hover:scale-[1.03] hover:shadow-amber-400/40"
          >
            <Plus size={18} />
            Create booking
          </button>
        </section>

        {/* Stats */}
        <section className="mt-8 grid gap-5 md:grid-cols-3">
          <StatCard
            icon={CalendarDays}
            label="Total bookings"
            value={totalBookings}
            hint="All bookings recorded"
          />
          <StatCard
            icon={IndianRupee}
            label="Total rental amount"
            value={totalAmount}
            hint="Income from all bookings"
          />

          {/* New booking card */}
          <div className="relative overflow-hidden rounded-3xl border border-amber-300/30 bg-gradient-to-br from-amber-400/20 via-amber-500/5 to-transparent p-6">
            <Sparkles className="absolute right-5 top-5 text-amber-300/60" size={22} />
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-300/40 text-amber-300">
              <CarFront size={22} />
            </div>
            <p className="mt-5 text-sm text-zinc-300">New booking</p>
            <p className="mt-1 text-xl font-semibold">Add a customer trip</p>
            <button
              onClick={() => navigate("/admin/booking")}
              className="mt-4 inline-flex items-center gap-1 rounded-xl bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-amber-200"
            >
              Create booking
              <ArrowUpRight size={16} />
            </button>
          </div>
        </section>

        {/* Payment report */}
        <section className="mt-5 grid gap-5 md:grid-cols-3">
          <StatCard
            icon={Wallet}
            label="Received amount"
            value={loading ? "…" : inr(summary?.receivedAmount)}
            hint="Collected from customers"
          />
          <StatCard
            icon={AlertCircle}
            label="Pending amount"
            value={loading ? "…" : inr(summary?.pendingAmount)}
            hint="Still to be collected"
          />
          <StatCard
            icon={IndianRupee}
            label="Security deposits"
            value={loading ? "…" : inr(summary?.securityDeposit)}
            hint="Held across all bookings"
          />
        </section>

        {/* Recent bookings */}
        <section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl md:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-semibold">Recent bookings</h3>
              <button
                type="button"
                onClick={loadBookings}
                disabled={loading}
                aria-label="Refresh bookings"
                className="rounded-lg border border-white/10 p-2 text-zinc-400 transition hover:text-amber-300 disabled:opacity-50"
              >
                <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
              </button>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-zinc-400">
              <Search size={16} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name, location or ID"
                className="w-44 bg-transparent outline-none placeholder:text-zinc-500 md:w-60"
              />
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 className="animate-spin text-amber-300" size={32} />
              <p className="mt-3 text-sm text-zinc-400">
                Loading bookings from Google Sheets...
              </p>
            </div>
          ) : error ? (
            <p
              role="alert"
              className="mt-6 flex items-start gap-2 rounded-2xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300"
            >
              <AlertCircle size={18} className="mt-0.5 shrink-0" />
              {error}
            </p>
          ) : visible.length === 0 ? (
            <div className="mt-6">
              {/* skeleton rows */}
              <div className="space-y-3">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="flex animate-pulse items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.03] p-4"
                    style={{ opacity: 1 - i * 0.28 }}
                  >
                    <div className="h-10 w-10 rounded-xl bg-white/10" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3 w-1/3 rounded bg-white/10" />
                      <div className="h-3 w-1/4 rounded bg-white/5" />
                    </div>
                    <div className="h-6 w-20 rounded-full bg-white/10" />
                  </div>
                ))}
              </div>
              <p className="mt-6 text-center text-sm text-zinc-400">
                No bookings found.
              </p>
            </div>
          ) : (
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[1500px] text-left text-sm">
                <thead className="text-zinc-400">
                  <tr className="border-b border-white/10">
                    <th className="py-3 pr-4 font-medium">Booking ID</th>
                    <th className="py-3 pr-4 font-medium">Customer</th>
                    <th className="py-3 pr-4 font-medium">Pickup</th>
                    <th className="py-3 pr-4 font-medium">Return</th>
                    <th className="py-3 pr-4 font-medium">Days</th>
                    <th className="py-3 pr-4 font-medium">Going to</th>
                    <th className="py-3 pr-4 font-medium">Booking from</th>
                    <th className="py-3 pr-4 font-medium">Rent/day</th>
                    <th className="py-3 pr-4 font-medium">Total</th>
                    <th className="py-3 pr-4 font-medium">Received</th>
                    <th className="py-3 pr-4 font-medium">Pending</th>
                    <th className="py-3 pr-4 font-medium">ID proof</th>
                    <th className="py-3 pr-4 font-medium">Created by</th>
                    <th className="py-3 pr-4 font-medium">Created at</th>
                    <th className="py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {visible.map((b) => (
                    <tr
                      key={b.id}
                      className="border-b border-white/5 transition hover:bg-white/[0.04]"
                    >
                      <td className="whitespace-nowrap py-4 pr-4 font-mono text-xs text-amber-300">{b.id}</td>
                      <td className="whitespace-nowrap py-4 pr-4 font-medium">{b.customer}</td>
                      <td className="whitespace-nowrap py-4 pr-4 text-zinc-300">{b.pickup}</td>
                      <td className="whitespace-nowrap py-4 pr-4 text-zinc-300">{b.returnDate}</td>
                      <td className="py-4 pr-4 text-zinc-300">{b.days}</td>
                      <td className="whitespace-nowrap py-4 pr-4 text-zinc-300">{b.location}</td>
                      <td className="whitespace-nowrap py-4 pr-4 text-zinc-300">{b.bookingFrom}</td>
                      <td className="whitespace-nowrap py-4 pr-4 text-zinc-300">{inr(b.rentPerDay)}</td>
                      <td className="whitespace-nowrap py-4 pr-4 font-semibold text-amber-300">{inr(b.total)}</td>
                      <td className="whitespace-nowrap py-4 pr-4 text-emerald-300">{inr(b.received)}</td>
                      <td className={`whitespace-nowrap py-4 pr-4 ${b.pending > 0 ? "text-red-400" : "text-zinc-400"}`}>{inr(b.pending)}</td>
                      <td className="py-4 pr-4">
                        {b.idProof ? (
                          <a href={b.idProof} target="_blank" rel="noopener noreferrer" className="text-sky-300 underline hover:text-sky-200">View</a>
                        ) : (
                          <span className="text-zinc-600">—</span>
                        )}
                      </td>
                      <td className="whitespace-nowrap py-4 pr-4 text-zinc-300">{b.createdBy || "—"}</td>
                      <td className="whitespace-nowrap py-4 pr-4 text-zinc-400">{b.createdAt}</td>
                      <td className="py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs ring-1 ${
                            b.pending > 0 ? statusStyle.Pending : statusStyle.Paid
                          }`}
                        >
                          {b.pending > 0 ? "Pending" : "Paid"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <footer className="mt-8 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-500">
          <span>© 2026 Swamiccha Car Rental</span>
          <span className="flex items-center gap-1">
            <Phone size={12} /> +91 9768887212
          </span>
        </footer>
      </div>
    </div>
  );
}