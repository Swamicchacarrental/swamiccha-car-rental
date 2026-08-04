import { useEffect, useState } from "react";
import { Link } from "react-scroll";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";

import MobileMenu from "./MobileMenu";
import navLinks from "./navLinks";
import logo from "../../assets/images/logo.PNG";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ${
          isScrolled
            ? "bg-black/85 backdrop-blur-2xl border-b border-yellow-500/20 shadow-2xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">

          {/* Logo */}

          <Link
            to="home"
            smooth
            duration={700}
            className="cursor-pointer"
          >
            <motion.img
              src={logo}
              alt="Swamiccha Car Rental"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="h-14 md:h-16 w-auto object-contain"
            />
          </Link>

          {/* Desktop Menu */}

          <nav className="hidden lg:flex items-center gap-10">

            {navLinks.map((item) => (
              <Link
                key={item.id}
                to={item.id}
                smooth
                spy
                duration={700}
                offset={-70}
                activeClass="text-yellow-400"
                className="
                  relative
                  cursor-pointer
                  text-white
                  font-medium
                  tracking-wide
                  transition-all
                  duration-300
                  hover:text-yellow-400
                  after:absolute
                  after:left-0
                  after:-bottom-2
                  after:h-[2px]
                  after:w-0
                  after:bg-yellow-400
                  after:transition-all
                  after:duration-300
                  hover:after:w-full
                "
              >
                {item.label}
              </Link>
            ))}

          </nav>

          {/* Book Button */}

          <div className="hidden lg:block">

            <Link
              to="booking"
              smooth
              duration={700}
              offset={-70}
              className="
                cursor-pointer
                rounded-full
                bg-gradient-to-r
                from-yellow-500
                to-amber-400
                px-8
                py-3
                text-black
                font-semibold
                shadow-lg
                shadow-yellow-500/30
                transition-all
                duration-300
                hover:scale-105
                hover:shadow-[0_0_25px_rgba(250,204,21,.55)]
              "
            >
              Book Now
            </Link>

          </div>

          {/* Mobile Menu */}

          <button
            onClick={() => setMobileOpen(true)}
            className="text-white lg:hidden"
          >
            <Menu size={32} />
          </button>

        </div>

        {/* Bottom Gold Line */}

        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent" />

      </motion.header>

      <MobileMenu
        open={mobileOpen}
        setOpen={setMobileOpen}
      />
    </>
  );
}