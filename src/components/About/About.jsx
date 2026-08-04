import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Users, Car, MapPin, Timer } from "lucide-react";

function Counter({ end, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [start, setStart] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStart(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!start) return;

    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const progress = Math.min((timestamp - startTime) / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [start, end, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const stats = [
  {
    icon: Users,
    end: 500,
    suffix: "+",
    title: "Happy Customers",
  },
  {
    icon: Car,
    end: 1000,
    suffix: "+",
    title: "Trips Completed",
  },
  {
    icon: MapPin,
    end: 4,
    suffix: "+",
    title: "Cities Covered",
  },
  {
    icon: Timer,
    end: 24,
    suffix: "×7",
    title: "Support",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#050505] py-28"
    >
      {/* Background Glow */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,179,8,.08),transparent_65%)]" />

      <div className="relative mx-auto max-w-6xl px-6 text-center">

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4 text-sm font-semibold uppercase tracking-[8px] text-yellow-400"
        >
          ABOUT US
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl font-black leading-tight text-white md:text-6xl"
        >
          Your Trusted
          <span className="block text-yellow-400">
            Travel Partner
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-gray-300"
        >
          <span className="font-semibold text-yellow-400">
            SWAMICCHA CAR RENTAL
          </span>{" "}
          provides premium self-drive and chauffeur-driven car rental
          services across Mumbai, Navi Mumbai, Thane and Panvel.

          We believe every journey should be comfortable, safe and
          stress-free, whether you're travelling for business, family,
          airport transfers or outstation trips.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto mt-6 max-w-3xl text-lg leading-9 text-gray-400"
        >
          Our commitment to punctual service, transparent pricing,
          professionally maintained vehicles and customer satisfaction
          makes us a trusted travel partner for every journey.
        </motion.p>

        <div className="mx-auto mt-16 h-px w-32 bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />

        {/* Counters */}

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {stats.map((item) => (
            <motion.div
              key={item.title}
              whileHover={{
                y: -8,
              }}
              className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md"
            >
              <item.icon
                size={42}
                className="mx-auto mb-5 text-yellow-400"
              />

              <h3 className="text-5xl font-black text-white">
                <Counter
                  end={item.end}
                  suffix={item.suffix}
                />
              </h3>

              <p className="mt-3 text-gray-400">
                {item.title}
              </p>

            </motion.div>
          ))}

        </div>

        <div className="mx-auto mt-16 h-px w-32 bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />

        

      </div>
    </section>
  );
}