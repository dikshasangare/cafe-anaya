import { Link } from "@inertiajs/react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
// import { route } from 'ziggy-js';
import heroStory from "../../images/hero-cafe.jpg";

const OurStory = () => {
    const containerRef = useRef(null);

    // Scroll Parallax for that "Heavy" Luxury Feel
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

    return (
        <section
            ref={containerRef}
            className="relative w-full h-screen bg-[#030303] flex items-center justify-center overflow-hidden"
        >
            {/* 1. WEB3 BACKGROUND: MESH GRADIENT & DIFFUSED RADIANCE */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] left-[-20%] w-[60%] h-[60%] bg-cyan-900/20 blur-[140px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-20%] w-[60%] h-[60%] bg-purple-900/10 blur-[140px] rounded-full" />

                {/* Parallax Background Image */}
                <motion.div
                    style={{ y }}
                    className="absolute inset-0 opacity-30 grayscale"
                >
                    <img
                        src={heroStory}
                        className="w-full h-[120%]"
                        alt="Interior"
                    />
                </motion.div>
            </div>

            {/* 2. THE MAIN BENTO GLASS CARD */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 w-[92%] max-w-5xl h-[70vh] md:h-[60vh] backdrop-blur-[30px] bg-white/[0.02] border border-white/10 rounded-[3rem] p-8 md:p-20 flex flex-col items-center justify-center text-center shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            >
                {/* Subtle Web3 Grid Overlay */}
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />

                {/* Sub-label */}

                {/* Typography */}
                <h2 className="text-6xl md:text-9xl font-serif italic text-white mb-8 tracking-tighter leading-none">
                    Café <span className="text-stone-500">Anaya</span>
                </h2>

                <div className="flex items-center justify-center my-6">
                    <div className="w-48 h-px bg-gradient-to-r from-transparent via-[#22d3ee]/50 to-transparent" />

                    <div className="mx-3 w-2 h-2 rounded-full bg-[#22d3ee] shadow-[0_0_10px_rgba(34,211,238,0.6)]" />

                    <div className="w-48 h-px bg-gradient-to-l from-transparent via-[#22d3ee]/50 to-transparent" />
                </div>

                <p className="text-stone-400 text-lg md:text-xl font-light max-w-xl leading-relaxed mb-16 italic">
                    "Crafting a decentralized ritual where every bean is a
                    legacy, and every pour is an immutable experience."
                </p>

                {/* 3. THE SINGLE INTERACTIVE BUTTON (The "Web3" Circle) */}
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative"
                >
                    {/* Glowing Aura */}
                    <div className="absolute inset-0 bg-cyan-500/30 blur-2xl rounded-full group-hover:bg-cyan-500/50 transition-all duration-700 animate-pulse" />

                    <Link
                        href={"/our-story"}
                        className="relative flex items-center justify-center w-36 h-36 md:w-44 md:h-44 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-white transition-all duration-500 hover:border-cyan-400 group"
                    >
                        <div className="flex flex-col items-center">
                            <span className="text-[10px] tracking-[0.4em] uppercase mb-1 opacity-60">
                                Discover
                            </span>
                            <span className="text-sm font-bold tracking-widest uppercase group-hover:text-cyan-400 transition-colors">
                                The Story
                            </span>

                            {/* Animated Web3 Cursor Dot */}
                            <div className="mt-3 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping" />
                        </div>
                    </Link>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default OurStory;
