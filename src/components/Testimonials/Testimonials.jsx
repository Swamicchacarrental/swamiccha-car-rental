import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import SectionTitle from "../Common/SectionTitle";

const testimonials = [
  {
    name: "Rahul Sharma",
    location: "Mumbai",
    review:
      "Excellent service. The vehicle was clean, comfortable and arrived exactly on time. Highly recommended.",
    rating: 5,
  },
  {
    name: "Priya Patel",
    location: "Navi Mumbai",
    review:
      "Very professional driver and transparent pricing. Booking through WhatsApp was quick and easy.",
    rating: 5,
  },
  {
    name: "Amit Verma",
    location: "Panvel",
    review:
      "Comfortable Ertiga for our family trip. The whole experience was smooth from pickup to drop.",
    rating: 5,
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const previous = () =>
    setCurrent((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );

  const next = () =>
    setCurrent((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );

  return (
    <section id="testimonials" className="bg-black py-28">
      <div className="mx-auto max-w-5xl px-6">

        <SectionTitle
          subtitle="Testimonials"
          title="What Our Customers Say"
        />

        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl">

          <AnimatePresence mode="wait">

            <motion.div
              key={current}
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.4 }}
            >

              <div className="mb-6 flex justify-center">
                {[...Array(testimonials[current].rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={22}
                    className="fill-yellow-500 text-yellow-500"
                  />
                ))}
              </div>

              <p className="text-center text-xl leading-9 text-gray-300">
                "{testimonials[current].review}"
              </p>

              <div className="mt-10 text-center">
                <h3 className="text-2xl font-bold text-white">
                  {testimonials[current].name}
                </h3>

                <p className="text-yellow-500">
                  {testimonials[current].location}
                </p>
              </div>

            </motion.div>

          </AnimatePresence>

          <button
            onClick={previous}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-yellow-500 hover:text-black"
          >
            <ChevronLeft />
          </button>

          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-yellow-500 hover:text-black"
          >
            <ChevronRight />
          </button>

        </div>

      </div>
    </section>
  );
}