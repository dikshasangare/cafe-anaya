import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const ImageGallery = () => {
    const targetRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"],
    });

    // UPDATED SPRING: Lower stiffness and higher damping for a smoother, weightier feel
    const smoothProgress = useSpring(scrollYProgress, {
        // stiffness: 30,
        // damping: 30,
        // restDelta: 0.001
        stiffness: 80, // Slightly higher to react faster
        damping: 40, // Much higher damping to eliminate "wobble"
        mass: 1,
    });

    const x = useTransform(smoothProgress, [0, 1], ["0%", "-67%"]);
    const imageX = useTransform(smoothProgress, [0, 1], ["10%", "-10%"]);

    const items = [
        {
            id: 1,
            src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
            title: "The Extraction",
            sub: "Signature Roast",
        },
        {
            id: 2,
            src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
            title: "Velvet Foam",
            sub: "Precision Art",
        },
        {
            id: 3,
            src: "https://images.unsplash.com/photo-1507133750040-4a8f57021571",
            title: "Morning Still",
            sub: "Quiet Moments",
        },
        {
            id: 4,
            src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24",
            title: "Urban Space",
            sub: "Industrial Vibe",
        },
        {
            id: 5,
            src: "https://images.unsplash.com/photo-1442512595331-e89e73853f31",
            title: "Golden Hour",
            sub: "Natural Light",
        },
    ];

    return (
        <section ref={targetRef} className="relative h-[500vh] bg-[#fdfdfd]">
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                <motion.div
                    style={{ x }}
                    // UPDATED: Added will-change-transform to offload track math to GPU
                    // className="flex gap-24 px-[15vw] items-center will-change-transform"
                    className="flex gap-24 px-[15vw] items-center will-change-transform [backface-visibility:hidden] [perspective:1000px]"
                >
                    <div className="min-w-[400px]">
                        <motion.h2 className="text-[10rem] font-serif italic text-cyan-700 leading-[0.7] tracking-tighter">
                            A <br /> Series <br />{" "}
                            <span className="text-stone-200">2026</span>
                        </motion.h2>
                    </div>

                    {items.map((item) => (
                        <motion.div
                            key={item.id}
                            className="relative w-[450px] h-[450px] overflow-hidden rounded-[2.5rem] group"
                        >
                            <div className="absolute inset-0 w-full h-full overflow-hidden transition-transform duration-1000 ease-out group-hover:scale-110">
                                <motion.img
                                    style={{ x: imageX }}
                                    src={item.src}
                                    // UPDATED: added transform-gpu to images for smoother parallax movement
                                    className="absolute inset-0 w-[120%] h-[450px] object-cover transition-all duration-1000 transform-gpu"
                                />
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />

                            <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-white/20 group-hover:border-cyan-400/80 transition-all duration-500 z-20" />
                            <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-white/20 group-hover:border-cyan-400/80 transition-all duration-500 z-20" />

                            <div className="absolute bottom-0 left-0 p-12 w-full z-10">
                                <div className="overflow-hidden">
                                    <motion.p className="text-[10px] tracking-[0.4em] uppercase text-white/60 mb-3 translate-y-10 group-hover:translate-y-0 transition-transform duration-700">
                                        {item.sub}
                                    </motion.p>
                                    <motion.h3 className="text-4xl font-serif italic text-white translate-y-12 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                                        {item.title}
                                    </motion.h3>
                                </div>
                            </div>

                            <div className="absolute top-10 left-10 w-6 h-6 border-t border-l border-white/40 opacity-0 group-hover:opacity-100 transition-all duration-700" />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default ImageGallery;
