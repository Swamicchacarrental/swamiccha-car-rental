import { useState } from "react";
import {
  Car,
  UserRound,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  CalendarDays,
  Clock3,
  MapPin,
  Phone,
  User,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SectionTitle from "../Common/SectionTitle";

const cars = [
  {
    id: "wagon-r",
    name: "Wagon R",
    type: "Hatchback",
    selfDrivePrice: null,
    driverRate: null,
  },
  {
    id: "ertiga-cng",
    name: "Ertiga CNG",
    type: "7 Seater",
    selfDrivePrice: 3000,
    driverRate: 16,
  },
  {
    id: "ertiga-diesel",
    name: "Ertiga Diesel",
    type: "7 Seater",
    selfDrivePrice: 2500,
    driverRate: 16,
  },
  {
    id: "innova",
    name: "Innova",
    type: "Premium 7 Seater",
    selfDrivePrice: 4000,
    driverRate: 20,
  },
  {
    id: "crysta",
    name: "Innova Crysta",
    type: "Premium 7 Seater",
    selfDrivePrice: 5500,
    driverRate: 24,
  },
];

const services = [
  {
    id: "self-drive",
    title: "Self Drive",
    description: "Drive the vehicle yourself and enjoy complete freedom.",
    icon: Car,
  },
  {
    id: "with-driver",
    title: "With Driver",
    description: "Travel comfortably with an experienced driver.",
    icon: UserRound,
  },
];

export default function Booking() {
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    car: "",
    service: "",
    name: "",
    phone: "",
    pickup: "",
    drop: "",
    date: "",
    time: "",
    tripType: "One Way",
    message: "",
  });

  const selectedCar = cars.find((car) => car.id === form.car);
  const selectedService = services.find(
    (service) => service.id === form.service
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const selectCar = (carId) => {
    setForm((prev) => ({
      ...prev,
      car: carId,
    }));
  };

  const selectService = (serviceId) => {
    setForm((prev) => ({
      ...prev,
      service: serviceId,
    }));
  };

  const nextStep = () => {
    if (step === 1 && !form.car) {
      alert("Please select a car.");
      return;
    }

    if (step === 2 && !form.service) {
      alert("Please select Self Drive or With Driver.");
      return;
    }

    setStep((prev) => Math.min(prev + 1, 3));
  };

  const previousStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const sendWhatsApp = (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.phone ||
      !form.pickup ||
      !form.drop ||
      !form.date ||
      !form.time
    ) {
      alert("Please fill all required fields.");
      return;
    }

    let pricingText = "";

    if (selectedService?.id === "self-drive") {
      if (selectedCar?.selfDrivePrice) {
        pricingText = `
💰 Self Drive Rate: ₹${selectedCar.selfDrivePrice.toLocaleString("en-IN")} / Day
📏 Daily Package: 300 KM
⛽ Fuel: Customer
🅿️ Toll & Parking: Customer
💵 Security Deposit: ₹3,000`;
      } else {
        pricingText = `
💰 Self Drive Rate: Price on Request`;
      }
    }

    if (selectedService?.id === "with-driver") {
      if (selectedCar?.driverRate) {
        pricingText = `
💰 Rate: ₹${selectedCar.driverRate} / KM
📏 Daily Package: 300 KM
👨‍✈️ Driver Allowance: ₹400 / Day
🅿️ Toll & Parking: Customer`;
      } else {
        pricingText = `
💰 Rate: Price on Request`;
      }
    }

    const text = `
🚗 *SWAMICCHA CAR RENTAL*

*NEW BOOKING REQUEST*

━━━━━━━━━━━━━━━━━━
🚘 *VEHICLE*
━━━━━━━━━━━━━━━━━━

Car: ${selectedCar?.name || "Not selected"}
Service: ${selectedService?.title || "Not selected"}

${pricingText}

━━━━━━━━━━━━━━━━━━
👤 *CUSTOMER DETAILS*
━━━━━━━━━━━━━━━━━━

Name: ${form.name}
Phone: ${form.phone}

━━━━━━━━━━━━━━━━━━
📍 *JOURNEY DETAILS*
━━━━━━━━━━━━━━━━━━

Pickup: ${form.pickup}
Drop: ${form.drop}

Date: ${form.date}
Time: ${form.time}

Trip Type: ${form.tripType}

━━━━━━━━━━━━━━━━━━
📝 *ADDITIONAL REQUIREMENTS*
━━━━━━━━━━━━━━━━━━

${form.message || "None"}

Thank you.
Swamiccha Car Rental
`;

    const whatsappNumber = "919768887212";

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  return (
    <section
      id="booking"
      className="relative overflow-hidden bg-[#050505] py-24 md:py-28"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-yellow-500/5 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionTitle
          subtitle="Book Your Ride"
          title="Choose Your Journey"
        />

        {/* Progress */}
        <div className="mx-auto mb-12 max-w-3xl">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((item, index) => (
              <div
                key={item}
                className="flex flex-1 items-center"
              >
                <div className="flex flex-col items-center">
                  <motion.div
                    animate={{
                      scale: step === item ? 1.08 : 1,
                    }}
                    className={`flex h-11 w-11 items-center justify-center rounded-full border-2 font-semibold transition-all ${
                      step >= item
                        ? "border-yellow-500 bg-yellow-500 text-black"
                        : "border-white/20 bg-white/5 text-gray-500"
                    }`}
                  >
                    {step > item ? (
                      <CheckCircle2 size={22} />
                    ) : (
                      item
                    )}
                  </motion.div>

                  <span
                    className={`mt-2 hidden text-xs font-medium sm:block ${
                      step >= item
                        ? "text-yellow-500"
                        : "text-gray-500"
                    }`}
                  >
                    {item === 1
                      ? "Select Car"
                      : item === 2
                      ? "Service"
                      : "Your Details"}
                  </span>
                </div>

                {index < 2 && (
                  <div
                    className={`mx-3 h-[2px] flex-1 transition-all ${
                      step > item
                        ? "bg-yellow-500"
                        : "bg-white/10"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-2xl backdrop-blur-xl md:p-10">
          <AnimatePresence mode="wait">
            {/* ================================================= */}
            {/* STEP 1 */}
            {/* ================================================= */}

            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8">
                  <p className="mb-2 text-sm font-semibold uppercase tracking-[4px] text-yellow-500">
                    Step 1
                  </p>

                  <h3 className="text-3xl font-bold text-white md:text-4xl">
                    Select Your Car
                  </h3>

                  <p className="mt-3 text-gray-400">
                    Choose the vehicle that best suits your journey.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {cars.map((car) => {
                    const selected = form.car === car.id;

                    return (
                      <motion.button
                        type="button"
                        key={car.id}
                        whileHover={{ y: -4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => selectCar(car.id)}
                        className={`relative overflow-hidden rounded-2xl border p-6 text-left transition-all ${
                          selected
                            ? "border-yellow-500 bg-yellow-500/10 shadow-lg shadow-yellow-500/10"
                            : "border-white/10 bg-black/30 hover:border-yellow-500/40 hover:bg-white/[0.04]"
                        }`}
                      >
                        {selected && (
                          <div className="absolute right-4 top-4">
                            <CheckCircle2
                              size={22}
                              className="text-yellow-500"
                            />
                          </div>
                        )}

                        <div
                          className={`mb-5 flex h-14 w-14 items-center justify-center rounded-xl ${
                            selected
                              ? "bg-yellow-500 text-black"
                              : "bg-yellow-500/10 text-yellow-500"
                          }`}
                        >
                          <Car size={28} />
                        </div>

                        <h4 className="text-xl font-bold text-white">
                          {car.name}
                        </h4>

                        <p className="mt-1 text-sm text-gray-500">
                          {car.type}
                        </p>

                        <div className="mt-5 border-t border-white/10 pt-4">
                          {car.selfDrivePrice ? (
                            <p className="text-sm text-gray-400">
                              Self Drive{" "}
                              <span className="font-semibold text-yellow-500">
                                ₹
                                {car.selfDrivePrice.toLocaleString(
                                  "en-IN"
                                )}
                                /day
                              </span>
                            </p>
                          ) : (
                            <p className="text-sm text-yellow-500">
                              Price on request
                            </p>
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center gap-2 rounded-full bg-yellow-500 px-7 py-3.5 font-semibold text-black transition hover:bg-yellow-400"
                  >
                    Continue
                    <ArrowRight size={19} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ================================================= */}
            {/* STEP 2 */}
            {/* ================================================= */}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8">
                  <p className="mb-2 text-sm font-semibold uppercase tracking-[4px] text-yellow-500">
                    Step 2
                  </p>

                  <h3 className="text-3xl font-bold text-white md:text-4xl">
                    Choose Your Service
                  </h3>

                  <p className="mt-3 text-gray-400">
                    Selected vehicle:{" "}
                    <span className="font-semibold text-white">
                      {selectedCar?.name}
                    </span>
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {services.map((service) => {
                    const Icon = service.icon;
                    const selected =
                      form.service === service.id;

                    return (
                      <motion.button
                        type="button"
                        key={service.id}
                        whileHover={{ y: -5 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() =>
                          selectService(service.id)
                        }
                        className={`relative rounded-3xl border p-8 text-left transition-all ${
                          selected
                            ? "border-yellow-500 bg-yellow-500/10 shadow-xl shadow-yellow-500/10"
                            : "border-white/10 bg-black/30 hover:border-yellow-500/40"
                        }`}
                      >
                        {selected && (
                          <div className="absolute right-6 top-6">
                            <CheckCircle2
                              size={24}
                              className="text-yellow-500"
                            />
                          </div>
                        )}

                        <div
                          className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${
                            selected
                              ? "bg-yellow-500 text-black"
                              : "bg-yellow-500/10 text-yellow-500"
                          }`}
                        >
                          <Icon size={32} />
                        </div>

                        <h4 className="text-2xl font-bold text-white">
                          {service.title}
                        </h4>

                        <p className="mt-3 leading-7 text-gray-400">
                          {service.description}
                        </p>

                        <div className="mt-6 border-t border-white/10 pt-5">
                          {service.id === "self-drive" ? (
                            <>
                              <p className="font-semibold text-yellow-500">
                                {selectedCar?.selfDrivePrice
                                  ? `₹${selectedCar.selfDrivePrice.toLocaleString(
                                      "en-IN"
                                    )} / Day`
                                  : "Price on Request"}
                              </p>

                              <p className="mt-2 text-sm text-gray-500">
                                300 KM per day • Fuel, toll &
                                parking by customer
                              </p>
                            </>
                          ) : (
                            <>
                              <p className="font-semibold text-yellow-500">
                                {selectedCar?.driverRate
                                  ? `₹${selectedCar.driverRate} / KM`
                                  : "Price on Request"}
                              </p>

                              <p className="mt-2 text-sm text-gray-500">
                                300 KM/day package • ₹400 driver
                                allowance/day
                              </p>
                            </>
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                <div className="mt-8 flex justify-between">
                  <button
                    type="button"
                    onClick={previousStep}
                    className="flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 font-semibold text-white transition hover:border-yellow-500 hover:text-yellow-500"
                  >
                    <ArrowLeft size={19} />
                    Back
                  </button>

                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center gap-2 rounded-full bg-yellow-500 px-7 py-3.5 font-semibold text-black transition hover:bg-yellow-400"
                  >
                    Continue
                    <ArrowRight size={19} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ================================================= */}
            {/* STEP 3 */}
            {/* ================================================= */}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8">
                  <p className="mb-2 text-sm font-semibold uppercase tracking-[4px] text-yellow-500">
                    Step 3
                  </p>

                  <h3 className="text-3xl font-bold text-white md:text-4xl">
                    Your Journey Details
                  </h3>

                  <p className="mt-3 text-gray-400">
                    Complete your details and send the booking
                    request.
                  </p>
                </div>

                {/* Selected Summary */}
                <div className="mb-8 grid gap-4 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-5 sm:grid-cols-3">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-500">
                      Vehicle
                    </p>
                    <p className="mt-1 font-semibold text-white">
                      {selectedCar?.name}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-500">
                      Service
                    </p>
                    <p className="mt-1 font-semibold text-white">
                      {selectedService?.title}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-500">
                      Rate
                    </p>
                    <p className="mt-1 font-semibold text-yellow-500">
                      {selectedService?.id === "self-drive"
                        ? selectedCar?.selfDrivePrice
                          ? `₹${selectedCar.selfDrivePrice.toLocaleString(
                              "en-IN"
                            )}/day`
                          : "On Request"
                        : selectedCar?.driverRate
                        ? `₹${selectedCar.driverRate}/km`
                        : "On Request"}
                    </p>
                  </div>
                </div>

                <form
                  onSubmit={sendWhatsApp}
                  className="space-y-6"
                >
                  {/* Customer */}
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-300">
                        Full Name *
                      </label>

                      <div className="relative">
                        <User
                          size={19}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                        />

                        <input
                          required
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Enter your name"
                          className="w-full rounded-xl border border-white/10 bg-black/40 py-4 pl-12 pr-4 text-white outline-none transition placeholder:text-gray-600 focus:border-yellow-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-300">
                        Phone Number *
                      </label>

                      <div className="relative">
                        <Phone
                          size={19}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                        />

                        <input
                          required
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="Enter phone number"
                          className="w-full rounded-xl border border-white/10 bg-black/40 py-4 pl-12 pr-4 text-white outline-none transition placeholder:text-gray-600 focus:border-yellow-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Locations */}
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-300">
                        Pickup Location *
                      </label>

                      <div className="relative">
                        <MapPin
                          size={19}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                        />

                        <input
                          required
                          name="pickup"
                          value={form.pickup}
                          onChange={handleChange}
                          placeholder="Pickup location"
                          className="w-full rounded-xl border border-white/10 bg-black/40 py-4 pl-12 pr-4 text-white outline-none transition placeholder:text-gray-600 focus:border-yellow-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-300">
                        Drop Location *
                      </label>

                      <div className="relative">
                        <MapPin
                          size={19}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                        />

                        <input
                          required
                          name="drop"
                          value={form.drop}
                          onChange={handleChange}
                          placeholder="Drop location"
                          className="w-full rounded-xl border border-white/10 bg-black/40 py-4 pl-12 pr-4 text-white outline-none transition placeholder:text-gray-600 focus:border-yellow-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Date / Time */}
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-300">
                        Pickup Date *
                      </label>

                      <div className="relative">
                        <CalendarDays
                          size={19}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                        />

                        <input
                          required
                          type="date"
                          name="date"
                          value={form.date}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-white/10 bg-black/40 py-4 pl-12 pr-4 text-white outline-none focus:border-yellow-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-300">
                        Pickup Time *
                      </label>

                      <div className="relative">
                        <Clock3
                          size={19}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                        />

                        <input
                          required
                          type="time"
                          name="time"
                          value={form.time}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-white/10 bg-black/40 py-4 pl-12 pr-4 text-white outline-none focus:border-yellow-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Trip Type */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-300">
                      Trip Type
                    </label>

                    <select
                      name="tripType"
                      value={form.tripType}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-white/10 bg-black/40 p-4 text-white outline-none focus:border-yellow-500"
                    >
                      <option>One Way</option>
                      <option>Round Trip</option>
                      <option>Airport Pickup</option>
                      <option>Outstation</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-300">
                      Additional Requirements
                    </label>

                    <div className="relative">
                      <MessageSquare
                        size={19}
                        className="absolute left-4 top-5 text-gray-500"
                      />

                      <textarea
                        rows="4"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Any special requirements?"
                        className="w-full resize-none rounded-xl border border-white/10 bg-black/40 p-4 pl-12 text-white outline-none transition placeholder:text-gray-600 focus:border-yellow-500"
                      />
                    </div>
                  </div>

                  {/* Information */}
                  <div className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                    <ShieldCheck
                      size={21}
                      className="mt-0.5 shrink-0 text-yellow-500"
                    />

                    <p className="text-sm leading-6 text-gray-500">
                      Your booking request will be sent directly to
                      Swamiccha Car Rental through WhatsApp. Final
                      availability and pricing will be confirmed by
                      our team.
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col-reverse gap-4 pt-2 sm:flex-row sm:justify-between">
                    <button
                      type="button"
                      onClick={previousStep}
                      className="flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3.5 font-semibold text-white transition hover:border-yellow-500 hover:text-yellow-500"
                    >
                      <ArrowLeft size={19} />
                      Back
                    </button>

                    <button
                      type="submit"
                      className="flex items-center justify-center gap-2 rounded-full bg-yellow-500 px-8 py-3.5 font-bold text-black shadow-lg shadow-yellow-500/20 transition hover:bg-yellow-400 hover:shadow-yellow-500/30"
                    >
                      Send Booking via WhatsApp
                      <ArrowRight size={19} />
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}