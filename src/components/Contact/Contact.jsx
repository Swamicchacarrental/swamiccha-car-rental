import { Phone, Mail, MapPin, Clock } from "lucide-react";
import SectionTitle from "../Common/SectionTitle";
import siteData from "../../data/siteData";

export default function Contact() {
  const company = siteData.company;

  return (
    <section id="contact" className="bg-[#050505] py-28">
      <div className="mx-auto max-w-7xl px-6">

        <SectionTitle
          subtitle="Contact Us"
          title="Let's Plan Your Journey"
        />

        <div className="grid gap-12 lg:grid-cols-2">

          {/* Left */}

          <div className="space-y-6">

            <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-6">
              <Phone className="text-yellow-500" size={28} />
              <div>
                <h3 className="text-xl font-semibold text-white">
                  Call Us
                </h3>

                <p className="mt-2 text-gray-400">
                  {company.phone1}
                </p>

                {company.phone2 && (
                  <p className="text-gray-400">
                    {company.phone2}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-6">
              <Mail className="text-yellow-500" size={28} />
              <div>
                <h3 className="text-xl font-semibold text-white">
                  Email
                </h3>

                <p className="mt-2 text-gray-400">
                  {company.email}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-6">
              <MapPin className="text-yellow-500" size={28} />
              <div>
                <h3 className="text-xl font-semibold text-white">
                  Service Areas
                </h3>

                <p className="mt-2 text-gray-400">
                  Mumbai • Navi Mumbai • Panvel • Thane
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-6">
              <Clock className="text-yellow-500" size={28} />
              <div>
                <h3 className="text-xl font-semibold text-white">
                  Availability
                </h3>

                <p className="mt-2 text-gray-400">
                  24 × 7 Booking Support
                </p>
              </div>
            </div>

          </div>

          {/* Right */}

          <div className="overflow-hidden rounded-3xl border border-white/10">

            <iframe
              title="Google Map"
              src="https://www.google.com/maps?q=Mumbai&output=embed"
              className="h-[500px] w-full"
              loading="lazy"
            />

          </div>

        </div>

      </div>
    </section>
  );
}