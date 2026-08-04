import { motion } from "framer-motion";
import Button from "../Common/Button";
import SectionTitle from "../Common/SectionTitle";
import ertiga from "../../assets/images/ertiga.png";
import siteData from "../../data/siteData";

export default function Vehicle() {
  const vehicle = siteData.vehicle;

  const specs = [
    { label: "Fuel", value: vehicle.fuel },
    { label: "Transmission", value: vehicle.transmission },
    { label: "Seats", value: vehicle.seats },
    { label: "Colour", value: vehicle.color },
  ];

  return (
    <section
      id="vehicle"
      className="bg-[#050505] py-28"
    >
      <div className="mx-auto max-w-7xl px-6">

        <SectionTitle
          subtitle="Premium Vehicle"
          title={vehicle.name}
        />

        <div className="grid items-center gap-16 lg:grid-cols-2">

          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: .8 }}
            viewport={{ once: true }}
          >
            <img
              src={ertiga}
              alt={vehicle.name}
              className="w-full rounded-3xl shadow-2xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: .8 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-8 text-4xl font-bold text-white">
              Luxury Meets Comfort
            </h3>

            <p className="mb-10 text-lg leading-8 text-gray-400">
              Spacious seating, powerful diesel engine and comfortable ride
              make our Ertiga perfect for family trips, airport transfers,
              outstation journeys and business travel.
            </p>

            <div className="grid grid-cols-2 gap-5">

              {specs.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl"
                >
                  <h4 className="text-sm uppercase tracking-widest text-yellow-500">
                    {item.label}
                  </h4>

                  <p className="mt-2 text-lg font-semibold text-white">
                    {item.value}
                  </p>
                </div>
              ))}

            </div>

            <div className="mt-10">
              <Button href="#booking">
                Book This Vehicle
              </Button>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}