import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-scroll";
import { X } from "lucide-react";
import navLinks from "./navLinks";

export default function MobileMenu({ open, setOpen }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl"
        >
          <button
            onClick={() => setOpen(false)}
            className="absolute right-6 top-6 text-white"
          >
            <X size={32} />
          </button>

          <div className="flex h-full flex-col items-center justify-center gap-10">

            {navLinks.map((item) => (
              <Link
                key={item.id}
                to={item.id}
                smooth
                duration={600}
                offset={-80}
                onClick={() => setOpen(false)}
                className="cursor-pointer text-3xl font-semibold text-white transition hover:text-yellow-500"
              >
                {item.label}
              </Link>
            ))}

            <a
              href="#booking"
              className="rounded-full bg-yellow-500 px-8 py-4 font-semibold text-black transition hover:scale-105"
              onClick={() => setOpen(false)}
            >
              Book Now
            </a>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}