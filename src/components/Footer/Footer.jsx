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

          {/* Company */}

          <div>

            <div className="mb-5 flex items-center gap-3">

              <Car className="text-yellow-500" size={32} />

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

          {/* Quick Links */}

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
                    className="text-gray-400 transition hover:text-yellow-500"
                  >
                    {item}
                  </a>
                </li>
              ))}

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3 className="mb-6 text-xl font-semibold text-white">
              Contact
            </h3>

            <div className="space-y-5">

              <div className="flex items-center gap-3">

                <Phone
                  size={18}
                  className="text-yellow-500"
                />

                <span className="text-gray-400">
                  {company.phone1}
                </span>

              </div>

              <div className="flex items-center gap-3">

                <Mail
                  size={18}
                  className="text-yellow-500"
                />

                <span className="text-gray-400">
                  {company.email}
                </span>

              </div>

              <div className="flex items-center gap-3">

                <MapPin
                  size={18}
                  className="text-yellow-500"
                />

                <span className="text-gray-400">
                  Mumbai, Navi Mumbai,
                  Panvel & Thane
                </span>

              </div>

            </div>

          </div>

          {/* Social */}

          <div>

            <h3 className="mb-6 text-xl font-semibold text-white">
              Follow Us
            </h3>

            

          </div>

        </div>

      </div>

      <div className="border-t border-white/10 py-6 text-center text-sm text-gray-500">

        © {new Date().getFullYear()} {company.name}. All Rights Reserved.

      </div>

    </footer>
  );
}