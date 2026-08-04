import { motion } from "framer-motion";
import {
  ShieldCheck,
  Car,
  Clock3,
  Users,
  BadgeIndianRupee,
  Sparkles,
} from "lucide-react";
import SectionTitle from "../Common/SectionTitle";
import GlassCard from "../Common/GlassCard";

const features = [
  {
    icon: ShieldCheck,
    title: "Trusted Service",
    description: "Professional, reliable and customer-first service."
  },
  {
    icon: Sparkles,
    title: "Clean Vehicle",
    description: "Well maintained and sanitized before every trip."
  },
  {
    icon: BadgeIndianRupee,
    title: "Transparent Pricing",
    description: "No hidden charges. Honest and fair pricing."
  },
  {
    icon: Clock3,
    title: "On-Time Pickup",
    description: "We value your time and ensure punctual service."
  },
  {
    icon: Users,
    title: "Family Friendly",
    description: "Comfortable 7-seater ideal for family travel."
  },
  {
    icon: Car,
    title: "Premium Experience",
    description: "Enjoy every journey in our well-maintained Ertiga."
  },
];

export default function WhyChoose() {
  return (
    <section id="why" className="bg-black py-28">
      <div className="mx-auto max-w-7xl px-6">

        <SectionTitle
          subtitle="Why Choose Us"
          title="Travel with Confidence"
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
              >
                <GlassCard>

                  <Icon
                    size={42}
                    className="mb-6 text-yellow-500"
                  />

                  <h3 className="mb-3 text-2xl font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="leading-7 text-gray-400">
                    {item.description}
                  </p>

                </GlassCard>
              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
}