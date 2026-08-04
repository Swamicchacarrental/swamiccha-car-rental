import { useState } from "react";
import { motion } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import SectionTitle from "../Common/SectionTitle";

import img1 from "../../assets/images/gallery/gallery1.jpg";
import img2 from "../../assets/images/gallery/gallery2.jpg";
import img3 from "../../assets/images/gallery/gallery3.jpg";
import img4 from "../../assets/images/gallery/gallery4.jpg";
import img5 from "../../assets/images/gallery/gallery5.jpg";
import img6 from "../../assets/images/gallery/gallery6.jpg";

const images = [
  { src: img1 },
  { src: img2 },
  { src: img3 },
  { src: img4 },
  { src: img5 },
  { src: img6 },
];

export default function Gallery() {
  const [index, setIndex] = useState(-1);

  return (
    <section id="gallery" className="bg-[#050505] py-28">
      <div className="mx-auto max-w-7xl px-6">

        <SectionTitle
          subtitle="Gallery"
          title="Journey in Style"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {images.map((image, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer overflow-hidden rounded-3xl"
              onClick={() => setIndex(i)}
            >
              <img
                src={image.src}
                alt={`Gallery ${i + 1}`}
                className="h-80 w-full object-cover transition duration-700 group-hover:scale-110"
              />
            </motion.div>
          ))}

        </div>

      </div>

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={images}
      />
    </section>
  );
}