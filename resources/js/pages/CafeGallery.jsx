import React, { useRef } from "react";
import MainLayout from "../Layouts/MainLayout";
import { Head } from "@inertiajs/react";

import { motion, useScroll, useTransform } from "framer-motion";

// Gallery Images
import g1 from "../../images/gallery-1.jpg";
import g2 from "../../images/gallery-2.jpg";
import g3 from "../../images/gallery-3.jpg";
import g4 from "../../images/gallery-4.jpg";
import g5 from "../../images/gallery-5.jpg";
import g6 from "../../images/gallery-6.jpg";

// Dish Images
import dish1 from "../../images/dish-1.jpg";
import dish2 from "../../images/dish-2.jpg";
import dish3 from "../../images/dish-3.jpg";
import dish4 from "../../images/dish-4.jpg";

// Menu Images
import g7 from "../../images/menu/thandai-tiramisu.jpg";
import g8 from "../../images/menu/aam-panna.jpg";
import g9 from "../../images/menu/buddha-bowl.jpg";
import g10 from "../../images/menu/cardamom-cortado.jpg";
import g11 from "../../images/menu/filter-affogato.jpg";
import g12 from "../../images/menu/gulab-cheesecake.jpg";
import g13 from "../../images/menu/jain-pesto.jpg";
import g14 from "../../images/menu/kesar-latte.jpg";
import g16 from "../../images/menu/khichdi-bowl.jpg";
import g17 from "../../images/menu/khow-suey.jpg";
import g18 from "../../images/menu/masala-pesto-pasta.jpg";
import g19 from "../../images/menu/paneer-bruschetta.jpg";
import g20 from "../../images/menu/rose-litchi.jpg";

export default function CafeGallery() {
    const pageRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: pageRef,
        offset: ["start 80%", "end 20%"],
    });

    const imageY = useTransform(scrollYProgress, [0, 0.5], ["0%", "20%"]);

    const items = [
        { src: g1, alt: "Boho corner" },
        { src: dish2, alt: "Truffle kulcha" },
        { src: g6, alt: "Kulhad chai" },
        { src: g3, alt: "Live acoustic night" },
        { src: dish4, alt: "Buddha bowl" },
        { src: g2, alt: "Arched interior" },
        { src: g5, alt: "Gulab jamun cheesecake" },
        { src: dish3, alt: "Latte art" },
        { src: g4, alt: "Barista pouring" },
        { src: dish1, alt: "Plated dishes" },

        // Menu Images
        { src: g7, alt: "Thandai tiramisu dessert" },
        { src: g8, alt: "Refreshing aam panna drink" },
        { src: g9, alt: "Healthy buddha bowl" },
        { src: g10, alt: "Cardamom cortado coffee" },
        { src: g11, alt: "Filter affogato" },
        { src: g12, alt: "Gulab cheesecake" },
        { src: g13, alt: "Jain pesto pasta" },
        { src: g14, alt: "Kesar latte" },
        { src: g16, alt: "Khichdi wellness bowl" },
        { src: g17, alt: "Creamy khow suey" },
        { src: g18, alt: "Masala pesto pasta" },
        { src: g19, alt: "Paneer bruschetta" },
        { src: g20, alt: "Rose litchi cooler" },

        // Additional aesthetic duplicates
        { src: g7, alt: "Dessert artistry" },
        { src: g10, alt: "Signature coffee moments" },
        { src: g18, alt: "Chef crafted pasta" },
        { src: g12, alt: "Luxury cheesecake plating" },
        { src: g8, alt: "Summer cafe beverages" },
        { src: g17, alt: "Asian comfort bowl" },
    ];

    return (
        <MainLayout>
            <Head title="Gallery | Café Anaya" />

            <div
                ref={pageRef}
                className="bg-gradient-to-b from-[#06141a] via-[#081b22] to-[#020617] min-h-screen text-white"
            >
                {/* GALLERY HEADER */}
                <section className="mx-auto max-w-6xl px-6 pt-56 pb-14 lg:px-10 text-center">
                    <p className="text-xs uppercase tracking-[0.4em] text-cyan-400">
                        Our Moments
                    </p>

                    <h1 className="mt-5 font-serif text-5xl md:text-7xl text-white">
                        Quiet Light.
                        <span className="block text-cyan-400 italic">
                            Elegant Corners.
                        </span>
                    </h1>

                    <div className="w-32 h-[1px] bg-cyan-400/40 mx-auto mt-8" />

                    <p className="mt-8 text-stone-300 max-w-2xl mx-auto leading-relaxed text-lg">
                        A visual journey through handcrafted dishes, luxurious
                        interiors, intimate conversations, and the calming
                        atmosphere of Café Anaya.
                    </p>
                </section>

                {/* GALLERY GRID */}
                <section className="mx-auto max-w-7xl px-6 pb-28 lg:px-10">
                    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-5 space-y-5">
                        {items.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.7,
                                    delay: index * 0.05,
                                }}
                                viewport={{ once: true }}
                                className="mb-5 break-inside-avoid"
                            >
                                <a
                                    href={item.src}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="group relative block overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] backdrop-blur-xl"
                                >
                                    {/* Hover Glow */}
                                    <div className="absolute inset-0 bg-cyan-400/0 group-hover:bg-cyan-400/10 transition duration-700 z-10" />

                                    <img
                                        src={item.src}
                                        alt={item.alt}
                                        loading="lazy"
                                        className="w-full min-h-[260px] object-cover transition duration-700 group-hover:scale-110 brightness-95 group-hover:brightness-110"
                                    />

                                    {/* Caption */}
                                    <div className="absolute bottom-0 left-0 right-0 z-20 p-5 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition duration-500">
                                        <p className="text-white text-sm tracking-wide">
                                            {item.alt}
                                        </p>
                                    </div>
                                </a>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>
        </MainLayout>
    );
}
