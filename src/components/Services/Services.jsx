import { motion } from "framer-motion";
import {
  Car,
  ShieldCheck,
  MapPinned,
  Users,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const services = [
  {
    icon: Car,
    title: "Self Drive Rental",
    desc: "Enjoy complete freedom with our premium, well-maintained Maruti Suzuki Ertiga for local and outstation travel.",
  },
  {
    icon: ShieldCheck,
    title: "Chauffeur Service",
    desc: "Travel comfortably with experienced drivers who ensure a safe, punctual and hassle-free journey.",
  },
  {
    icon: MapPinned,
    title: "Outstation Trips",
    desc: "Weekend getaways, business travel or long-distance tours with comfortable and reliable transportation.",
  },
  {
    icon: Users,
    title: "Family Travel",
    desc: "Spacious 7-seater perfect for family vacations, airport transfers and group travel.",
  },
];

const highlights = [
  "Clean & Sanitized Vehicles",
  "24×7 Customer Support",
  "Transparent Pricing",
  "Professional Service",
];

export default function Services() {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#050505] py-28"
    >
      {/* Background Glow */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,179,8,.08),transparent_65%)]" />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[8px] text-yellow-400">
            OUR SERVICES
          </p>

          <h2 className="text-5xl font-black text-white md:text-6xl">
            Premium Travel
            <span className="block text-yellow-400">
              Solutions
            </span>
          </h2>

          <p className="mt-8 text-lg leading-8 text-gray-400">
            Whether you need a self-drive vehicle, chauffeur service,
            airport transfer or an outstation trip, we provide reliable,
            comfortable and affordable travel tailored to your needs.
          </p>
        </motion.div>

        {/* Services */}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          {services.map((service, index) => {
  const Icon = service.icon;

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15 }}
      viewport={{ once: true }}
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      className="
        group
        rounded-2xl
        border
        border-white/10
        bg-white/5
        p-6
        backdrop-blur-md
        transition-all
        duration-300
        hover:border-yellow-500/40
        hover:bg-white/10
      "
    >
      {/* Icon */}

      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-yellow-500/10 transition-all duration-300 group-hover:bg-yellow-500">
        <Icon
          size={28}
          className="text-yellow-400 group-hover:text-black"
        />
      </div>

      {/* Title */}

      <h3 className="text-2xl font-bold text-white">
        {service.title}
      </h3>

      {/* Description */}

      <p className="mt-4 text-sm leading-7 text-gray-400">
        {service.desc}
      </p>

      {/* Divider */}

      <div className="mt-6 h-px w-12 bg-yellow-500 transition-all duration-300 group-hover:w-20" />
    </motion.div>
  );
})}

        </div>

        {/* Highlights */}

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="mt-20 rounded-3xl border border-white/10 bg-white/5 p-8"
        >
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

            {highlights.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3"
              >
                <CheckCircle2
                  size={22}
                  className="text-yellow-400"
                />

                <span className="font-medium text-white">
                  {item}
                </span>
              </div>
            ))}

          </div>
        </motion.div>

      </div>
    </section>
  );
}