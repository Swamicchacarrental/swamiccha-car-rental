import {
  Car,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

import siteData from "../../data/siteData";

export default function Footer() {
  const company = siteData.company;

  return (
    <footer className="border-t border-yellow-500/20 bg-black">

      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* ================= COMPANY ================= */}

          <div>

            <div className="mb-5 flex items-center gap-3">

              <Car
                className="text-yellow-500"
                size={32}
              />

              <div>
                <h2 className="text-2xl font-bold text-white">
                  {company.name}
                </h2>

                <p className="text-sm text-yellow-500">
                  Premium Car Rental
                </p>
              </div>

            </div>

            <p className="leading-7 text-gray-400">
              Comfortable, reliable and premium car rental services for
              airport transfers, family trips, business travel and
              outstation journeys.
            </p>

          </div>


          {/* ================= QUICK LINKS ================= */}

          <div>

            <h3 className="mb-6 text-xl font-semibold text-white">
              Quick Links
            </h3>

            <ul className="space-y-3">

              {[
                "Home",
                "About",
                "Services",
                "Vehicle",
                "Gallery",
                "Contact",
              ].map((item) => (
                <li key={item}>

                  <a
                    href={`#${item.toLowerCase()}`}
                    className="
                      text-gray-400
                      transition
                      duration-200
                      hover:text-yellow-500
                    "
                  >
                    {item}
                  </a>

                </li>
              ))}

            </ul>

          </div>


          {/* ================= CONTACT ================= */}

          <div>

            <h3 className="mb-6 text-xl font-semibold text-white">
              Contact
            </h3>

            <div className="space-y-5">

              {/* New Phone Number */}

              <div className="flex items-center gap-3">

                <Phone
                  size={18}
                  className="shrink-0 text-yellow-500"
                />

                <a
                  href="tel:+918898491250"
                  className="
                    text-gray-400
                    transition
                    hover:text-yellow-500
                  "
                >
                  +91 8898491250
                </a>

              </div>


              {/* Existing Phone Number */}

              <div className="flex items-center gap-3">

                <Phone
                  size={18}
                  className="shrink-0 text-yellow-500"
                />

                <a
                  href={`tel:+${String(company.phone1).replace(/\D/g, "")}`}
                  className="
                    text-gray-400
                    transition
                    hover:text-yellow-500
                  "
                >
                  {company.phone1}
                </a>

              </div>


              {/* Email */}

              <div className="flex items-start gap-3">

                <Mail
                  size={18}
                  className="mt-1 shrink-0 text-yellow-500"
                />

                <a
                  href={`mailto:${company.email}`}
                  className="
                    break-all
                    text-gray-400
                    transition
                    hover:text-yellow-500
                  "
                >
                  {company.email}
                </a>

              </div>


              {/* Location */}

              <div className="flex items-start gap-3">

                <MapPin
                  size={18}
                  className="mt-1 shrink-0 text-yellow-500"
                />

                <span className="text-gray-400">
                  Mumbai, Navi Mumbai,
                  Panvel & Thane
                </span>

              </div>

            </div>

          </div>


          {/* ================= FOLLOW US ================= */}

          <div>

            <h3 className="mb-6 text-xl font-semibold text-white">
              Follow Us
            </h3>

            <p className="mb-6 leading-7 text-gray-400">
              Follow Swamiccha Car Rental for updates, offers and
              latest travel services.
            </p>


            <div className="flex items-center gap-4">

              {/* Instagram */}

              <a
                href="https://www.instagram.com/swamicchacarrental?igsh=bjYyN252bHFvZTZ6&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/10
                  bg-white/5
                  text-gray-300
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-yellow-500
                  hover:bg-yellow-500
                  hover:text-black
                "
              >
                {/* Instagram SVG */}
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect
                    x="2"
                    y="2"
                    width="20"
                    height="20"
                    rx="5"
                    ry="5"
                  />

                  <circle
                    cx="12"
                    cy="12"
                    r="4"
                  />

                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="0.8"
                    fill="currentColor"
                  />
                </svg>
              </a>


              {/* YouTube */}

              <a
                href="https://youtube.com/@swamicchacarrental?si=z092b9VGlTAYWA-U"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/10
                  bg-white/5
                  text-gray-300
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-yellow-500
                  hover:bg-yellow-500
                  hover:text-black
                "
              >
                {/* YouTube SVG */}
                <svg
                  width="23"
                  height="23"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.8V8.2l6.4 3.8-6.4 3.8Z"
                  />
                </svg>
              </a>

            </div>

          </div>

        </div>

      </div>


      {/* ================= COPYRIGHT ================= */}

      <div className="border-t border-white/10 py-6 text-center text-sm text-gray-500">

        © {new Date().getFullYear()} {company.name}.
        All Rights Reserved.

      </div>

    </footer>
  );
}