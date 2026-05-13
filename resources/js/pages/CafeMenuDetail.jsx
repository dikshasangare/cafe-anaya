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
    Sparkles,
    ArrowUpRight,
} from "lucide-react";

import MainLayout from "../Layouts/MainLayout";
import { Reveal } from "../components/Reveal";
import { motion } from "framer-motion";

export default function CafeMenuDetail({
    menu,
    related = [],
    ingredients = [],
    pairing = [],
}) {
    if (!menu) {
        return (
            <MainLayout>
                <section className="mx-auto max-w-2xl px-6 py-32 text-center">
                    <p className="text-xs uppercase tracking-[0.3em] text-[oklch(0.68_0.13_210)]">
                        404
                    </p>

                    <h1 className="mt-3 text-4xl">Dish not found</h1>

                    <p className="mt-3 text-muted-[oklch(0.22_0.04_235)]">
                        The plate you're looking for has left the pass.
                    </p>

                    <Link
                        href="/cafe-menu"
                        className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm text-[oklch(0.68_0.13_210)]-oklch(0.22_0.04_235) shadow-soft transition hover:bg-primary/90"
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
                {/* Custom Keyframes & Global Styles */}
                <style>{` @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400;500&display=swap');
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

                <div className="relative z-10 mt-36 mb-14">
                    {/* NAVIGATION */}
                    <div className="flex items-center justify-between px-7 py-3.5 border-b border-white/10 bg-black/5">
                        <Link
                            href="/cafe-menu"
                            className="flex items-center gap-2 text-[14px] text-[#22d3ee] transition-colors tracking-wider"
                        >
                            <ArrowLeft size={14} />
                            Back to menu
                        </Link>
                        <div className="text-[11px] tracking-[0.3em] uppercase text-[#57534e]">
                            Comfort {menu.category?.name}
                        </div>
                    </div>

                    {/* MAIN PRODUCT GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 border-b border-white/10">
                        {/* IMAGE COLUMN */}
                        <div className="border-r border-white/10 relative p-5 pb-0 md:pb-5">
                            <Reveal className="max-w-xl relative ">
                                <div className="relative">
                                    <div className="relative overflow-hidden rounded-[2.5rem] shadow-warm border border-white/15 arch-frame group">
                                        <img
                                            src={`/storage/${menu.image}`}
                                            alt={menu.name}
                                            className="w-full aspect-[4/5] object-cover animate-ken-burns"
                                        />
                                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                                    </div>

                                    {/* Tiny rating row */}
                                    <div className="mt-8 flex items-center gap-3 text-xs text-muted-[oklch(0.22_0.04_235)]">
                                        <div className="flex items-center gap-0.5 text-[oklch(0.68_0.13_210)]">
                                            {[
                                                ...Array(
                                                    Math.round(
                                                        menu.rating || 5,
                                                    ),
                                                ),
                                            ].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className="h-3.5 w-3.5 fill-current"
                                                />
                                            ))}
                                        </div>

                                        <span className="flex items-center tracking-wider text-sm gap-2">
                                            <span>{menu.rating || 4.9}</span>
                                            <span className="w-1 h-1 rounded-full bg-[#22d3ee] shadow-[0_0_6px_rgba(34,211,238,0.6)]"></span>
                                            <span>loved by</span>
                                            <span>
                                                {(
                                                    1000 +
                                                    menu.id * 137
                                                ).toLocaleString()}
                                                + guests
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </Reveal>

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

                            {Number(menu.signature) === 1 && (
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

                            <h2 className="text-4xl md:text-[49px] tracking-widest leading-[1.05] mb-1">
                                {menu.name}
                            </h2>

                            <div className="flex items-center gap-2.5 my-3 py-4">
                                <div className="flex-1 h-px bg-gradient-to-r from-[#22d3ee]/40 to-transparent"></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-[#22d3ee] shadow-[0_0_6px_rgba(34,211,238,0.6)]"></div>
                                <div className="flex-1 h-px bg-gradient-to-l from-[#22d3ee]/40 to-transparent"></div>
                            </div>

                            <p className="text-[17px] font-light tracking-widest leading-relaxed text-[#a8a29e] mb-5.5">
                                "{menu.short_description}"
                            </p>
                            <p className="text-[13px] font-light tracking-widest leading-relaxed text-[#a8a29e] mt-3 mb-5">
                                {menu.description}
                            </p>

                            {/* Info Cards - Dynamic */}
                            <div className="grid grid-cols-3 gap-2 mt-8">
                                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-3.5 text-center transition-all hover:bg-[#22d3ee]/5 hover:border-[#22d3ee]/40 hover:-translate-y-0.5 ">
                                    <span className="mb-1.5 flex justify-center">
                                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#22d3ee]/10 text-[#22d3ee]">
                                            <Clock size={15} />
                                        </span>
                                    </span>
                                    <div className="text-[12px] font-medium tracking-widest uppercase text-cyan-400 my-1">
                                        Serves in
                                    </div>
                                    <div className="text-[12px] text-[#d6d3d1]">
                                        {menu.preparation_time} min
                                    </div>
                                </div>
                                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-3.5 text-center transition-all hover:bg-[#22d3ee]/5 hover:border-[#22d3ee]/40 hover:-translate-y-0.5 space-y-2">
                                    <span className="mb-1.5 flex justify-center">
                                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#22d3ee]/10 text-[#22d3ee]">
                                            <Flame size={15} />
                                        </span>
                                    </span>
                                    <div className="text-[12px] font-medium tracking-widest uppercase text-cyan-400 my-1">
                                        Spice
                                    </div>
                                    <div className="text-[12px] text-[#d6d3d1]">
                                        {menu.spice_level ?? "Sweet"}
                                    </div>
                                </div>
                                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-3.5 text-center transition-all hover:bg-[#22d3ee]/5 hover:border-[#22d3ee]/40 hover:-translate-y-0.5 space-y-2">
                                    <span className="mb-1.5 flex justify-center">
                                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#22d3ee]/10 text-[#22d3ee]">
                                            <GraduationCap size={15} />
                                        </span>
                                    </span>
                                    <div className="text-[12px] font-medium tracking-widest uppercase text-cyan-400 my-1">
                                        Style
                                    </div>
                                    <div className="text-[12px] whitespace-nowrap overflow-hidden text-ellipsis text-[#d6d3d1]">
                                        {menu.cooking_style}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2.5 mt-10">
                                <Link
                                    href="/reservations"
                                    className="flex items-center gap-2 px-5 py-4 rounded-full bg-[#22d3ee] text-[#020617] text-[11px] font-medium tracking-wider uppercase transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(34,211,238,0.35)] hover:bg-[#67e8f9]"
                                >
                                    <Calendar size={14} /> Reserve a table
                                </Link>
                                <Link
                                    href="/cafe-menus"
                                    className="flex items-center gap-2 px-5 py-4 rounded-full border border-white/15 text-[#a8a29e] text-[11px] font-normal tracking-wider uppercase transition-all hover:border-white/30 hover:bg-white/5 hover:text-[#d6d3d1] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(34,211,238,0.35)]"
                                >
                                    <Compass size={14} /> Explore more
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Story + Ingredients band */}
                    <section className="relative mx-auto max-w-7xl px-6 py-24 lg:px-10 border-b border-white/10">
                        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
                            <Reveal className="lg:col-span-7">
                                <p className="text-[11px] uppercase tracking-[0.35em] text-[oklch(0.68_0.13_210)]">
                                    The Story
                                </p>
                                <h2 className="mt-3 text-4xl md:text-5xl text-balance leading-[1.05]">
                                    Slow craft, soulful sourcing.
                                </h2>
                                <div className="ornament-line my-7" />
                                <div className="space-y-5 text-[#a8a29e]  leading-relaxed tracking-widest">
                                    <p>
                                        Each plate at Cafe Anaya is a quiet
                                        conversation between memory and
                                        modernity.{" "}
                                        <span className="italic text-[oklch(0.68_0.13_210)]">
                                            {menu.name}
                                        </span>{" "}
                                        begins at our morning market run —
                                        picking the firmest produce, the
                                        freshest herbs, the spices that still
                                        smell of sun.
                                    </p>
                                    <p>
                                        Our chefs build it slowly through the
                                        day: tempering, resting, plating. No
                                        shortcuts. No artificial colour. Just
                                        earth, fire, and a little bit of poetry.
                                    </p>
                                </div>

                                <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
                                    {[
                                        { k: "Local", v: "Farm sourced" },
                                        { k: "Hand", v: "Crafted daily" },
                                        { k: "Pure", v: "100% Veg" },
                                        { k: "Seasonal", v: "Menu rotated" },
                                    ].map((b) => (
                                        <div
                                            key={b.k}
                                            className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center"
                                        >
                                            <p className="text-2xl text-[oklch(0.68_0.13_210)]">
                                                {b.k}
                                            </p>
                                            <p className="mt-2 mb-3 text-[10px] uppercase tracking-[0.3em] text-muted-[oklch(0.22_0.04_235)]">
                                                {b.v}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </Reveal>

                            <Reveal
                                delay={120}
                                className="lg:col-span-5 shadow-[0_25px_80px_rgba(6,182,212,0.12)]"
                            >
                                <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.03] backdrop-blur p-8 shadow-soft overflow-hidden  ">
                                    <div className="absolute inset-0 paisley opacity-40 pointer-events-none" />
                                    <div className="relative">
                                        <p className="text-[11px] uppercase tracking-[0.35em] text-[oklch(0.68_0.13_210)]">
                                            Inside the plate
                                        </p>
                                        <h3 className="mt-2 text-3xl">
                                            Ingredients
                                        </h3>
                                        <div className="ornament-line my-5" />
                                        <ul className="space-y-3">
                                            {menu.ingredients?.map((ing, i) => (
                                                <li
                                                    key={ing}
                                                    className="flex items-start gap-3 text-sm tracking-widest text-[oklch(0.22_0.04_235)]/85"
                                                >
                                                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[oklch(0.68_0.13_210)] shrink-0" />
                                                    <span>
                                                        <span className="text-gray-500/60 mr-2">
                                                            {String(
                                                                i + 1,
                                                            ).padStart(2, "0")}
                                                        </span>
                                                        {ing}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="mt-7 rounded-xl border border-dashed tracking-widest border-[oklch(0.68_0.13_210)]/30 bg-cyan-500/10 p-4 text-sm text-[oklch(0.22_0.04_235)]/70">
                                            <span className="italic text-[oklch(0.68_0.13_210)]">
                                                Allergens:{" "}
                                            </span>
                                            Contains dairy. May contain traces
                                            of nuts. Please inform our team of
                                            any dietary needs.
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    </section>

                    {/* chef pairing */}
                    <div className="p-7 md:px-9 pb-16 pt-10 border-b border-white/10">
                        <div className="flex flex-col items-center text-center mb-5.5">
                            <div className="text-[12px] tracking-[0.4em] uppercase text-[#22d3ee] mb-1">
                                Chef's Pairing
                            </div>

                            <div className="text-[40px] tracking-widest capitalize text-[#f5f5f4]">
                                Goes beautifully with
                            </div>
                        </div>

                        <div className="flex items-center justify-center my-6">
                            <div className="w-48 h-px bg-gradient-to-r from-transparent via-[#22d3ee]/50 to-transparent" />

                            <div className="mx-3 w-2 h-2 rounded-full bg-[#22d3ee] shadow-[0_0_10px_rgba(34,211,238,0.6)]" />

                            <div className="w-48 h-px bg-gradient-to-l from-transparent via-[#22d3ee]/50 to-transparent" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mt-16">
                            {pairing.map((rpairingData, i) => (
                                <Link
                                    href={`/cafe-menu/${rpairingData.slug}`}
                                    key={i}
                                >
                                    <div className="group overflow-hidden rounded-[24px] border border-white/10 bg-[#081b22]/60 hover:-translate-y-1 hover:border-[#22d3ee]/20 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] transition-all duration-500 cursor-pointer">
                                        {/* Image Container: Removed scale-105 from here to prevent overlap issues */}
                                        <div className="aspect-[4/3] bg-[#081b22] overflow-hidden relative opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                                            <img
                                                src={`/storage/${rpairingData.image}`}
                                                alt={rpairingData.name}
                                                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                            />
                                        </div>

                                        {/* Text Container: Ensure it has a background or relative positioning */}
                                        <div className="text-[14px] tracking-[0.2em] capitalize text-[#22d3ee] px-5 pt-5 bg-[#081b22]/60">
                                            {rpairingData.category?.name}
                                        </div>

                                        <div className="relative z-10 flex justify-between items-center pb-5 px-5 bg-[#081b22]/60">
                                            <span className="text-xl text-[#d6d3d1]">
                                                {rpairingData.name}
                                            </span>
                                            <span className="text-sm text-[#22d3ee]">
                                                ₹{rpairingData.price}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* RELATED SECTION */}
                    <div className="p-7 md:p-9 pb-12">
                        <div className="flex justify-between items-end mb-5.5">
                            <div>
                                <div className="text-[9px] tracking-[0.4em] uppercase text-[#22d3ee] mb-1">
                                    More from
                                </div>
                                <div className="text-[28px] text-[#f5f5f4] tracking-widest capitalize">
                                    {menu.category?.name}
                                </div>
                            </div>
                            <Link
                                href="/cafe-menu"
                                className="text-sm text-muted-[oklch(0.22_0.04_235)] transition hover:text-[oklch(0.68_0.13_210)] tracking-widest capitalize"
                            >
                                View Full Menu →
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
                                            <span className="text-sm tracking-widest capitalize text-[#d6d3d1]">
                                                {r.name}
                                            </span>
                                            <span className="text-sm text-[#22d3ee]">
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

            {/* table await section */}
            <section className="relative bg-[#f4fbfb] text-[#062b2f] py-10 px-6 overflow-hidden">
                {/* Soft Cyan Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-cyan-300/20 blur-[140px] rounded-full" />

                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-200/20 blur-[140px] rounded-full" />

                {/* Noise Texture */}
                <div className="absolute inset-0 opacity-[0.03] mix-blend-soft-light bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                <div className="relative max-w-5xl mx-auto ">
                    <div className="relative bg-white/70 border border-cyan-400/60 backdrop-blur-3xl rounded-[2.5rem] p-12  overflow-hidden">
                        <div className="absolute top-[-120px] left-[-80px] h-72 w-72 rounded-full bg-[#22d3ee]/10 blur-3xl" />
                        <div className="absolute bottom-[-120px] right-[-80px] h-80 w-80 rounded-full bg-[#22d3ee]/5 blur-3xl" />

                        <div className="text-center">
                            {/* small label */}
                            <p className="text-[11px] uppercase tracking-[0.4em] text-cyan-600">
                                A table awaits
                            </p>

                            {/* heading */}
                            <h2 className="mt-5 text-4xl md:text-6xl tracking-wide capitalize text-gray-600 leading-[1.05]">
                                Taste it the way it's meant to be.
                            </h2>

                            {/* divider */}
                            <div className="flex items-center justify-center my-6">
                                <div className="w-48 h-px bg-gradient-to-r from-transparent via-[#22d3ee]/50 to-transparent" />

                                <div className="mx-3 w-2 h-2 rounded-full bg-[#22d3ee] shadow-[0_0_10px_rgba(34,211,238,0.6)]" />

                                <div className="w-48 h-px bg-gradient-to-l from-transparent via-[#22d3ee]/50 to-transparent" />
                            </div>

                            {/* description */}
                            <p className="mx-auto max-w-md text-sm md:text-xl text-gray-600 tracking-wide leading-relaxed">
                                Warm sunlight, clay walls, and{" "}
                                <span className="text-[#22d3ee] font-medium">
                                    {menu.name.toLowerCase()}
                                </span>{" "}
                                arriving at your table — still humming from the
                                pass.
                            </p>

                            {/* buttons */}
                            <div className="mt-14 flex flex-wrap justify-center gap-4">
                                <Link
                                    href="/reservations"
                                    className="inline-flex items-center gap-2 rounded-full bg-[#22d3ee] px-8 py-4 text-lg font-medium text-[#020617] hover:bg-[#67e8f9] hover:-translate-y-0.5 transition shadow-[0_10px_30px_rgba(34,211,238,0.25)] tracking-wider"
                                >
                                    Reserve a table
                                    <ArrowUpRight className="h-4 w-4" />
                                </Link>

                                <Link
                                    href="/cafe-menus"
                                    className="inline-flex items-center gap-2 rounded-full border bg-white/5 px-8 py-4 text-lg text-cyan-600 hover:bg-cyan-50 border-[#22d3ee]/40  hover:-translate-y-0.5 transition tracking-wider"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    Back to menu
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
