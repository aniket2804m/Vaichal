import { motion, AnimatePresence } from "framer-motion";

const NAME = "VAICHAL";

// Simple skyline silhouette — the "signature" element.
// It draws itself stroke-by-stroke, echoing the "Building the Real Estate" line.
const SKYLINE_PATH =
  "M10 120 L10 70 L30 70 L30 40 L50 40 L50 90 L70 90 L70 20 L95 20 L95 90 L115 90 L115 55 L140 55 L140 120 L165 120 L165 30 L190 30 L190 120 L215 120 L215 65 L240 65 L240 120 L265 120 L265 45 L285 45 L285 120 L300 120";

export const letterVariants = {
  hidden: { opacity: 0, y: 14 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.4 + i * 0.06, duration: 0.5, ease: "easeOut" as const },
  }),
};

const LoadingScreen = ({ isLoading }: { isLoading: boolean }) => (
  <AnimatePresence>
    {isLoading && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 bg-[#F5F7E3] flex items-center justify-center font-sans overflow-hidden z-[9999]"
      >
        {/* Ambient green accent glow, breathing slowly behind everything */}
        <motion.div
          className="absolute w-[520px] h-[520px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(122,150,54,0.15) 0%, rgba(122,150,54,0) 70%)",
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Drifting brand green and red dust particles */}
        {Array.from({ length: 14 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              backgroundColor: i % 2 === 0 ? "#7A9636" : "#8F2621",
              width: 2 + (i % 3),
              height: 2 + (i % 3),
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
              opacity: 0.25,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.15, 0.45, 0.15],
            }}
            transition={{
              duration: 5 + (i % 5),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.05, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative text-center px-4"
        >
          {/* Wordmark — letters stagger in, then breathe together */}
          <motion.div
            className="font-cinzel font-bold mb-1 flex justify-center items-center select-none"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.2,
            }}
          >
            {NAME.split("").map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="show"
                className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-[#1B1B1B] tracking-[0.15em]"
              >
                {char}
              </motion.span>
            ))}
          </motion.div>

          {/* Tagline fades in after the wordmark settles */}
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={{ opacity: 1, letterSpacing: "0.3em" }}
            transition={{ delay: 0.7, duration: 0.6, ease: "easeOut" }}
            className="block text-[#7A9636] font-cinzel font-light uppercase text-[10px] sm:text-xs md:text-sm mb-8"
          >
            Building the Real Estate
          </motion.span>

          {/* Signature element: skyline drawing itself in brand red accent, on loop */}
          <motion.svg
            viewBox="0 0 310 130"
            className="w-40 sm:w-48 md:w-56 mx-auto mb-6 opacity-90"
            fill="none"
          >
            <motion.path
              d={SKYLINE_PATH}
              stroke="#8F2621"
              strokeWidth="1.5"
              strokeLinejoin="round"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0.4 }}
              animate={{ pathLength: [0, 1, 1], opacity: [0.4, 1, 0.4] }}
              transition={{
                duration: 2.0,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.6, 1],
              }}
            />
          </motion.svg>

          {/* Clean brand red progress track with a soft light sweep */}
          <div className="w-56 h-[1.5px] bg-[#999991]/20 rounded-none overflow-hidden mx-auto relative">
            <motion.div
              className="h-full bg-[#8F2621]"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-0 h-full w-8 from-transparent via-[#F5F7E3]/60 to-transparent"
              initial={{ x: "-120%" }}
              animate={{ x: "220%" }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default LoadingScreen;