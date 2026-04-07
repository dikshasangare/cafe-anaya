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

/* ===== REALISTIC STEAM ===== */
function Steam() {
    return (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none">
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-20 h-20 bg-[#f5e6d3]/40 rounded-full blur-3xl"
                    style={{
                        left: "50%",
                        x: `${(i - 2) * 25}px`,
                    }}
                    animate={{
                        y: [-10, -160],
                        opacity: [0.7, 0],
                        scale: [0.8, 2],
                        x: [`${(i - 2) * 25}px`, `${(i - 2) * 40}px`],
                    }}
                    transition={{
                        duration: 3 + i * 0.5,
                        repeat: Infinity,
                        delay: i * 0.6,
                        ease: "easeOut",
                    }}
                />
            ))}
        </div>
    );
}

export default function OurStoryPage() {
    const pageRef = useRef(null);
    const journeyRef = useRef(null);

    // ✅ FIXED scroll timing (Basilico style)
    const { scrollYProgress } = useScroll({
        target: pageRef,
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

    // 🛣 Line animation
    const { scrollYProgress: journeyProgress } = useScroll({
        target: journeyRef,
        offset: ["start 80%", "end 20%"],
    });
    const lineProgress = useTransform(journeyProgress, [0, 1], [0, 1]);
    const journeyBg = useTransform(
        journeyProgress,
        [0, 0.5, 1],
        [
            "#080808",
            "#0f172a",
            "#005F78", // cyan theme
        ],
    );
    const data = [
        {
            year: "2014",
            title: "The First Brew",
            desc: "It began with a quiet vision — a space where time slows down.",
            image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
        },
        {
            year: "2018",
            title: "Moments & Memories",
            desc: "We became more than a café. Conversations and stories filled every corner.",
            image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
        },
        {
            year: "Today",
            title: "Refined Experience",
            desc: "Today, we blend tradition with elegance to create unforgettable moments.",
            image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814",
        },
    ];
    const glow = useTransform(lineProgress, [0, 1], [0, 25]);
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
            <section ref={pageRef} className="overflow-hidden">
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

            {/* --- CHAPTER 2: THE PHILOSOPHY (Bento Grid) --- */}
            <div className="bg-[#080808] text-stone-200 selection:bg-cyan-500/30 selection:text-white">
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

            {/* ================= CHAPTER 4 — STORY GRID ================= */}
            <section className="py-20 px-6 md:px-16">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                    {/* TEXT */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <p className="text-sm tracking-[0.4em] uppercase text-cyan-500 mb-4">
                            Our Philosophy
                        </p>

                        <h2 className="text-3xl md:text-5xl font-serif text-gray-800 mb-6 leading-tight">
                            Crafted with Care,
                            <span className="text-cyan-500">
                                {" "}
                                Served with Heart
                            </span>
                        </h2>

                        <p className="text-gray-600 leading-relaxed mb-6">
                            We believe a café is more than just a place to eat —
                            it's where stories unfold, ideas are born, and
                            connections grow naturally.
                        </p>

                        <p className="text-gray-600 leading-relaxed">
                            Every detail, from the aroma of freshly brewed
                            coffee to the warmth of our space, is designed to
                            make you feel present, comfortable, and inspired.
                        </p>
                    </motion.div>

                    {/* IMAGE */}
                    <motion.img
                        src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200"
                        alt=""
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        className="rounded-3xl shadow-xl object-cover"
                    />
                </div>
            </section>

            {/* Our Journey */}

            {/* ===== FIRST SECTION ===== */}
            <motion.div
                ref={journeyRef}
                style={{ backgroundColor: journeyBg }}
                className="relative text-stone-200 overflow-hidden"
            >
                {/* LINE */}
                {/* <div className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 w-[2px] h-full bg-white/50">
                    <motion.div
                        style={{ height: lineProgress }}
                        className="w-full bg-gradient-to-b from-cyan-500 via-cyan-400 to-cyan-500"
                    />
                    </div> */}

                {/* INTRO */}
                <section className="py-32 max-w-6xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                    >
                        <p className="text-xs tracking-[0.6em] uppercase text-cyan-400 mb-4">
                            Our Journey
                        </p>
                        <h2 className="text-4xl md:text-5xl font-semibold text-white">
                            Crafted Over Time
                        </h2>

                        <p className="text-gray-400 pt-4">
                            It all began in 2014 with a simple dream — to create
                            a place where people could slow down.
                        </p>
                    </motion.div>
                </section>
            </motion.div>

            {/* ===== JOURNEY SECTION ===== */}
            <motion.section
                ref={journeyRef}
                style={{ backgroundColor: journeyBg }}
                className="py-40 relative"
            >
                {/* CENTER LINE */}
                <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[2px] h-full">
                    <motion.div
                        style={{
                            scaleY: lineProgress,
                            transformOrigin: "top",
                            boxShadow: useMotionTemplate`0px 0px ${glow}px rgba(34,211,238,0.7)`,
                        }}
                        className="w-full h-full bg-gradient-to-b from-cyan-500 via-cyan-400 to-cyan-500"
                    />
                </div>

                {/* CONTENT */}
                <div className="max-w-6xl mx-auto space-y-40 px-6 relative">
                    {data.map((item, index) => {
                        const isLeft = index % 2 === 0;

                        const cardRef = useRef(null);
                        const isInView = useInView(cardRef, {
                            margin: "-40% 0px -40% 0px",
                        });

                        return (
                            <motion.div
                                ref={cardRef}
                                key={index}
                                animate={{
                                    scale: isInView ? 1.02 : 0.96,
                                    opacity: isInView ? 1 : 0.5,
                                }}
                                transition={{ duration: 0.5 }}
                                className="grid md:grid-cols-2 gap-16 items-center relative"
                            >
                                {/* DOT */}
                                <motion.div
                                    animate={{
                                        scale: isInView ? 1.5 : 1,
                                        backgroundColor: isInView
                                            ? "#22d3ee"
                                            : "#444",
                                        boxShadow: isInView
                                            ? "0px 0px 20px rgba(34,211,238,0.8)"
                                            : "none",
                                    }}
                                    className="hidden md:block absolute left-1/2 md:-ml-[7px] -translate-x-1/2 w-4 h-4 rounded-full z-20"
                                />

                                {/* IMAGE */}
                                <motion.div
                                    animate={{
                                        boxShadow: isInView
                                            ? "0px 0px 40px rgba(34,211,238,0.25)"
                                            : "none",
                                    }}
                                    className={`relative h-[420px] rounded-3xl overflow-hidden ${
                                        isLeft
                                            ? "md:ml-10"
                                            : "md:order-2 md:mr-10"
                                    }`}
                                >
                                    <img
                                        src={`${item.image}?auto=format&fit=crop&w=1200&q=80`}
                                        className="w-full h-full object-cover"
                                    />

                                    {index === data.length - 1 && <Steam />}

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                </motion.div>

                                {/* TEXT */}
                                <motion.div
                                    animate={{ y: isInView ? 0 : 20 }}
                                    className={isLeft ? "md:pr-10" : "md:pl-10"}
                                >
                                    <p
                                        className={`text-sm mb-2 ${
                                            isInView
                                                ? "text-cyan-300"
                                                : "text-cyan-500/60"
                                        }`}
                                    >
                                        {item.year}
                                    </p>

                                    <h3
                                        className={`text-3xl font-semibold mb-4 ${
                                            isInView
                                                ? "text-white"
                                                : "text-gray-500"
                                        }`}
                                    >
                                        {item.title}
                                    </h3>

                                    <p
                                        className={`${
                                            isInView
                                                ? "text-stone-300"
                                                : "text-gray-600"
                                        }`}
                                    >
                                        {item.desc}
                                    </p>

                                    <motion.div
                                        animate={{
                                            width: isInView ? "80px" : "40px",
                                            opacity: isInView ? 1 : 0.4,
                                        }}
                                        className="mt-6 h-[2px] bg-cyan-400"
                                    />
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.section>
            {/* Our Journey end */}

            {/* ================= CHAPTER 6 — FINAL CTA ================= */}
            <section className="py-24 flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
                {/* glow */}
                <div className="absolute w-[400px] h-[400px] bg-cyan-200/40 blur-[120px] rounded-full" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="relative z-10"
                >
                    <h2 className="text-3xl md:text-6xl font-serif text-gray-800 mb-6">
                        Be Part of Our Story
                    </h2>

                    <p className="text-gray-600 max-w-xl mb-10">
                        Step into a space designed for comfort, connection, and
                        calm. Your story becomes a part of ours with every
                        visit.
                    </p>

                    <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href="/"
                        className="px-8 py-4 rounded-full bg-cyan-500 text-white font-semibold shadow-lg hover:bg-cyan-600 transition"
                    >
                        Visit Café
                    </motion.a>
                </motion.div>
            </section>
        </MainLayout>
    );
}
