import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import About from "../components/About/About";
import Services from "../components/Services/Services";
import Vehicle from "../components/Vehicle/Vehicle";
import WhyChoose from "../components/WhyChoose/WhyChoose";
import Gallery from "../components/Gallery/Gallery";
import FloatingContact from "../components/FloatingContact/FloatingContact";
import Booking from "../components/Booking/Booking";
import Contact from "../components/Contact/Contact";
import Footer from "../components/Footer/Footer";
import Testimonials from "../components/Testimonials/Testimonials";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Vehicle />
      <WhyChoose />
      <Gallery />
      <Testimonials />  
      <Booking />
      <Contact />
     <Footer />

      <FloatingContact />
    </>
  );
}