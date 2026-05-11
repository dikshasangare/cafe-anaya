import React, { useEffect, useState } from "react";
import MainLayout from "../Layouts/MainLayout";
import { Head, Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

export default function CafeMenu() {
    const [categories, setCategories] = useState([]);
    const [menu, setMenu] = useState([]);
    const [active, setActive] = useState("All");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoryRes = await fetch("/api/categories");
                const categoryData = await categoryRes.json();

                setCategories([
                    {
                        id: 0,
                        name: "All",
                    },
                    ...categoryData.categories,
                ]);

                const menuRes = await fetch("/api/menu");
                const menuData = await menuRes.json();

                setMenu(menuData.menus || []);
            } catch (error) {
                console.log("API Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const items =
        active === "All"
            ? menu
            : menu.filter((m) => m.category?.name === active);

    return (
        <MainLayout>
            <Head title="Menu | Café Anaya" />

            <div className="min-h-screen bg-gradient-to-b from-[#06141a] via-[#081b22] to-[#020617] text-white">
                {/* HERO */}
                <section className="relative overflow-hidden px-6 pt-52 pb-28 text-center">
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

                {/* CATEGORY FILTER */}
                <section className="mx-auto max-w-7xl px-6 lg:px-10">
                    <div className="sticky top-20 z-30 mb-12 overflow-x-auto rounded-full border border-white/10 bg-white/[0.03] px-3 py-3 backdrop-blur-xl">
                        <div className="mx-auto flex w-max gap-3">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setActive(category.name)}
                                    className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm transition-all duration-300 ${
                                        active === category.name
                                            ? "bg-cyan-400 text-black shadow-[0_0_25px_rgba(34,211,238,0.35)]"
                                            : "text-stone-300 hover:bg-white/10"
                                    }`}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* LOADING */}
                    {loading && (
                        <div className="flex items-center justify-center py-24">
                            <div className="h-12 w-12 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
                        </div>
                    )}

                    {/* MENU GRID */}
                    {!loading && (
                        <div className="grid gap-8 pb-24 sm:grid-cols-2 lg:grid-cols-3">
                            {items.map((item, index) => (
                                <motion.article
                                    key={item.id}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.7,
                                        delay: index * 0.05,
                                    }}
                                    viewport={{ once: true }}
                                    className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-cyan-400/30"
                                >
                                    {/* Image */}
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <img
                                            src={`/storage/${item.image}`}
                                            alt={item.name}
                                            loading="lazy"
                                            className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                                        />

                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-70" />

                                        {/* Tags */}
                                        <div className="absolute left-4 top-4 flex gap-2">
                                            <span className="inline-flex items-center gap-1 rounded-full border border-cyan-400/20 bg-black/50 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-cyan-300 backdrop-blur-md">
                                                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                                                Veg
                                            </span>

                                            {item.jain && (
                                                <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/50 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur-md">
                                                    <Leaf className="h-3 w-3" />
                                                    Jain
                                                </span>
                                            )}
                                        </div>

                                        {/* Signature */}
                                        {item.signature && (
                                            <span className="absolute right-4 top-4 rounded-full bg-cyan-400 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-black shadow-lg">
                                                ★ Signature
                                            </span>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <div className="flex items-start justify-between gap-4">
                                            <h3 className="font-serif text-2xl text-white">
                                                {item.name}
                                            </h3>

                                            <span className="font-serif text-xl text-cyan-400">
                                                ₹{item.price}
                                            </span>
                                        </div>

                                        <p className="mt-4 text-sm leading-relaxed text-stone-300 overflow-hidden whitespace-nowrap text-ellipsis">
                                            {item.description}
                                        </p>

                                        <div className="mt-6 flex items-center justify-between">
                                            <span className="text-[10px] uppercase tracking-[0.35em] text-stone-500">
                                                {item.category?.name}
                                            </span>

                                            <Link
                                                href={`/cafe-menu/${item.slug}`}
                                                className="text-xs uppercase tracking-[0.3em] text-cyan-300 transition hover:text-cyan-200"
                                            >
                                                View Dish →
                                            </Link>
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </MainLayout>
    );
}
