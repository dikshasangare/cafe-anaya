import React from "react";
import { Head, Link } from "@inertiajs/react";
import {
    ArrowLeft,
    Leaf,
    Clock,
    Flame,
    ChefHat,
    Star,
    GraduationCap,
    Calendar,
    Compass,
} from "lucide-react";

import MainLayout from "../Layouts/MainLayout";
import { Reveal } from "../components/Reveal";
import { motion } from "framer-motion";

export default function CafeMenuDetail({
    menu,
    related = [],
    ingredients = [],
}) {
    if (!menu) {
        return (
            <MainLayout>
                <section className="mx-auto max-w-2xl px-6 py-32 text-center">
                    <p className="text-xs uppercase tracking-[0.3em] text-primary">
                        404
                    </p>

                    <h1 className="mt-3 font-serif text-4xl">Dish not found</h1>

                    <p className="mt-3 text-muted-foreground">
                        The plate you're looking for has left the pass.
                    </p>

                    <Link
                        href="/cafe-menu"
                        className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground shadow-soft transition hover:bg-primary/90"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to menu
                    </Link>
                </section>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <Head title="Menu | Café Anaya" />

            <div className="relative overflow-hidden font-sans text-[#f5f5f4] bg-gradient-to-b from-[#06141a] via-[#081b22] to-[#020617] min-h-screen">
                <section className="relative overflow-hidden px-6 pt-52 pb-20 text-center">
                    {/* Glow */}
                    <div className="absolute top-20 left-1/2 h-[35rem] w-[35rem] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[180px]" />

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="relative z-10 mx-auto max-w-4xl"
                    >
                        <p className="text-xs uppercase tracking-[0.5em] text-cyan-400">
                            Café Anaya Menu
                        </p>

                        <h1 className="mt-6 font-serif inline-flex text-5xl leading-tight md:text-6xl">
                            Slow Food.&nbsp;
                            <span className="block italic text-cyan-400">
                                Soulful Sips.
                            </span>
                        </h1>

                        <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-stone-300">
                            Experience handcrafted vegetarian dishes, artisan
                            coffee, signature mocktails, comforting bowls, and
                            indulgent desserts — thoughtfully curated for
                            unforgettable moments.
                        </p>

                        {/* Bottom Line */}
                        <div className="mt-10 flex justify-center">
                            <div className="h-[2px] w-40 rounded-full bg-gradient-to-r from-cyan-200 via-cyan-500 to-cyan-200" />
                        </div>
                    </motion.div>
                </section>
                {/* Custom Keyframes & Global Styles */}
                <style>{` @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400;500&display=swap');
          .font-playfair { font-family: 'Playfair Display', serif; }
                    .font-inter { font-family: 'Inter', sans-serif; }

                    @keyframes wordPop {
                    to { opacity: 1; transform: translateY(0); }
                    }
                    @keyframes ringRotate {
                    to { transform: rotate(360deg); }
                    }
                    @keyframes scanMove {
                    0% { top: 0%; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { top: 100%; opacity: 0; }
                    }
                    @keyframes glyphFloat {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-8px); }
                    }
                    @keyframes shadowSync {
                    0%, 100% { transform: scaleX(1); opacity: 0.5; }
                    50% { transform: scaleX(0.65); opacity: 0.25; }
                    }
                    @keyframes sigPulse {
                    0%, 100% { box-shadow: 0 0 0 0 rgba(34,211,238,0.3); }
                    50% { box-shadow: 0 0 0 6px rgba(34,211,238,0); }
                    }

                    .animate-word {
                    display: inline-block;
                    opacity: 0;
                    transform: translateY(22px);
                    animation: wordPop .55s cubic-bezier(.16,1,.3,1) forwards;
                    }
                    .scan-line {
                    position: absolute;
                    left: 0; right: 0; height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(34,211,238,0.25), transparent);
                    animation: scanMove 4s ease-in-out infinite;
                    }
                `}</style>

                {/* AMBIENT ORBS */}
                <div className="absolute top-[-160px] left-[-80px] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.07)_0%,transparent_65%)] pointer-events-none z-0"></div>
                <div className="absolute top-[40px] right-[-100px] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.05)_0%,transparent_65%)] pointer-events-none z-0"></div>

                <div className="relative z-10">
                    {/* NAVIGATION */}
                    <div className="flex items-center justify-between px-7 py-3.5 border-b border-white/10 bg-black/5">
                        <Link
                            href="/cafe-menu"
                            className="flex items-center gap-2 text-[11px] text-[#22d3ee] transition-colors tracking-tight"
                        >
                            <ArrowLeft size={14} />
                            Back to menu
                        </Link>
                        <div className="text-[10px] tracking-[0.3em] uppercase text-[#57534e]">
                            Comfort Bowls
                        </div>
                    </div>

                    {/* MAIN PRODUCT GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 border-b border-white/10">
                        {/* IMAGE COLUMN */}
                        <div className="border-r border-white/10 relative p-5 pb-0 md:pb-5">
                            {/* Add 'group' to the parent container to control child hover states */}
                            <div className="aspect-[4/5] bg-[#081b22] rounded-t-full border border-white/15 overflow-hidden relative group">
                                {/* The Image: Always visible */}
                                <img
                                    src={`/storage/${menu.image}`}
                                    alt={menu.name}
                                    className="absolute inset-0 w-full h-full  z-0 transition-transform duration-700 group-hover:scale-105"
                                />

                                {/* The Overlay: Visible by default, fades out on hover */}
                                <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#081b22]/80 via-[#0d2530]/60 to-[#081b22]/80 transition-opacity duration-500 ease-in-out group-hover:opacity-0 z-10">
                                    {/* Shadow effect remains to give depth to the container when not hovered */}
                                    <div className="w-20 h-2 bg-black/50 rounded-[50%] mt-32 blur-[5px] animate-[shadowSync_5s_ease-in-out_infinite]"></div>
                                </div>
                            </div>

                            {/* Badges */}
                            <div className="absolute top-8 left-8 z-30 flex flex-col gap-1.5">
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#06141a]/85 border border-white/15 text-[9px] font-medium tracking-wider uppercase backdrop-blur-md text-[#4ade80]">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] shadow-[0_0_5px_rgba(74,222,128,0.6)]"></span>
                                    Pure Veg
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#06141a]/85 border border-white/15 text-[9px] font-medium tracking-wider uppercase backdrop-blur-md text-[#22d3ee]">
                                    <Leaf size={11} />
                                    Jain
                                </span>
                            </div>
                            <span className="absolute top-8 right-8 z-30 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#06141a]/90 border border-[#22d3ee]/50 text-[9px] font-medium tracking-[0.2em] uppercase text-[#22d3ee] animate-[sigPulse_2.5s_ease-in-out_infinite]">
                                <Star size={11} />
                                Signature
                            </span>
                        </div>

                        {/* CONTENT COLUMN */}
                        <div className="p-7 md:p-9 flex flex-col">
                            <div className="text-[9px] font-medium tracking-[0.45em] uppercase text-[#22d3ee] mb-2.5">
                                Comfort Bowls
                            </div>
                            <h2 className="font-playfair text-4xl md:text-[42px] leading-[1.05] mb-1">
                                Forest Mushroom <br />
                                <em className="italic text-[#22d3ee] font-normal">
                                    Risotto
                                </em>
                            </h2>

                            <div className="flex items-center gap-2.5 my-4.5 py-4">
                                <div className="flex-1 h-px bg-gradient-to-r from-[#22d3ee]/40 to-transparent"></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-[#22d3ee] shadow-[0_0_6px_rgba(34,211,238,0.6)]"></div>
                                <div className="flex-1 h-px bg-gradient-to-l from-[#22d3ee]/40 to-transparent"></div>
                            </div>

                            <p className="text-[13px] font-light leading-relaxed text-[#a8a29e] mb-5.5">
                                A velvety Arborio rice slow-cooked in a fragrant
                                forest mushroom broth, finished with truffle
                                oil, aged parmesan, and a garnish of
                                herb-infused microgreens. Every bite is a
                                journey through autumnal woodland depths.
                            </p>

                            <div className="flex items-baseline gap-3 mt-3 mb-7">
                                <div className="font-playfair text-5xl text-[#22d3ee] drop-shadow-[0_0_30px_rgba(34,211,238,0.3)]">
                                    ₹420
                                </div>
                                <div className="text-[10px] tracking-widest uppercase text-[#57534e]">
                                    per plate · taxes extra
                                </div>
                            </div>

                            {/* Info Cards */}
                            <div className="grid grid-cols-3 gap-2 mb-6">
                                {[
                                    {
                                        icon: <Clock size={15} />,
                                        label: "Serves in",
                                        val: "12–15 min",
                                    },
                                    {
                                        icon: <Flame size={15} />,
                                        label: "Spice",
                                        val: "Mild",
                                    },
                                    {
                                        icon: <GraduationCap size={15} />,
                                        label: "Style",
                                        val: "Jain Sattvic",
                                    },
                                ].map((item, i) => (
                                    <div
                                        key={i}
                                        className="bg-white/[0.03] border border-white/10 rounded-2xl p-3.5 text-center transition-all hover:bg-[#22d3ee]/5 hover:border-[#22d3ee]/40 hover:-translate-y-0.5"
                                    >
                                        <span className="text-[#22d3ee] mb-1.5 block flex justify-center">
                                            {item.icon}
                                        </span>
                                        <div className="text-[8px] font-medium tracking-widest uppercase text-[#57534e] mb-0.5">
                                            {item.label}
                                        </div>
                                        <div className="text-[12px] text-[#d6d3d1]">
                                            {item.val}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <h3 className="font-playfair text-xl text-[#f5f5f4] mb-3">
                                Inside the plate
                            </h3>
                            <div className="grid grid-cols-2 mb-6 text-[11px] text-[#a8a29e]">
                                {[
                                    "Arborio rice",
                                    "Forest mushrooms",
                                    "Truffle oil",
                                    "Aged parmesan",
                                    "Vegetable broth",
                                    "Microgreens",
                                    "White wine",
                                    "Shallots",
                                ].map((ing, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-2 py-1.5 border-b border-white/5 hover:text-[#d6d3d1] transition-colors"
                                    >
                                        <div className="w-1 h-1 rounded-full bg-[#22d3ee] shadow-[0_0_5px_rgba(34,211,238,0.5)]"></div>
                                        {ing}
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-2.5">
                                <button className="flex items-center gap-2 px-5.5 py-2.5 rounded-full bg-[#22d3ee] text-[#020617] text-[11px] font-medium tracking-wider uppercase transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(34,211,238,0.35)] hover:bg-[#67e8f9]">
                                    <Calendar size={14} /> Reserve a table
                                </button>
                                <button className="flex items-center gap-2 px-5.5 py-2.5 rounded-full border border-white/15 text-[#a8a29e] text-[11px] font-normal tracking-wider uppercase transition-all hover:border-white/30 hover:bg-white/5 hover:text-[#d6d3d1]">
                                    <Compass size={14} /> Explore more
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 border-b border-white/10">
                        {/* IMAGE COLUMN */}
                        <div className="border-r border-white/10 relative p-5 pb-0 md:pb-5">
                            <div className="aspect-[4/5] bg-[#081b22] rounded-t-full border border-white/15 overflow-hidden relative group">
                                {/* Dynamic Image */}
                                <img
                                    src={`/storage/${menu.image}`}
                                    alt={menu.name}
                                    className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 group-hover:scale-105"
                                />

                                {/* The Overlay */}
                                <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#081b22]/80 via-[#0d2530]/60 to-[#081b22]/80 transition-opacity duration-500 ease-in-out group-hover:opacity-0 z-10">
                                    <div className="w-20 h-2 bg-black/50 rounded-[50%] mt-32 blur-[5px] animate-[shadowSync_5s_ease-in-out_infinite]"></div>
                                </div>
                            </div>

                            {/* Badges - Dynamic based on database flags */}
                            <div className="absolute top-8 left-8 z-30 flex flex-col gap-1.5">
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#06141a]/85 border border-white/15 text-[9px] font-medium tracking-wider uppercase backdrop-blur-md text-[#4ade80]">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] shadow-[0_0_5px_rgba(74,222,128,0.6)]"></span>
                                    Pure Veg
                                </span>
                                {menu.is_jain && (
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#06141a]/85 border border-white/15 text-[9px] font-medium tracking-wider uppercase backdrop-blur-md text-[#22d3ee]">
                                        <Leaf size={11} />
                                        Jain Friendly
                                    </span>
                                )}
                            </div>

                            {/* Signature Badge - Conditional */}
                            {menu.is_signature && (
                                <span className="absolute top-8 right-8 z-30 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#06141a]/90 border border-[#22d3ee]/50 text-[9px] font-medium tracking-[0.2em] uppercase text-[#22d3ee] animate-[sigPulse_2.5s_ease-in-out_infinite]">
                                    <Star size={11} />
                                    Signature
                                </span>
                            )}
                        </div>

                        {/* CONTENT COLUMN */}
                        <div className="p-7 md:p-9 flex flex-col">
                            <div className="text-[9px] font-medium tracking-[0.45em] uppercase text-[#22d3ee] mb-2.5">
                                {menu.category?.name || "Menu Item"}
                            </div>

                            <h2 className="font-playfair text-4xl md:text-[42px] leading-[1.05] mb-1">
                                {menu.name}
                            </h2>

                            <div className="flex items-center gap-2.5 my-4.5 py-4">
                                <div className="flex-1 h-px bg-gradient-to-r from-[#22d3ee]/40 to-transparent"></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-[#22d3ee] shadow-[0_0_6px_rgba(34,211,238,0.6)]"></div>
                                <div className="flex-1 h-px bg-gradient-to-l from-[#22d3ee]/40 to-transparent"></div>
                            </div>

                            <p className="text-[13px] font-light leading-relaxed text-[#a8a29e] mb-5.5">
                                {menu.description}
                            </p>

                            <div className="flex items-baseline gap-3 mt-3 mb-7">
                                <div className="font-playfair text-5xl text-[#22d3ee] drop-shadow-[0_0_30px_rgba(34,211,238,0.3)]">
                                    ₹{menu.price}
                                </div>
                                <div className="text-[10px] tracking-widest uppercase text-[#57534e]">
                                    per plate · taxes extra
                                </div>
                            </div>

                            {/* Info Cards - Dynamic */}
                            <div className="grid grid-cols-3 gap-2 mb-6">
                                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-3.5 text-center transition-all hover:bg-[#22d3ee]/5 hover:border-[#22d3ee]/40 hover:-translate-y-0.5">
                                    <span className="text-[#22d3ee] mb-1.5 block flex justify-center">
                                        <Clock size={15} />
                                    </span>
                                    <div className="text-[8px] font-medium tracking-widest uppercase text-[#57534e] mb-0.5">
                                        Serves in
                                    </div>
                                    <div className="text-[12px] text-[#d6d3d1]">
                                        {menu.preparation_time} min
                                    </div>
                                </div>
                                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-3.5 text-center transition-all hover:bg-[#22d3ee]/5 hover:border-[#22d3ee]/40 hover:-translate-y-0.5">
                                    <span className="text-[#22d3ee] mb-1.5 block flex justify-center">
                                        <Flame size={15} />
                                    </span>
                                    <div className="text-[8px] font-medium tracking-widest uppercase text-[#57534e] mb-0.5">
                                        Spice
                                    </div>
                                    <div className="text-[12px] text-[#d6d3d1]">
                                        {menu.spice_level ?? "Sweet"}
                                    </div>
                                </div>
                                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-3.5 text-center transition-all hover:bg-[#22d3ee]/5 hover:border-[#22d3ee]/40 hover:-translate-y-0.5">
                                    <span className="text-[#22d3ee] mb-1.5 block flex justify-center">
                                        <GraduationCap size={15} />
                                    </span>
                                    <div className="text-[8px] font-medium tracking-widest uppercase text-[#57534e] mb-0.5">
                                        Style
                                    </div>
                                    <div className="text-[12px] text-[#d6d3d1]">
                                        {menu.cooking_style}
                                    </div>
                                </div>
                            </div>

                            <h3 className="font-playfair text-xl text-[#f5f5f4] mb-3">
                                Inside the plate
                            </h3>
                            <div className="grid grid-cols-2 mb-6 text-[11px] text-[#a8a29e]">
                                {/* Splits string by comma if your DB stores ingredients as "Item1, Item2" */}
                                {menu.ingredients?.split(",").map((ing, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-2 py-1.5 border-b border-white/5 hover:text-[#d6d3d1] transition-colors"
                                    >
                                        <div className="w-1 h-1 rounded-full bg-[#22d3ee] shadow-[0_0_5px_rgba(34,211,238,0.5)]"></div>
                                        {ing.trim()}
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-2.5">
                                <button className="flex items-center gap-2 px-5.5 py-2.5 rounded-full bg-[#22d3ee] text-[#020617] text-[11px] font-medium tracking-wider uppercase transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(34,211,238,0.35)] hover:bg-[#67e8f9]">
                                    <Calendar size={14} /> Reserve a table
                                </button>
                                <button className="flex items-center gap-2 px-5.5 py-2.5 rounded-full border border-white/15 text-[#a8a29e] text-[11px] font-normal tracking-wider uppercase transition-all hover:border-white/30 hover:bg-white/5 hover:text-[#d6d3d1]">
                                    <Compass size={14} /> Explore more
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* RELATED SECTION */}
                    <div className="p-7 md:p-9 pb-12">
                        <div className="flex justify-between items-end mb-5.5">
                            <div>
                                <div className="text-[9px] tracking-[0.4em] uppercase text-[#22d3ee] mb-1">
                                    More from
                                </div>
                                <div className="font-playfair text-[28px] text-[#f5f5f4]">
                                    {menu.category?.name}
                                </div>
                            </div>
                            <Link
                                href="/cafe-menu"
                                className="text-sm text-muted-foreground transition hover:text-primary"
                            >
                                View all →
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mt-10">
                            {related.map((r, i) => (
                                <Link href={`/cafe-menu/${r.slug}`} key={i}>
                                    <div className="group overflow-hidden rounded-[24px] border border-white/10 bg-[#081b22]/60 hover:-translate-y-1 hover:border-[#22d3ee]/20 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] transition-all duration-500 cursor-pointer">
                                        {/* Image Container: Removed scale-105 from here to prevent overlap issues */}
                                        <div className="aspect-[4/3] bg-[#081b22] overflow-hidden relative opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                                            <img
                                                src={`/storage/${r.image}`}
                                                alt={r.name}
                                                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                            />
                                        </div>

                                        {/* Text Container: Ensure it has a background or relative positioning */}
                                        <div className="relative z-10 flex justify-between items-center p-4 px-5 bg-[#081b22]/60">
                                            <span className="font-playfair text-sm text-[#d6d3d1]">
                                                {r.name}
                                            </span>
                                            <span className="font-playfair text-sm text-[#22d3ee]">
                                                ₹{r.price}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
