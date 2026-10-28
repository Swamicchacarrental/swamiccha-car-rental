import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  CarFront,
  CheckCircle2,
  IndianRupee,
  AlertCircle,
  Upload,
  UserRound,
  Loader2,
  Copy,
  Check,
  X,
} from "lucide-react";
import { callAppsScript } from "../services/appsScript";

const SECURITY_DEPOSIT = 3000;
const RENT_OPTIONS = [2000, 2500];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

function calculateBookingDays(pickupDate, returnDate) {
  if (!pickupDate || !returnDate) return 0;

  const pickup = new Date(pickupDate).getTime();
  const returned = new Date(returnDate).getTime();

  if (!Number.isFinite(pickup) || !Number.isFinite(returned)) return 0;
  if (returned <= pickup) return 0;

  return Math.ceil((returned - pickup) / (24 * 60 * 60 * 1000));
}

function formatINR(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);
}

function Section({ icon: Icon, title, subtitle, children }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl md:p-7">
      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-300 to-amber-600 text-black shadow-lg shadow-amber-500/20">
          <Icon size={20} />
        </div>
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-xs text-zinc-500">{subtitle}</p>
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-2">{children}</div>
    </section>
  );
}

function Field({ label, htmlFor, hint, full, children }) {
  return (
    <div className={full ? "md:col-span-2" : ""}>
      <label className="text-sm font-medium text-zinc-300" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
      {hint && <p className="mt-2 text-xs text-zinc-500">{hint}</p>}
    </div>
  );
}

function SummaryRow({ label, value, valueClass = "text-white" }) {
  return (
    <div className="flex items-center justify-between py-3 text-sm">
      <span className="text-zinc-400">{label}</span>
      <span className={`font-semibold ${valueClass}`}>{value}</span>
    </div>
  );
}

function getAdminUser() {
  try {
    return JSON.parse(sessionStorage.getItem("adminUser") || "null");
  } catch {
    return null;
  }
}

function formatDateTime(value) {
  const d = new Date(value);
  return Number.isNaN(d.getTime())
    ? String(value || "")
    : d.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
}

function bookingRows(d) {
  return [
    ["Booking ID", d.bookingId],
    ["Customer name", d.customerName],
    ["Pickup", formatDateTime(d.pickupDate)],
    ["Return", formatDateTime(d.returnDate)],
    ["Booking days", String(d.bookingDays)],
    ["Going location", d.goingLocation],
    ["Booking from", d.bookingFrom],
    ["Rent per day", formatINR(d.rentPerDay)],
    ["Total amount", formatINR(d.totalAmount)],
    ["Received amount", formatINR(d.receivedAmount)],
    ["Pending amount", formatINR(d.pendingAmount)],
    ["Security deposit", formatINR(d.securityDeposit)],
    ["Created by", d.createdBy],
  ].filter(([, v]) => v !== "" && v != null);
}

function SuccessModal({ data, onClose }) {
  const [copied, setCopied] = useState("");
  const rows = bookingRows(data);
  const message =
    "*Swamiccha Car Rental – Booking Confirmed*\n\n" +
    rows.map(([k, v]) => `${k}: ${v}`).join("\n");

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function copy(text, key) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const t = document.createElement("textarea");
      t.value = text;
      document.body.appendChild(t);
      t.select();
      document.execCommand("copy");
      t.remove();
    }
    setCopied(key);
    setTimeout(() => setCopied(""), 1500);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Booking saved"
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-emerald-400/30 bg-[#0d0f15] p-6 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/15 text-emerald-300">
              <CheckCircle2 size={26} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Booking saved</h2>
              <p className="text-xs text-zinc-500">
                Copy the details and paste them into WhatsApp.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-2 text-zinc-400 hover:bg-white/10 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <ul className="mt-5 divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.03]">
          {rows.map(([label, value]) => (
            <li key={label} className="flex items-center justify-between gap-3 px-4 py-3">
              <div className="min-w-0">
                <p className="text-xs text-zinc-500">{label}</p>
                <p className="break-words text-sm font-semibold">{value}</p>
              </div>
              <button
                type="button"
                onClick={() => copy(`${label}: ${value}`, label)}
                aria-label={`Copy ${label}`}
                className="shrink-0 rounded-lg border border-white/10 p-2 text-zinc-400 transition hover:border-amber-300/50 hover:text-amber-300"
              >
                {copied === label ? (
                  <Check size={16} className="text-emerald-400" />
                ) : (
                  <Copy size={16} />
                )}
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => copy(message, "all")}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-300 to-amber-500 py-3 font-bold text-black transition hover:brightness-110"
          >
            {copied === "all" ? <Check size={18} /> : <Copy size={18} />}
            {copied === "all" ? "Copied!" : "Copy all"}
          </button>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(message)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3 font-bold text-black transition hover:bg-emerald-400"
          >
            Send on WhatsApp
          </a>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="mt-3 w-full rounded-xl border border-white/15 py-3 text-zinc-300 hover:bg-white/5"
        >
          Close
        </button>
      </div>
    </div>
  );
}

function LoadingOverlay({ text }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#07080c]/90 backdrop-blur-md"
    >
      <div className="relative flex h-24 w-24 items-center justify-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-amber-400/20" />
        <span className="absolute inset-0 animate-spin rounded-full border-4 border-amber-300/20 border-t-amber-300" />
        <CarFront className="text-amber-300" size={34} />
      </div>
      <p className="mt-6 text-lg font-semibold text-white">{text}</p>
      <p className="mt-1 text-sm text-zinc-500">Please wait a moment...</p>
      <div className="mt-6 h-1 w-48 overflow-hidden rounded-full bg-white/10">
        <div className="h-full w-1/2 animate-pulse rounded-full bg-gradient-to-r from-amber-300 to-amber-500" />
      </div>
    </div>
  );
}

