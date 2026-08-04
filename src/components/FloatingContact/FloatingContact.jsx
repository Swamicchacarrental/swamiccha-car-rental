import { Phone, MessageCircle } from "lucide-react";
import siteData from "../../data/siteData";

export default function FloatingContact() {
  const phone = siteData.company.phone1.replace(/\s+/g, "");

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">

      <a
        href={`https://wa.me/${phone.replace("+", "")}`}
        target="_blank"
        rel="noreferrer"
        className="flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition hover:scale-110"
      >
        <MessageCircle size={30} />
      </a>

      <a
        href={`tel:${phone}`}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-500 text-black shadow-2xl transition hover:scale-110"
      >
        <Phone size={30} />
      </a>

    </div>
  );
}