import { motion } from "framer-motion";
import {
  ChevronDown,
  Car,
  Users,
  MapPinned,
  ShieldCheck,
  Phone,
} from "lucide-react";

import heroVideo from "../../assets/videos/hero.mp4";
import siteData from "../../data/siteData";
import Button from "../Common/Button";



export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden"
    >
      {/* Background Video */}

      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* Overlay */}

      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/45" />

      {/* Gold Glow */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_40%,rgba(234,179,8,.18),transparent_45%)]" />

      {/* Hero Content */}

      <div className="relative z-10 flex min-h-screen items-center pt-24 lg:pt-28">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-[620px]"
          >
            {/* Small Heading */}

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6 uppercase tracking-[8px] text-yellow-400 text-sm font-semibold"
            >
              PREMIUM CAR RENTAL
            </motion.p>

            {/* Main Heading */}

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="leading-tight font-black text-white"
            >
              <span className="block text-5xl md:text-6xl lg:text-7xl">
                Travel with
              </span>

              <span className="block mt-2 text-5xl md:text-6xl lg:text-7xl text-yellow-400">
                Comfort.
              </span>

              <span className="block mt-5 text-5xl md:text-6xl lg:text-7xl">
                Drive with
              </span>

              <span className="block mt-2 text-5xl md:text-6xl lg:text-7xl text-yellow-400">
                Confidence.
              </span>
            </motion.h1>

            {/* Description */}

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-8 max-w-xl text-lg leading-9 text-gray-300"
            >
              Premium Self Drive & Chauffeur Services across{" "}
              <span className="text-yellow-400">
                Mumbai, Navi Mumbai, Panvel & Thane.
              </span>
            </motion.p>

            {/* Buttons */}

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-12 flex flex-wrap gap-5"
            >
              <Button href="#booking">
                Book Now
              </Button>

            </motion.div>

           

            
            
          </motion.div>
        </div>
      </div>

      {/* Scroll Down */}

      <motion.div
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.6,
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center">
          <span className="mb-2 text-xs uppercase tracking-[8px] text-gray-300">
            Scroll Down
          </span>

          <ChevronDown
            size={34}
            className="text-yellow-400"
          />
        </div>
      </motion.div>
    </section>
  );
}