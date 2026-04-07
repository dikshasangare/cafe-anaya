import React, { useEffect, useRef } from "react";
import { Head } from "@inertiajs/react";
import {
    motion,
    useAnimation,
    useInView,
    useMotionTemplate,
    useMotionValue,
    useScroll,
    useSpring,
    useTransform,
} from "framer-motion";
import MainLayout from "../Layouts/MainLayout";

export default function OurStoryPage() {
    const ref = useRef(null);
    // ✅ FIXED scroll timing (Basilico style)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 80%", "end 20%"],
    });

    // Parallax for the hero image
    const imageY = useTransform(scrollYProgress, [0, 0.5], ["0%", "20%"]);

    // =========================
    // 🎯 SMOOTH SPRING CONFIG
    // =========================
    const smooth = { stiffness: 40, damping: 20, mass: 1.2 };

    // =========================
    // 🎯 VERTICAL MOVEMENTS
    // =========================
    const y1 = useSpring(
        useTransform(scrollYProgress, [0, 1], [-60, 60]),
        smooth,
    );
    const y2 = useSpring(
        useTransform(scrollYProgress, [0, 1], [-40, 40]),
        smooth,
    );
    const y3 = useSpring(
        useTransform(scrollYProgress, [0, 1], [-80, 80]),
        smooth,
    );

    const yReverse = useSpring(
        useTransform(scrollYProgress, [0, 1], [60, -60]),
        smooth,
    );

    // =========================
    // 🎯 HORIZONTAL MOVEMENTS
    // =========================
    const x1 = useSpring(
        useTransform(scrollYProgress, [0, 1], [-80, 80]),
        smooth,
    );
    const x2 = useSpring(
        useTransform(scrollYProgress, [0, 1], [80, -80]),
        smooth,
    );

    // Text animation
    const fadeUp = {
        hidden: { opacity: 0, y: 60 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" },
        },
    };

    return (
        <MainLayout>
            <div className="bg-[#080808] text-stone-200 selection:bg-cyan-500/30 selection:text-white">
                <Head title="Our Story | Café Anaya" />

                {/* --- CHAPTER 1: THE GENESIS (Hero) --- */}
                <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
                    <motion.div
                        style={{ y: imageY }}
                        className="absolute inset-0 z-0"
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#080808] z-10" />
                        <img
                            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2000"
                            className="w-full h-[120%] object-cover grayscale brightness-50"
                            alt="Heritage"
                        />
                    </motion.div>

                    <div className="relative z-20 text-center px-6">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-cyan-300 text-[10px] tracking-[0.8em] uppercase mb-6 block"
                        >
                            Anaya Protocol // 2026
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="text-7xl md:text-[10vw] font-serif italic text-white tracking-tighter leading-none"
                        >
                            Origin <span className="text-stone-600">&</span>{" "}
                            Soul
                        </motion.h1>
                    </div>

                    {/* Web3 Technical Detail Overlay */}
                    <div className="absolute bottom-10 left-10 text-[8px] tracking-[0.5em] text-stone-500 hidden md:block">
                        BLOCK_ID: #44921 // LAT: 12.97 // LONG: 77.59
                    </div>
                </section>
            </div>
            {/* Our Story */}
            <section ref={ref} className="overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* ================= HERO IMAGE ================= */}
                    <div className="h-[280px] md:h-[600px] overflow-hidden relative">
                        <motion.img
                            src="https://images.unsplash.com/photo-1612192527395-06b72da6b35a?w=1600"
                            alt=""
                            style={{
                                x: x1,
                                y: y1,
                                scale: 1.25,
                            }}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* ================= TEXT ================= */}
                    <div className="flex items-center px-6 md:px-12 py-10 md:py-0 bg-cyan-50">
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: false }}
                            className="max-w-[580px]"
                        >
                            <div className="capitalize text-gray-600 relative inline-block text-5xl font-bold mb-4">
                                <p className="text-[11px] tracking-[0.3em] uppercase text-gray-500 mb-3">
                                    Our Story
                                </p>

                                <div className="leading-[1.2] font-semibold">
                                    From a Dream{" "}
                                    <span className="text-cyan-500">
                                        to a Destination
                                    </span>
                                </div>

                                <span className="absolute -bottom-3 left-0 w-32 h-[2px] bg-cyan-500" />
                            </div>

                            <p className="text-[14px] mt-5 md:text-[16px] text-gray-600 leading-[1.8]">
                                It all began in 2014 with a simple dream — to
                                create a place where people could slow down,
                                connect, and enjoy moments over great food.
                                <br />
                                <br />
                                What started as a small café has grown into a
                                warm, welcoming space filled with stories,
                                laughter, and unforgettable experiences.
                            </p>
                        </motion.div>
                    </div>

                    {/* ================= LEFT BLOCK ================= */}
                    <div className="grid grid-cols-1">
                        <div className="grid grid-cols-2">
                            {/* ✅ IMAGE 2 (VERTICAL TOP → BOTTOM) */}
                            <div className="h-[180px] md:h-[600px] overflow-hidden relative">
                                <motion.img
                                    src="https://images.unsplash.com/photo-1671522635398-a2443699d32e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNhZmUlMjBmb29kfGVufDB8fDB8fHww"
                                    alt=""
                                    style={{
                                        y: y2,
                                        scale: 1.2,
                                    }}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* TEXT */}
                            <div className="flex items-center p-6 md:p-10 bg-cyan-50">
                                <motion.div
                                    variants={fadeUp}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: false }}
                                >
                                    <div className="text-gray-600 relative inline-block text-4xl font-bold mb-4">
                                        The{" "}
                                        <span className="text-cyan-500">
                                            Beginning — 2014
                                        </span>
                                        <span className="absolute -bottom-3 left-0 w-20 h-[2px] bg-cyan-500" />
                                    </div>

                                    <p className="text-[14px] pt-5 text-gray-600 leading-[1.7]">
                                        With passion and a vision, we opened our
                                        doors in 2014. A small team, big dreams,
                                        and a commitment to quality — every cup
                                        and every dish was made with love from
                                        day one.
                                    </p>
                                </motion.div>
                            </div>
                        </div>

                        {/* ================= IMAGE 3 (HORIZONTAL REVERSE) ================= */}
                        <div className="h-[180px] md:h-[400px] overflow-hidden relative">
                            <motion.img
                                src="https://plus.unsplash.com/premium_photo-1679503585289-c02467981894?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fGNhZmUlMjBmb29kfGVufDB8fDB8fHww"
                                alt=""
                                style={{
                                    x: x2,
                                    y: y2,
                                    scale: 1.25,
                                }}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* ================= RIGHT BLOCK ================= */}
                    <div className="grid grid-cols-1">
                        {/* ================= IMAGE 4 ================= */}
                        <div className="h-[180px] md:h-[400px] overflow-hidden relative">
                            <motion.img
                                src="https://images.unsplash.com/photo-1683533678036-46ec6a0163d9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fGluZGlhbiUyMGJyZWFrZmFzdHxlbnwwfHwwfHx8MA%3D%3D"
                                alt=""
                                style={{
                                    x: x1,
                                    y: y2,
                                    scale: 1.2,
                                }}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="grid grid-cols-2">
                            {/* ✅ LAST IMAGE (VERTICAL REVERSE) */}
                            <div className="h-[180px] md:h-[600px] overflow-hidden relative">
                                <motion.img
                                    src="https://images.unsplash.com/photo-1583527825770-8bd0bfb1f1c1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGNhZmUlMjBmb29kfGVufDB8fDB8fHww"
                                    alt=""
                                    style={{
                                        y: yReverse,
                                        scale: 1.25,
                                    }}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* TEXT */}
                            <div className="flex items-center p-6 md:p-10 bg-cyan-50">
                                <motion.div
                                    variants={fadeUp}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: false }}
                                >
                                    <div className="text-gray-600 relative inline-block text-4xl font-bold mb-4">
                                        Growing{" "}
                                        <span className="text-cyan-500">
                                            With You
                                        </span>
                                        <span className="absolute -bottom-3 left-0 w-20 h-[2px] bg-cyan-500" />
                                    </div>

                                    <p className="text-[14px] pt-5 text-gray-600 leading-[1.7]">
                                        Over the years, we’ve evolved into more
                                        than just a café. We’ve become a place
                                        where friendships are built, ideas are
                                        shared, and memories are created — all
                                        while staying true to our roots.
                                    </p>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="bg-[#080808] text-stone-200 selection:bg-cyan-500/30 selection:text-white">
                {/* --- CHAPTER 2: THE PHILOSOPHY (Bento Grid) --- */}
                <section className="py-32 px-6 md:px-24 max-w-8xl mx-auto">
                    <motion.h3
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2 }}
                        viewport={{ once: true }}
                        className="relative text-2xl md:text-5xl font-serif text-center italic text-gray-600 max-w-5xl mx-auto leading-relaxed"
                    >
                        “Every cup we serve carries a story — of passion, of
                        people, and of quiet moments that turn into lifelong
                        memories.”
                    </motion.h3>

                    {/* divider */}
                    <div className="mt-10 w-36 h-[2px] bg-cyan-400 mx-auto" />
                    <div className="grid grid-cols-1 md:grid-cols-12 mt-20 gap-6">
                        {/* Main Narrative Card */}
                        <motion.div
                            whileInView={{ opacity: 1, y: 0 }}
                            initial={{ opacity: 0, y: 50 }}
                            viewport={{ once: true }}
                            className="md:col-span-8 backdrop-blur-2xl bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-12 md:p-20"
                        >
                            <h2 className="text-4xl md:text-6xl font-serif mb-8 italic text-white">
                                The Precision of the Pour.
                            </h2>
                            <p className="text-stone-400 text-lg md:text-xl leading-relaxed mb-10 font-light">
                                Luxury at Café Anaya isn't just about taste—it's
                                about the{" "}
                                <span className="text-white italic underline underline-offset-8 decoration-cyan-500/50">
                                    provenance of the bean
                                </span>
                                . We use decentralized sourcing methods to
                                verify every single micro-lot, ensuring that our
                                growers are honored and our quality is
                                immutable.
                            </p>
                            <div className="grid grid-cols-2 gap-8 pt-10 border-t border-white/5">
                                <div>
                                    <h4 className="text-cyan-500 font-bold text-2xl">
                                        0.01%
                                    </h4>
                                    <p className="text-[10px] uppercase tracking-widest text-stone-500 mt-2">
                                        Selection Rate
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-cyan-500 font-bold text-2xl">
                                        Direct
                                    </h4>
                                    <p className="text-[10px] uppercase tracking-widest text-stone-500 mt-2">
                                        Farm-to-Cup
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Smaller Decorative Image */}
                        <div className="md:col-span-4 rounded-[2.5rem] overflow-hidden border border-white/10 group">
                            <img
                                src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=1000"
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                            />
                        </div>
                    </div>
                </section>
            </div>
        </MainLayout>
    );
}
