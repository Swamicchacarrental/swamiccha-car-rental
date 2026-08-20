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
          transition={{
            duration: 0.35,
            ease: "easeInOut",
          }}
          className="
            fixed
            inset-0
            z-[100]
            h-[100dvh]
            w-full
            max-w-full
            overflow-hidden
            bg-black/95
            backdrop-blur-xl
          "
        >
          {/* Close Button */}
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setOpen(false)}
            className="
              absolute
              right-5
              top-5
              z-10
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-xl
              border
              border-white/10
              bg-white/5
              text-white
              transition
              hover:border-yellow-500/50
              hover:text-yellow-400
            "
          >
            <X size={30} />
          </button>

          {/* Menu */}
          <div
            className="
              flex
              h-full
              w-full
              max-w-full
              flex-col
              items-center
              justify-center
              gap-7
              overflow-hidden
              px-6
            "
          >
            {navLinks.map((item) => (
              <Link
                key={item.id}
                to={item.id}
                smooth={true}
                duration={600}
                offset={-80}
                onClick={() => setOpen(false)}
                className="
                  cursor-pointer
                  text-2xl
                  font-semibold
                  tracking-wide
                  text-white
                  transition-colors
                  duration-300
                  hover:text-yellow-500
                "
              >
                {item.label}
              </Link>
            ))}

            {/* Book Now */}
            <Link
              to="booking"
              smooth={true}
              duration={600}
              offset={-80}
              onClick={() => setOpen(false)}
              className="
                mt-3
                inline-flex
                cursor-pointer
                items-center
                justify-center
                rounded-full
                bg-yellow-500
                px-8
                py-3.5
                font-semibold
                text-black
                shadow-lg
                shadow-yellow-500/20
                transition-all
                duration-300
                hover:scale-105
                hover:bg-yellow-400
              "
            >
              Book Now
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}