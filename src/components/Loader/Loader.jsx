import { motion } from "framer-motion";

function Loader() {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl font-bold tracking-[8px] text-white"
      >
        SWAMICCHA
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: .5 }}
        className="mt-4 text-yellow-400 tracking-[4px]"
      >
        CAR RENTAL
      </motion.p>

      <div className="mt-12 h-1 w-52 overflow-hidden rounded bg-white/10">
        <motion.div
          className="h-full bg-yellow-500"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2 }}
        />
      </div>
    </motion.div>
  );
}

export default Loader;