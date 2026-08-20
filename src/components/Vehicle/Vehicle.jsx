import { motion } from "framer-motion";
import {
  CarFront,
  Users,
  Fuel,
  BadgeIndianRupee,
  ArrowRight,
} from "lucide-react";

import SectionTitle from "../Common/SectionTitle";
import Button from "../Common/Button";

const vehicles = [
  {
    name: "Wagon R",
    category: "Hatchback",
    seats: "5 Seater",
    price: "Price on request",
    description:
      "A practical and comfortable hatchback, ideal for city travel, daily use and short trips.",
  },
  {
    name: "Ertiga CNG",
    category: "7 Seater",
    seats: "7 Seater",
    price: "₹3,000/day",
    description:
      "A spacious and economical 7-seater designed for comfortable family and group travel.",
  },
  {
    name: "Ertiga Diesel",
    category: "7 Seater",
    seats: "7 Seater",
    price: "₹2,500/day",
    description:
      "A reliable and comfortable 7-seater suitable for city travel, airport transfers and outstation journeys.",
  },
  {
    name: "Innova",
    category: "Premium 7 Seater",
    seats: "7 Seater",
    price: "₹4,000/day",
    description:
      "A premium MPV offering excellent space and comfort for family trips, business travel and long journeys.",
  },
  {
    name: "Innova Crysta",
    category: "Premium 7 Seater",
    seats: "7 Seater",
    price: "₹5,500/day",
    description:
      "Our premium choice for customers looking for superior comfort, spacious seating and a refined travel experience.",
  },
];

export default function Vehicle() {
  return (
    <section
      id="vehicle"
      className="relative overflow-hidden bg-[#050505] py-24 md:py-28"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-yellow-500/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <SectionTitle
            subtitle="Our Fleet"
            title="Choose Your Perfect Ride"
          />

          <p className="mx-auto mt-6 max-w-2xl text-center text-base leading-8 text-gray-400 md:text-lg">
            From practical city cars to premium 7-seater vehicles, choose
            the right car for your journey with Swamiccha Car Rental.
          </p>
        </motion.div>

        {/* Fleet Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {vehicles.map((vehicle, index) => (
            <motion.article
              key={vehicle.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
              }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="
                group
                relative
                flex
                min-h-[360px]
                flex-col
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-white/[0.035]
                p-7
                transition-all
                duration-300
                hover:border-yellow-500/40
                hover:bg-white/[0.055]
              "
            >
              {/* Top Glow */}
              <div
                className="
                  pointer-events-none
                  absolute
                  -right-20
                  -top-20
                  h-40
                  w-40
                  rounded-full
                  bg-yellow-500/10
                  blur-3xl
                  transition
                  duration-500
                  group-hover:bg-yellow-500/20
                "
              />

              {/* Icon */}
              <div
                className="
                  relative
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-yellow-500/20
                  bg-yellow-500/10
                  text-yellow-400
                  transition-all
                  duration-300
                  group-hover:border-yellow-500/40
                  group-hover:bg-yellow-500/15
                "
              >
                <CarFront size={28} />
              </div>

              {/* Category */}
              <p className="relative mt-7 text-xs font-semibold uppercase tracking-[3px] text-yellow-500">
                {vehicle.category}
              </p>

              {/* Vehicle Name */}
              <h3 className="relative mt-3 text-3xl font-bold text-white">
                {vehicle.name}
              </h3>

              {/* Description */}
              <p className="relative mt-4 flex-1 text-sm leading-7 text-gray-400">
                {vehicle.description}
              </p>

              {/* Details */}
              <div className="relative mt-6 flex items-center gap-5 border-t border-white/10 pt-5">

                <div className="flex items-center gap-2 text-gray-300">
                  <Users size={17} className="text-yellow-500" />
                  <span className="text-sm">
                    {vehicle.seats}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-gray-300">
                  <BadgeIndianRupee
                    size={17}
                    className="text-yellow-500"
                  />

                  <span className="text-sm font-medium">
                    {vehicle.price}
                  </span>
                </div>

              </div>

              {/* Button */}
              <div className="relative mt-6">
                <Button href="#booking">
                  Book This Car
                </Button>
              </div>
            </motion.article>
          ))}

        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-14 flex flex-col items-center justify-center text-center"
        >
          <p className="text-gray-400">
            Not sure which vehicle is right for you?
          </p>

          <a
            href="#booking"
            className="
              mt-4
              inline-flex
              items-center
              gap-2
              text-sm
              font-semibold
              text-yellow-400
              transition
              hover:text-yellow-300
            "
          >
            Talk to us and choose the right vehicle
            <ArrowRight size={17} />
          </a>
        </motion.div>

      </div>
    </section>
  );
}