export default function BookingForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    pickupDate: "",
    returnDate: "",
    location: "",
    customerName: "",
    bookingFrom: "",
    rentPerDay: "2000",
    receivedAmount: "",
  });

  const [users, setUsers] = useState([]);
  const [idProof, setIdProof] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [saving, setSaving] = useState(false);
  const [booked, setBooked] = useState(null);

  const bookingDays = useMemo(
    () => calculateBookingDays(form.pickupDate, form.returnDate),
    [form.pickupDate, form.returnDate]
  );

  const totalAmount = bookingDays * Number(form.rentPerDay);
  const receivedAmount =
    form.receivedAmount === "" ? 0 : Number(form.receivedAmount);

  const pendingAmount = totalAmount - receivedAmount;

  useEffect(() => {
    let active = true;

    async function loadUsers() {
      try {
        const result = await callAppsScript("getBookingUsers");

        if (!result.success) {
          throw new Error(result.message || "Unable to load users.");
        }

        if (active) {
          setUsers(result.users || []);
        }
      } catch (err) {
        if (active) {
          setError(
            "Unable to load Booking From users. Check your Apps Script connection."
          );
        }
        console.error("Load booking users error:", err);
      } finally {
        if (active) setLoadingUsers(false);
      }
    }

    loadUsers();

    return () => {
      active = false;
    };
  }, []);

  function updateField(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  }

  function handleFileChange(event) {
    const file = event.target.files?.[0];

    setError("");
    setIdProof(null);

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];

    if (!allowedTypes.includes(file.type)) {
      setError("Upload an ID proof in JPG, PNG, or PDF format.");
      event.target.value = "";
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("ID proof must be smaller than 5 MB.");
      event.target.value = "";
      return;
    }

    setIdProof(file);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!form.pickupDate || !form.returnDate) {
      setError("Please select pickup and return date/time.");
      return;
    }

    if (bookingDays <= 0) {
      setError("Return date and time must be after pickup.");
      return;
    }

    if (!form.location.trim() || !form.customerName.trim()) {
      setError("Location and customer name are required.");
      return;
    }

    if (!form.bookingFrom) {
      setError("Please select Booking From.");
      return;
    }

    if (!RENT_OPTIONS.includes(Number(form.rentPerDay))) {
      setError("Please select a valid rental rate.");
      return;
    }

    if (
      form.receivedAmount === "" ||
      !Number.isFinite(receivedAmount) ||
      receivedAmount < 0 ||
      receivedAmount > totalAmount
    ) {
      setError("Received amount must be between ₹0 and the total rent.");
      return;
    }

    setSaving(true);

    try {
      let proofPayload = null;

      if (idProof) {
        const base64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();

          reader.onload = () => {
            const result = String(reader.result || "");
            resolve(result.split(",")[1] || "");
          };

          reader.onerror = () =>
            reject(new Error("Unable to read ID proof."));
          reader.readAsDataURL(idProof);
        });

        proofPayload = {
          name: idProof.name,
          mimeType: idProof.type,
          data: base64,
        };
      }

      const result = await callAppsScript("saveBooking", {
        booking: {
          pickupDate: form.pickupDate,
          returnDate: form.returnDate,
          goingLocation: form.location.trim(),
          customerName: form.customerName.trim(),
          bookingFrom: form.bookingFrom,
          rentPerDay: Number(form.rentPerDay),
          createdById: getAdminUser()?.id || "",
          receivedAmount,
          idProof: proofPayload
            ? {
                name: proofPayload.name,
                type: proofPayload.mimeType,
                data: proofPayload.data,
              }
            : null,
        },
      });

      if (!result.success) {
        throw new Error(result.message || "Unable to save booking.");
      }

      setSuccess(`Booking saved successfully! Booking ID: ${result.bookingId}`);
      setBooked({
        bookingId: result.bookingId,
        customerName: form.customerName.trim(),
        pickupDate: form.pickupDate,
        returnDate: form.returnDate,
        bookingDays: result.bookingDays ?? bookingDays,
        goingLocation: form.location.trim(),
        bookingFrom:
          users.find((u) => u.id === form.bookingFrom)?.name ||
          result.bookingFromName ||
          "",
        rentPerDay: Number(form.rentPerDay),
        totalAmount: result.totalAmount ?? totalAmount,
        receivedAmount: result.receivedAmount ?? receivedAmount,
        securityDeposit: result.securityDeposit ?? SECURITY_DEPOSIT,
        pendingAmount: result.pendingAmount ?? pendingAmount,
        createdBy: result.createdBy || getAdminUser()?.name || "",
      });
      window.scrollTo({ top: 0, behavior: "smooth" });

      setForm({
        pickupDate: "",
        returnDate: "",
        location: "",
        customerName: "",
        bookingFrom: "",
        rentPerDay: "2000",
        receivedAmount: "",
      });

      setIdProof(null);

      const fileInput = document.getElementById("idProof");
      if (fileInput) fileInput.value = "";
    } catch (err) {
      console.error("Save booking error:", err);
      setError(err.message || "Unable to save booking.");
    } finally {
      setSaving(false);
    }
  }

  const inputClass =
    "mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-zinc-600 outline-none transition [color-scheme:dark] focus:border-amber-300/60 focus:ring-4 focus:ring-amber-300/10";
  const readOnlyClass = `${inputClass} cursor-not-allowed bg-white/[0.03]`;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#07080c] text-white">
      {booked && <SuccessModal data={booked} onClose={() => setBooked(null)} />}
      {saving && (
        <LoadingOverlay
          text={
            idProof
              ? "Uploading ID proof and saving booking..."
              : "Saving booking..."
          }
        />
      )}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-amber-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 top-1/3 h-[26rem] w-[26rem] rounded-full bg-sky-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-10">
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
              <h1 className="text-xl font-bold md:text-2xl">New booking</h1>
              <p className="text-xs text-zinc-500">
                Enter customer and rental details.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/admin/dashboard")}
            className="flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2 text-sm text-zinc-200 transition hover:border-amber-300/50 hover:bg-amber-400/10 hover:text-amber-200"
          >
            <ArrowLeft size={16} />
            Dashboard
          </button>
        </header>

        <form
          onSubmit={handleSubmit}
          className="mt-8 grid items-start gap-6 lg:grid-cols-[1fr_340px]"
        >
          {/* Left: form sections */}
          <div className="space-y-6">
            <Section
              icon={CalendarDays}
              title="Rental schedule"
              subtitle="When and where the car goes"
            >
              <Field label="Pickup date and time *" htmlFor="pickupDate">
                <input
                  id="pickupDate"
                  name="pickupDate"
                  type="datetime-local"
                  value={form.pickupDate}
                  onChange={updateField}
                  required
                  className={inputClass}
                />
              </Field>

              <Field label="Return date and time *" htmlFor="returnDate">
                <input
                  id="returnDate"
                  name="returnDate"
                  type="datetime-local"
                  value={form.returnDate}
                  min={form.pickupDate || undefined}
                  onChange={updateField}
                  required
                  className={inputClass}
                />
              </Field>

              <Field
                label="Booking days (auto-calculated)"
                htmlFor="bookingDays"
                hint="Any partial rental day is counted as one full day."
              >
                <input
                  id="bookingDays"
                  value={bookingDays}
                  readOnly
                  className={`${readOnlyClass} text-amber-300`}
                />
              </Field>

              <Field label="Going location *" htmlFor="location">
                <input
                  id="location"
                  name="location"
                  type="text"
                  value={form.location}
                  onChange={updateField}
                  placeholder="e.g. Mumbai to Satara"
                  required
                  className={inputClass}
                />
              </Field>
            </Section>

            <Section
              icon={UserRound}
              title="Customer details"
              subtitle="Who is renting the car"
            >
              <Field label="Customer name *" htmlFor="customerName">
                <input
                  id="customerName"
                  name="customerName"
                  type="text"
                  value={form.customerName}
                  onChange={updateField}
                  placeholder="Enter customer name"
                  required
                  className={inputClass}
                />
              </Field>

              <Field label="Booking from *" htmlFor="bookingFrom">
                <select
                  id="bookingFrom"
                  name="bookingFrom"
                  value={form.bookingFrom}
                  onChange={updateField}
                  required
                  disabled={loadingUsers}
                  className={inputClass}
                >
                  <option value="">
                    {loadingUsers ? "Loading users..." : "Select user"}
                  </option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </Field>

              <Field
                full
                label="Upload ID proof (optional – JPG, PNG, PDF)"
                htmlFor="idProof"
              >
                <label
                  htmlFor="idProof"
                  className="mt-2 flex cursor-pointer items-center gap-4 rounded-2xl border border-dashed border-amber-300/30 bg-black/30 px-4 py-5 transition hover:border-amber-300/70 hover:bg-amber-400/5"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-400/10 text-amber-300">
                    <Upload size={20} />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">
                      {idProof ? idProof.name : "Choose ID proof file"}
                    </p>
                    <p className="mt-1 text-xs text-zinc-500">
                      Maximum file size: 5 MB
                    </p>
                  </div>
                </label>
                <input
                  id="idProof"
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={handleFileChange}
                  className="sr-only"
                />
              </Field>
            </Section>

            <Section
              icon={IndianRupee}
              title="Rental charges"
              subtitle="Rate and payment received"
            >
              <Field label="Rent per day *" htmlFor="rentPerDay">
                <select
                  id="rentPerDay"
                  name="rentPerDay"
                  value={form.rentPerDay}
                  onChange={updateField}
                  className={inputClass}
                >
                  <option value="2000">₹2,000 per day</option>
                  <option value="2500">₹2,500 per day</option>
                </select>
              </Field>

              <Field label="Received amount (₹) *" htmlFor="receivedAmount">
                <input
                  id="receivedAmount"
                  name="receivedAmount"
                  type="number"
                  min="0"
                  max={totalAmount}
                  step="0.01"
                  value={form.receivedAmount}
                  onChange={updateField}
                  placeholder="Enter received amount"
                  required
                  className={inputClass}
                />
              </Field>
            </Section>
          </div>

          {/* Right: live summary */}
          <aside className="space-y-4 lg:sticky lg:top-6">
            <div className="relative overflow-hidden rounded-3xl border border-amber-300/30 bg-gradient-to-br from-amber-400/15 via-white/[0.03] to-transparent p-6 backdrop-blur-xl">
              <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-amber-400/20 blur-3xl" />
              <p className="text-sm text-zinc-300">Booking summary</p>
              <p className="mt-1 text-4xl font-bold tracking-tight">
                {formatINR(totalAmount)}
              </p>
              <p className="text-xs text-zinc-500">Total rent</p>

              <div className="mt-5 divide-y divide-white/10 border-t border-white/10">
                <SummaryRow
                  label="Booking days"
                  value={bookingDays}
                  valueClass="text-amber-300"
                />
                <SummaryRow
                  label="Rate per day"
                  value={formatINR(Number(form.rentPerDay))}
                />
                <SummaryRow
                  label="Received"
                  value={formatINR(receivedAmount)}
                />
                <SummaryRow
                  label="Pending"
                  value={formatINR(pendingAmount)}
                  valueClass={
                    pendingAmount > 0 ? "text-red-400" : "text-emerald-400"
                  }
                />
                <SummaryRow
                  label="Security deposit"
                  value={formatINR(SECURITY_DEPOSIT)}
                  valueClass="text-zinc-300"
                />
              </div>

              <p className="mt-3 text-xs text-zinc-500">
                Pending = total rent − received amount. The security deposit is
                recorded separately.
              </p>
            </div>

            {error && (
              <p
                role="alert"
                className="flex items-start gap-2 rounded-2xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300"
              >
                <AlertCircle size={18} className="mt-0.5 shrink-0" />
                {error}
              </p>
            )}

            {success && (
              <p
                role="status"
                className="flex items-start gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-300"
              >
                <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                {success}
              </p>
            )}

            <button
              type="submit"
              disabled={saving || loadingUsers}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-300 to-amber-500 px-8 py-4 font-bold text-black shadow-lg shadow-amber-500/25 transition hover:scale-[1.02] hover:shadow-amber-400/40 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
            >
              {saving ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <IndianRupee size={18} />
              )}
              {saving ? "Saving booking..." : "Save booking"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/admin/dashboard")}
              className="w-full rounded-2xl border border-white/15 px-8 py-3 text-zinc-300 transition hover:bg-white/5"
            >
              Cancel
            </button>
          </aside>
        </form>
      </div>
    </div>
  );
}