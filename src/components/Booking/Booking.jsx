import { useState } from "react";
import SectionTitle from "../Common/SectionTitle";

export default function Booking() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    pickup: "",
    drop: "",
    date: "",
    time: "",
    tripType: "One Way",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const sendWhatsApp = (e) => {
    e.preventDefault();

    if (!form.name || !form.phone || !form.pickup || !form.drop) {
      alert("Please fill all required fields.");
      return;
    }

    const text = `
🚗 *SWAMICCHA CAR RENTAL*

*Booking Request*

👤 Name: ${form.name}
📞 Phone: ${form.phone}

📍 Pickup: ${form.pickup}
📍 Drop: ${form.drop}

📅 Date: ${form.date}
⏰ Time: ${form.time}

🚘 Trip Type: ${form.tripType}

📝 Message:
${form.message}
`;

    const phone = "919768887212"; // Replace with your WhatsApp number

    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  return (
    <section id="booking" className="bg-black py-28">
      <div className="mx-auto max-w-5xl px-6">

        <SectionTitle
          subtitle="Book Now"
          title="Reserve Your Ride"
        />

        <form
          onSubmit={sendWhatsApp}
          className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl"
        >

          <div className="grid gap-6 md:grid-cols-2">

            <input
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className="rounded-xl bg-black/40 p-4 text-white"
            />

            <input
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
              className="rounded-xl bg-black/40 p-4 text-white"
            />

          </div>

          <div className="grid gap-6 md:grid-cols-2">

            <input
              name="pickup"
              placeholder="Pickup Location"
              onChange={handleChange}
              className="rounded-xl bg-black/40 p-4 text-white"
            />

            <input
              name="drop"
              placeholder="Drop Location"
              onChange={handleChange}
              className="rounded-xl bg-black/40 p-4 text-white"
            />

          </div>

          <div className="grid gap-6 md:grid-cols-2">

            <input
              type="date"
              name="date"
              onChange={handleChange}
              className="rounded-xl bg-black/40 p-4 text-white"
            />

            <input
              type="time"
              name="time"
              onChange={handleChange}
              className="rounded-xl bg-black/40 p-4 text-white"
            />

          </div>

          <select
            name="tripType"
            onChange={handleChange}
            className="w-full rounded-xl bg-black/40 p-4 text-white"
          >
            <option>One Way</option>
            <option>Round Trip</option>
            <option>Airport Pickup</option>
            <option>Outstation</option>
          </select>

          <textarea
            rows="5"
            name="message"
            placeholder="Additional Requirements"
            onChange={handleChange}
            className="w-full rounded-xl bg-black/40 p-4 text-white"
          />

          <button
            type="submit"
            className="rounded-full bg-yellow-500 px-8 py-4 font-semibold text-black transition hover:bg-yellow-400"
          >
            Send via WhatsApp
          </button>

        </form>

      </div>
    </section>
  );
}