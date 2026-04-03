import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const ImageGallery = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: targetRef });

    // This creates the horizontal "Camera" movement as you scroll down
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-70%"]);

    const gallery = [
        {
            id: 1,
            src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
            title: "THE EXTRACTION",
            num: "01",
        },
        {
            id: 2,
            src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
            title: "SILK & FOAM",
            num: "02",
        },
        {
            id: 3,
            src: "https://images.unsplash.com/photo-1507133750040-4a8f57021571",
            title: "DARK ROAST",
            num: "03",
        },
        {
            id: 4,
            src: "https://images.unsplash.com/photo-1442512595331-e89e73853f31",
            title: "THE AMBIANCE",
            num: "04",
        },
        {
            id: 5,
            src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24",
            title: "MINIMALIST",
            num: "05",
        },
    ];

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-white">
            {/* STICKY CONTAINER */}
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                {/* BACKGROUND DECOR (WEB3 BLUR) */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-100/40 blur-[120px] rounded-full" />

                {/* MOVING TRACK */}
                <motion.div style={{ x }} className="flex gap-20 px-20">
                    {/* Intro Card */}
                    <div className="flex flex-col justify-center min-w-[400px]">
                        <span className="text-[10px] tracking-[0.8em] text-stone-400 uppercase mb-4">
                            Gallery v3.0
                        </span>
                        <h2 className="text-8xl font-serif italic text-stone-900 leading-none">
                            Visual <br />{" "}
                            <span className="text-stone-300">Poetry</span>
                        </h2>
                    </div>

                    {/* Gallery Items */}
                    {gallery.map((item) => (
                        <motion.div
                            key={item.id}
                            whileHover={{ y: -20 }}
                            className="relative min-w-[450px] h-[600px] group"
                        >
                            {/* GLASS FRAME */}
                            <div className="absolute inset-0 bg-white/40 backdrop-blur-md border border-white/80 shadow-[0_20px_50px_rgba(0,0,0,0.03)] rounded-[2rem] -z-10 group-hover:border-cyan-200 transition-colors duration-500" />

                            {/* IMAGE CONTAINER */}
                            <div className="h-[80%] m-4 overflow-hidden rounded-[1.5rem] bg-stone-100">
                                <motion.img
                                    src={item.src}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[1.5s] ease-out"
                                />
                            </div>

                            {/* ITEM INFO */}
                            <div className="px-8 flex justify-between items-end pb-6">
                                <div>
                                    <p className="text-[9px] font-mono tracking-widest text-stone-400 uppercase mb-1">
                                        {item.num}
                                    </p>
                                    <h3 className="text-2xl font-serif italic text-stone-800">
                                        {item.title}
                                    </h3>
                                </div>
                                <div className="w-12 h-12 rounded-full border border-stone-100 flex items-center justify-center text-stone-300 group-hover:bg-stone-900 group-hover:text-white transition-all">
                                    ↗
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* PROGRESS BAR (FOOTER) */}
            <div className="fixed bottom-10 left-10 right-10 flex justify-between items-center z-50 pointer-events-none">
                <span className="text-[9px] tracking-widest text-stone-400">
                    01 — 05
                </span>
                <motion.div
                    className="h-[1px] bg-stone-200 flex-1 mx-10 origin-left"
                    style={{ scaleX: scrollYProgress }}
                />
                <span className="text-[9px] tracking-widest text-stone-400 uppercase">
                    Scroll to Explore
                </span>
            </div>
        </section>
    );
};

export default ImageGallery;
