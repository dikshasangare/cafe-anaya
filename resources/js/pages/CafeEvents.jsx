import React from "react";
import MainLayout from "../Layouts/MainLayout";
import { Ticket, Play, ArrowDown, Music2, Clock } from "lucide-react";
import { Reveal } from "../components/Reveal";
import g3 from "../../images/gallery-3.jpg";
import { motion } from "framer-motion";
import { Head } from "@inertiajs/react";

export default function CafeEvents() {
    const events = [
        {
            date: "09",
            month: "MAY",
            day: "Fri",
            title: "Acoustic Sufi Night",
            artist: "Kabir Café Trio",
            time: "08:00 PM",
        },
        {
            date: "17",
            month: "MAY",
            day: "Sat",
            title: "Indie Open Mic",
            artist: "The Quiet Room",
            time: "07:30 PM",
        },
        {
            date: "25",
            month: "MAY",
            day: "Sun",
            title: "Slow Sitar Brunch",
            artist: "Anoushka Roy",
            time: "11:00 AM",
        },
    ];

    return (
        <MainLayout>
            <Head title="Events | Café Anaya" />

            <div className="selection:bg-cyan-500/30">
                {/* --- HERO SECTION (DARK & CINEMATIC) --- */}
                <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden bg-[#030707]">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.15),transparent_70%)]" />
                        <div className="absolute inset-0 bg-[#030707]/60 backdrop-blur-[2px]" />
                        <img
                            src={g3}
                            className="w-full h-full object-cover opacity-40 scale-110"
                            alt="Cafe Mood"
                        />
                    </div>

                    <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center text-center mt-36">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-3 px-5 py-2 rounded-full border border-cyan-500/30 bg-cyan-950/20 backdrop-blur-md mb-8"
                        >
                            <span className="text-cyan-400 text-[10px] tracking-[0.4em] uppercase font-black">
                                Live Performance Schedule
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-6xl md:text-7xl font-serif text-white leading-tight mb-12"
                        >
                            Soul Meets {" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-100">
                                The Sitar.
                            </span>
                        </motion.h1>

                        <div className="flex gap-6">
                            <button className="h-16 w-16 flex items-center justify-center rounded-full bg-cyan-500 text-black hover:bg-cyan-400 hover:scale-110 transition-all shadow-[0_0_30px_rgba(6,182,212,0.4)]">
                                <Play className="fill-current" />
                            </button>
                            <div className="text-left my-auto">
                                <p className="text-white font-bold uppercase tracking-widest text-xs">
                                    Watch Teaser
                                </p>
                                <p className="text-cyan-500/60 text-xs italic">
                                    Acoustic Night '25
                                </p>
                            </div>
                        </div>

                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="flex flex-col items-center gap-2 mt-10 opacity-40 text-white"
                        >
                            <span className="text-[10px] tracking-[0.5em] uppercase">
                                The Schedule
                            </span>
                            <ArrowDown className="w-4 h-4" />
                        </motion.div>
                    </div>
                </section>

                {/* --- EVENTS LIST (CLEAN WHITE AESTHETIC) --- */}
                <section className="bg-white py-32 px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-6">
                            <div className="max-w-xl">
                                <h2 className="text-5xl font-serif text-stone-900 mb-6">
                                    Upcoming{" "}
                                    <span className="italic text-cyan-600">
                                        Encounters
                                    </span>
                                </h2>
                                <p className="text-stone-500 text-lg font-light leading-relaxed">
                                    Curated experiences designed to linger in
                                    your memory. Book your table to ensure the
                                    best acoustic experience.
                                </p>
                            </div>
                            <div className="h-[2px] flex-grow mx-10 bg-cyan-100 hidden lg:block mb-6"></div>
                        </div>

                        <div className="space-y-6">
                            {events.map((e, i) => (
                                <Reveal key={i} delay={i * 100}>
                                    <div className="group relative bg-stone-50 border border-stone-100 rounded-[2.5rem] p-4 transition-all duration-500 hover:bg-white hover:shadow-[0_40px_80px_-20px_rgba(0,180,216,0.15)] hover:border-cyan-200">
                                        <div className="flex flex-col md:flex-row items-center gap-8 p-6 md:p-8">
                                            {/* Date Cylinder */}
                                            <div className="bg-white shadow-sm border border-stone-100 w-24 h-24 rounded-3xl flex flex-col items-center justify-center">
                                                <span className="text-4xl font-serif text-stone-900 leading-none">
                                                    {e.date}
                                                </span>
                                                <span className="text-[10px] uppercase font-black tracking-widest text-cyan-600 mt-1">
                                                    {e.month}
                                                </span>
                                            </div>

                                            {/* Info Block */}
                                            <div className="flex-grow text-center md:text-left">
                                                <div className="flex items-center justify-center md:justify-start gap-4 mb-3">
                                                    <div className="flex items-center gap-2 text-cyan-600 bg-cyan-50 px-3 py-1 rounded-full">
                                                        <Clock className="w-3 h-3" />
                                                        <span className="text-[10px] font-bold uppercase tracking-tight">
                                                            {e.time}
                                                        </span>
                                                    </div>
                                                    <span className="text-stone-300 text-xs tracking-widest uppercase">
                                                        {e.day}
                                                    </span>
                                                </div>
                                                <h3 className="text-3xl font-serif text-stone-900 group-hover:text-cyan-700 transition-colors">
                                                    {e.title}
                                                </h3>
                                                <p className="text-stone-500 mt-1 font-light italic">
                                                    Featuring the soul of{" "}
                                                    <span className="text-stone-800 font-normal">
                                                        {e.artist}
                                                    </span>
                                                </p>
                                            </div>

                                            {/* Action Button */}
                                            <div className="w-full md:w-auto">
                                                <a
                                                    href="/reservations"
                                                    className="w-full flex items-center justify-center gap-3 bg-cyan-600 text-white px-10 py-5 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all hover:bg-stone-900 hover:shadow-xl active:scale-95"
                                                >
                                                    <Ticket className="w-4 h-4" />
                                                    Reserve Seat
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Decorative Footer Detail */}
                <section className="bg-stone-50 py-20 border-t border-stone-100 flex flex-col items-center">
                    <Music2 className="text-cyan-200 w-12 h-12 mb-4" />
                    <p className="text-stone-400 text-xs tracking-[0.5em] uppercase font-medium">
                        Café Anaya Music Culture
                    </p>
                </section>
            </div>
        </MainLayout>
    );
}
