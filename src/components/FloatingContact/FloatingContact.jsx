import { Phone, MessageCircle } from "lucide-react";
import siteData from "../../data/siteData";

export default function FloatingContact() {
  const whatsappPhone = siteData.company.phone1.replace(/\s+/g, "");
  const callPhone = siteData.company.phone2.replace(/\s+/g, "");

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">

      {/* WhatsApp - Phone 1 */}
      <a
        href={`https://wa.me/${whatsappPhone.replace("+", "")}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition hover:scale-110"
      >
        <MessageCircle size={30} />
      </a>

      {/* Call - Phone 2 */}
      <a
        href={`tel:${callPhone}`}
        aria-label="Call Swamiccha Car Rental"
        className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-500 text-black shadow-2xl transition hover:scale-110"
      >
        <Phone size={30} />
      </a>

    </div>
  );
}