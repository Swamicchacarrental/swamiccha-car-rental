import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

import Loader from "./components/Loader/Loader";
import Home from "./pages/Home";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Loader />}
        {!loading && <Home />}
      </AnimatePresence>
    </>
  );
}

export default App;