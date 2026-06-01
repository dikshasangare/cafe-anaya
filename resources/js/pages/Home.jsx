import React, { useEffect, useRef, useState } from "react";
import Body from "../components/Body";
import HeroCarousel from "../components/HeroCarousel";
import {
    AnimatePresence,
    motion,
    useAnimation,
    useInView,
} from "framer-motion";
import {
    Leaf,
    Plus,
    Star,
    MapPin,
    Instagram,
    ArrowRight,
    Wind,
    Droplets,
    Phone,
    Mail,
    X,
    Coffee,
    UtensilsCrossed,
    Music2,
} from "lucide-react";
import ImageGallery from "../components/ImageGallery";
import OurStory from "../components/OurStory";
import MainLayout from "../Layouts/MainLayout";
import Reservation from "./Reservation";
import { Link } from "@inertiajs/react";
import g3 from "../../images/gallery-3.jpg";
import dish3 from "../../images/dish-3.jpg";
import dish2 from "../../images/dish-2.jpg";
import { Reveal } from "../components/Reveal";
import RecommendedDishes from "../components/RecommendedDishes";

export default function Home() {
    // --- 1. STATE MANAGEMENT ---
    const [scrollY, setScrollY] = useState(0);
    const [loading, setLoading] = useState(true);

    // Modal States
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isStickyModalOpen, setIsStickyModalOpen] = useState(false);
    const [stickyItem, setStickyItem] = useState(null);

    // Menu & Category States
    const [menu, setMenu] = useState([]);
    const [categories, setCategories] = useState([]);
    const [activeTab, setActiveTab] = useState("");
    const [hoveredImage, setHoveredImage] = useState(null);

    // Derived State
    const currentCategoryName =
        categories.find((c) => String(c.id) === String(activeTab))?.name ||
        "The Gastronomy";

    // --- 2. REFS & ANIMATION CONTROLS ---
    // General Scroll Tracking
    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // About Us Animation
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.5 });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        } else {
            controls.start("hidden");
        }
    }, [isInView, controls]);

    // Why Choose Us Animation
    const ref2 = useRef(null);
    const isInView2 = useInView(ref2, { amount: 0.5 });
    const controls2 = useAnimation();

    useEffect(() => {
        if (isInView2) {
            controls2.start("visible");
        } else {
            controls2.start("hidden");
        }
    }, [isInView2, controls2]);

    // Animation Variants
    const wordAnim = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    };

    // Three rituals animation
    const refRituals = useRef(null);
    const isInViewRituals = useInView(refRituals, { amount: 0.5 });
    const controlsRituals = useAnimation();

    useEffect(() => {
        if (isInViewRituals) {
            controlsRituals.start("visible");
        } else {
            controlsRituals.start("hidden");
        }
    }, [isInViewRituals, controlsRituals]);

    // --- 3. API & DATA FETCHING ---
    // API 1: Fetch Categories on Mount
    useEffect(() => {
        fetch("http://cafe-anaya.test/api/home-categories")
            .then((res) => res.json())
            .then((data) => {
                const categoryData = data.categories || [];

                if (categoryData.length > 0) {
                    setCategories(categoryData);
                    setActiveTab(categoryData[0].id);
                }
            })
            .catch((err) => console.error("Category API Error:", err));
    }, []);

    // API 2: Fetch Menu whenever activeTab changes
    useEffect(() => {
        if (!activeTab) return;

        setLoading(true);

        fetch(`http://cafe-anaya.test/api/menu?category_id=${activeTab}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }

                return res.json();
            })
            .then((data) => {
                const menuData = data.menus || [];

                setMenu(menuData);

                if (menuData.length > 0) {
                    setHoveredImage(menuData[0].image_url);
                }

                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
            });
    }, [activeTab]);

    // --- 4. FUNCTIONS & HELPER COMPONENTS ---
    const openStickyDetails = () => {
        const item = menu.find((i) => i.image_url === hoveredImage);
        if (item) {
            setStickyItem(item);
            setIsStickyModalOpen(true);
        }
    };

    const filteredMenu = menu.filter(
        (item) => String(item.category_id) === String(activeTab),
    );

    const galleryItems = [
        {
            id: 1,
            src: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070",
            title: "Mixology Art",
            size: "col-span-2 row-span-2",
        },
        {
            id: 2,
            src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974",
            title: "Culinary Precision",
            size: "col-span-1 row-span-1",
        },
        {
            id: 3,
            src: "https://images.unsplash.com/photo-1550966842-30cae010830f?q=80&w=2070",
            title: "Ambient Glow",
            size: "col-span-1 row-span-2",
        },
        {
            id: 4,
            src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070",
            title: "Golden Hour",
            size: "col-span-1 row-span-1",
        },
        {
            id: 5,
            src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070",
            title: "Private Dining",
            size: "col-span-2 row-span-1",
        },
    ];

    return (
        <MainLayout title="Home">
            <div className="relative">
                <HeroCarousel />
                {/* about us  */}
                <section id="about" className="relative w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 items-center relative">
                        {/* LEFT SIDE  */}
                        <div className="bg-white px-6 md:px-12 py-10 md:py-10">
                            <motion.p
                                ref={ref}
                                className="capitalize text-gray-600 relative inline-block text-5xl font-bold mb-4"
                                initial="hidden"
                                animate={controls}
                                variants={{
                                    hidden: {},
                                    visible: {
                                        transition: {
                                            staggerChildren: 0.25,
                                        },
                                    },
                                }}
                            >
                                <motion.span
                                    variants={wordAnim}
                                    className="absolute text-cyan-600 font-bold tracking-[0.2em] text-xs uppercase bottom-14"
                                >
                                    Since 2014
                                </motion.span>
                                <span className="mt-5">
                                    <motion.span variants={wordAnim}>
                                        About{" "}
                                    </motion.span>
                                    <motion.span variants={wordAnim}>
                                        Our{" "}
                                    </motion.span>
                                    <motion.span
                                        className="text-cyan-500"
                                        variants={wordAnim}
                                    >
                                        Café{" "}
                                    </motion.span>
                                    <motion.span
                                        className="text-cyan-500"
                                        variants={wordAnim}
                                    >
                                        Anaya
                                    </motion.span>
                                </span>

                                {/* underline */}
                                <motion.span
                                    className="absolute -bottom-3 left-0 h-[2px] bg-cyan-500"
                                    initial={{ width: 0 }}
                                    animate={
                                        isInView
                                            ? { width: "80px" }
                                            : { width: 0 }
                                    }
                                    transition={{ duration: 0.8 }}
                                />
                            </motion.p>

                            <p className="pt-10 mx-auto text-gray-600 text-xl">
                                We combine flavors, textures, and emotions into
                                unforgettable dining experiences. Discover what
                                makes us unique.
                            </p>

                            <p className="text-gray-600 leading-relaxed my-4 text-xl">
                                Our buzzy food-hall style concept is inspired by
                                international dining styles, especially in Asia.
                                Explore the following fast-action food stations
                                as busy chefs perform.
                            </p>

                            <p className="text-gray-600 leading-relaxed mb-8 text-xl">
                                Enjoy a verdant Garden to Glass experience. It’s
                                in the view, it’s reflected in the design, and
                                it infuses many drinks. In fact, all our
                                delicious fresh ingredients are sustainably
                                picked from our Jemima’s Kitchen Garden. Our
                                flourishing range of cocktails, spirits, beers
                                and wines are all made with integrity and offer
                                something for every guest.
                            </p>

                            <motion.button
                                whileHover={{ x: 5 }}
                                className="flex items-center gap-3 text-stone-900 font-bold border-b-2 border-cyan-500 pb-2 transition-all hover:text-cyan-600"
                            >
                                Discover Our Story <ArrowRight size={20} />
                            </motion.button>
                        </div>

                        {/* RIGHT SIDE */}
                        <div className="w-full overflow-x-hidden py-16 flex justify-center items-center">
                            {/* Background Shape */}
                            <div className="absolute top-0 right-0 w-[30%] h-[100%] bg-cyan-50 rounded-tl-lg rounded-bl-lg -z-10"></div>
                            {/* <div className="absolute right-0 top-0 w-[60%] h-full bg-cyan-50 rounded-l-3xl -z-10"></div> */}

                            <div className="relative w-full max-w-6xl flex justify-center">
                                {/* MAIN IMAGE */}
                                <motion.img
                                    src="https://images.unsplash.com/photo-1611280422374-fa3c1110c16e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fG5vb2RsZXN8ZW58MHx8MHx8fDA%3D"
                                    alt="Main"
                                    className="w-[90%] md:w-[70%] rounded-xl shadow-2xl object-cover"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 1 }}
                                    viewport={{ once: false }}
                                />

                                {/* LEFT IMAGE */}
                                <motion.img
                                    src="https://images.unsplash.com/photo-1591972619306-0a13c4ab5c1a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fGluZGlhbiUyMHNhbmR3aWNofGVufDB8fDB8fHww"
                                    alt="Left"
                                    className="absolute bottom-[-20px] left-0 md:left-[5%] w-[45%] md:w-[30%] rounded-xl shadow-lg h-[40%]"
                                    initial={{ opacity: 0, x: -60 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 1.2 }}
                                    viewport={{ once: false }}
                                />

                                {/* RIGHT IMAGE */}
                                <motion.img
                                    src="https://images.unsplash.com/photo-1613929231151-d7571591259e?auto=format&fit=crop&q=80&w=687"
                                    alt="Right"
                                    className="absolute top-[15%] right-0 md:right-[5%] translate-x-[10%] md:translate-x-[20%] w-[40%] md:w-[25%] rounded-xl shadow-lg h-[40%]"
                                    initial={{ opacity: 0, x: 60 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 1.2 }}
                                    viewport={{ once: false }}
                                />
                            </div>
                        </div>
                    </div>
                </section>
                {/* about us end */}

                {/* CRAFTED TRIO — pillars */}
                <section className="relative mx-auto max-w-full px-6 py-24 lg:px-10 bg-cyan-50">
                    <Reveal className="text-center">
                        <div className="flex items-center justify-center gap-4 mb-5">
                            <div className="h-[1px] w-16 bg-cyan-300" />

                            <p className="text-xs uppercase tracking-[0.3em] text-cyan-600">
                                What we craft
                            </p>

                            <div className="h-[1px] w-16 bg-cyan-300" />
                        </div>

                        <motion.p
                            ref={refRituals}
                            className="capitalize text-gray-600 relative inline-block text-5xl font-bold mb-4"
                            initial="hidden"
                            animate={controlsRituals}
                            variants={{
                                hidden: {},
                                visible: {
                                    transition: {
                                        staggerChildren: 0.25,
                                    },
                                },
                            }}
                        >
                            <span className="">
                                <motion.span variants={wordAnim}>
                                    Three{" "}
                                </motion.span>
                                <motion.span variants={wordAnim}>
                                    rituals,{" "}
                                </motion.span>
                                <motion.span
                                    className="text-cyan-500"
                                    variants={wordAnim}
                                >
                                    one{" "}
                                </motion.span>
                                <motion.span
                                    className="text-cyan-500"
                                    variants={wordAnim}
                                >
                                    warm{" "}
                                </motion.span>
                                <motion.span
                                    className="text-cyan-500"
                                    variants={wordAnim}
                                >
                                    Corner.
                                </motion.span>
                            </span>
                        </motion.p>
                    </Reveal>

                    <div className="mt-20 grid gap-8 md:grid-cols-3">
                        {[
                            {
                                icon: Coffee,
                                title: "Slow Coffee",
                                text: "Single-origin beans, hand-pulled with patience. Every cup, a quiet ceremony.",
                                img: dish3,
                            },
                            {
                                icon: UtensilsCrossed,
                                title: "Soulful Kitchen",
                                text: "Heirloom recipes reimagined — pure veg plates plated like poetry.",
                                img: dish2,
                            },
                            {
                                icon: Music2,
                                title: "Live Evenings",
                                text: "Sitar Sundays & acoustic nights under amber light and clay walls.",
                                img: g3,
                            },
                        ].map((p, i) => (
                            <Reveal key={p.title} delay={i * 100}>
                                <article className="group relative overflow-hidden rounded-[32px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition duration-500 hover:-translate-y-2 hover:shadow-cyan-200/50">
                                    {/* Image */}
                                    <div className="relative h-[280px] overflow-hidden">
                                        <img
                                            src={p.img}
                                            alt={p.title}
                                            loading="lazy"
                                            className="h-full w-full object-cover transition duration-[1400ms] group-hover:scale-110"
                                        />

                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent" />

                                        {/* Icon */}
                                        <div className="absolute bottom-5 left-5 grid h-14 w-14 place-items-center rounded-full bg-cyan-600 text-white shadow-lg">
                                            <p.icon className="h-5 w-5" />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-8">
                                        <h3 className="font-serif text-[30px] leading-none text-cyan-950">
                                            {p.title}
                                        </h3>

                                        <p className="mt-4 text-[17px] leading-8 text-cyan-800/70">
                                            {p.text}
                                        </p>

                                        <div className="mt-5 flex justify-center">
                                            <div className="h-[1px] w-48 rounded-full bg-gradient-to-r from-cyan-100 via-cyan-400 to-cyan-100" />
                                        </div>
                                    </div>
                                </article>
                            </Reveal>
                        ))}
                    </div>
                </section>

                {/* why choose us */}
                <section className="relative w-full mb-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 items-center relative">
                        {/* LEFT SIDE  */}
                        <div className="relative flex justify-start items-start">
                            <div className="absolute bottom-0 left-0 w-[55%] h-[70%] bg-cyan-50 rounded-tl-lg rounded-bl-lg -z-10"></div>

                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                whileInView={{
                                    height: "500px",
                                    opacity: 1,
                                }}
                                transition={{
                                    duration: 1.5,
                                    // ease: "easeInOut",
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                viewport={{ once: false, amount: 0.3 }}
                                className="flex justify-center items-center w-full"
                            >
                                <motion.img
                                    src="https://images.unsplash.com/photo-1610632380989-680fe40816c6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="Restaurant Dish"
                                    className="w-[85%] md:h-[550px] max-w-xl mt-10 object-cover md:object-contain"
                                    initial={{ opacity: 0, x: -100 }} // starts slightly to the left
                                    whileInView={{ opacity: 1, x: 0 }} // slides in to normal position
                                    transition={{
                                        duration: 1.2,
                                        ease: "easeOut",
                                        delay: 0.2,
                                    }}
                                    viewport={{ once: false, amount: 0.3 }}
                                />

                                <motion.div
                                    initial={{ x: 40, opacity: 0 }}
                                    whileInView={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.8 }}
                                    viewport={{ once: true }}
                                    className="absolute -bottom-20 -right-0 hidden md:block bg-cyan-600 text-white p-8 rounded-3xl shadow-xl z-20 max-w-[240px]"
                                >
                                    <p className="text-sm italic opacity-90">
                                        "Sustainability in every bean, integrity
                                        in every pour."
                                    </p>
                                    <div className="mt-4 flex items-center gap-2 font-bold uppercase text-[10px] tracking-widest">
                                        <Leaf size={14} /> Café Anaya
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>

                        {/* RIGHT SIDE */}
                        <div className="bg-white px-6 md:px-12 py-10 md:py-20">
                            <motion.p
                                ref={ref2}
                                className="capitalize text-gray-600 relative inline-block w-fit text-5xl font-bold mb-4"
                                initial="hidden"
                                animate={controls2}
                                variants={{
                                    hidden: {},
                                    visible: {
                                        transition: { staggerChildren: 0.25 },
                                    },
                                }}
                            >
                                <motion.span variants={wordAnim}>
                                    Why{" "}
                                </motion.span>
                                <motion.span variants={wordAnim}>
                                    Choose{" "}
                                </motion.span>
                                <motion.span
                                    className="text-cyan-500"
                                    variants={wordAnim}
                                >
                                    Café{" "}
                                </motion.span>
                                <motion.span
                                    className="text-cyan-500"
                                    variants={wordAnim}
                                >
                                    Anaya
                                </motion.span>

                                <motion.span
                                    className="absolute -bottom-3 left-0 h-[2px] bg-cyan-500"
                                    style={{ width: "80px" }}
                                    initial={{ scaleX: 0 }}
                                    animate={
                                        isInView2
                                            ? { scaleX: 1 }
                                            : { scaleX: 0 }
                                    }
                                    transition={{ duration: 1, delay: 0.8 }}
                                />
                            </motion.p>

                            <p className="pt-5 mx-auto text-gray-600 text-lg">
                                We combine flavors, textures, and emotions into
                                unforgettable dining experiences. Discover what
                                makes us unique.
                            </p>

                            <p className="text-gray-600 leading-relaxed my-4 text-lg">
                                Our buzzy food-hall style concept is inspired by
                                international dining styles, especially in Asia.
                                Explore the following fast-action food stations
                                as busy chefs perform.
                            </p>

                            <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                                Enjoy a verdant Garden to Glass experience. It’s
                                in the view, it’s reflected in the design, and
                                it infuses many drinks. In fact, all our
                                delicious fresh ingredients are sustainably
                                picked from our Jemima’s Kitchen Garden. Our
                                flourishing range of cocktails, spirits, beers
                                and wines are all made with integrity and offer
                                something for every guest.
                            </p>
                            <a
                                href="#_"
                                className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-cyan-500 rounded-xl group"
                            >
                                <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-cyan-700 rounded group-hover:-mr-4 group-hover:-mt-4">
                                    <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                                </span>
                                <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-cyan-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
                                <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                                    Read More About Us
                                </span>
                            </a>
                        </div>
                    </div>
                </section>
                {/* why choose us end */}

                {/* <RecommendedDishes /> */}
                <RecommendedDishes />
                {/* menu */}
                <section
                    id="menu"
                    className="min-h-screen bg-[#0f0f0f] text-white py-20 px-6"
                >
                    <div className="flex justify-between pb-8 border-b border-white/20">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="space-y-6 "
                        >
                            <span className="text-[10px] tracking-[0.4em] uppercase text-cyan-500 font-bold border-l border-cyan-500 pl-4">
                                {currentCategoryName}
                            </span>
                            <h2 className="text-6xl md:text-7xl font-serif italic tracking-tighter">
                                Chef's{" "}
                                <span className="text-stone-500 italic">
                                    Signature
                                </span>
                            </h2>
                        </motion.div>

                        <div className="mt-20 text-cyan-400 opacity-100 transition-opacity">
                            <Link
                                href={"/cafe-menus"}
                                className="text-sm uppercase tracking-[0.5em] border-b border-cyan-600 pb-2"
                            >
                                View Full Menu
                            </Link>
                        </div>
                    </div>

                    <div className="max-w-7xl mt-14 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        {/* LEFT SIDE: STICKY VISUAL */}
                        <div className="hidden lg:block sticky top-24 h-[70vh] overflow-hidden rounded-3xl border-t border-cyan-700 bg-stone-900 group/sticky">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={hoveredImage}
                                    src={hoveredImage}
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 0.7, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.6 }}
                                    className="w-full h-full object-cover border border-cyan-700 transition-all duration-700 group-hover/sticky:opacity-40 group-hover/sticky:scale-105"
                                />
                            </AnimatePresence>

                            {/* OVERLAY BUTTON: Only shows when a dish is being hovered */}

                            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent" />

                            <div className="absolute bottom-12 left-12 right-12 flex flex-col items-start">
                                {/* Label */}
                                <p className="text-cyan-300 font-bold text-[10px] tracking-[0.4em] uppercase mb-2">
                                    Selected Dish
                                </p>

                                {/* Dynamic Name */}
                                <h2 className="text-5xl font-serif italic text-white/95 mb-8 tracking-tighter">
                                    {menu.find(
                                        (i) => i.image_url === hoveredImage,
                                    )?.name || "Visual Gastronomy"}
                                </h2>

                                {/* THE BUTTON: Shows on hover, slides up slightly */}
                                <div className="opacity-0 translate-y-4 group-hover/sticky:opacity-100 group-hover/sticky:translate-y-0 transition-all duration-500 ease-out">
                                    <button
                                        onClick={openStickyDetails}
                                        className="text-[10px] uppercase tracking-[0.3em] border border-cyan-500 text-cyan-500 px-8 py-4 hover:bg-cyan-500 hover:text-white transition-all duration-300 backdrop-blur-sm"
                                    >
                                        Explore Dish
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SIDE: SCROLLABLE CONTENT */}
                        <div className="flex flex-col">
                            {/* Vertical Category Selector */}
                            <div className="flex gap-6 mb-10 overflow-x-auto pb-4 no-scrollbar border-b border-white/10">
                                {categories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        // Force the activeTab to be the same type as cat.id
                                        onClick={() => {
                                            console.log(
                                                "Category Clicked:",
                                                cat.id,
                                            );
                                            setActiveTab(cat.id);
                                        }}
                                        className={`text-[11px] uppercase tracking-[0.4em] whitespace-nowrap transition-all pb-2 border-b-2 ${
                                            // Use == instead of === if one is a string and one is a number
                                            activeTab == cat.id
                                                ? "text-cyan-500 border-cyan-500"
                                                : "text-stone-600 border-transparent hover:text-stone-300"
                                        }`}
                                    >
                                        {cat.name}
                                    </button>
                                ))}
                            </div>

                            {/* Elegant List Items */}
                            <div className="space-y-0">
                                {filteredMenu.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        onMouseEnter={() =>
                                            setHoveredImage(item.image_url)
                                        }
                                        className="group border-b border-white/5 pb-8 flex justify-between items-center cursor-crosshair transition-all hover:pl-4"
                                    >
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-4 mb-1">
                                                <span className="text-[10px] font-mono text-stone-600 group-hover:text-cyan-500 transition-colors">
                                                    {index + 1 < 10
                                                        ? `0${index + 1}`
                                                        : index + 1}
                                                </span>
                                                <h3 className="text-2xl md:text-3xl font-serif group-hover:italic transition-all">
                                                    {item.name}
                                                </h3>
                                            </div>
                                            <p className="text-stone-500 text-sm line-clamp-1 italic font-light pr-10">
                                                {item.description}
                                            </p>
                                        </div>

                                        <div className="text-right">
                                            <p className="text-xl font-light tracking-tighter mb-2">
                                                ₹{item.price}
                                            </p>
                                            <button className="text-[9px] uppercase tracking-widest text-cyan-600 opacity-0 group-hover:opacity-100 transition-all border border-cyan-600/30 px-3 py-1 rounded-full">
                                                Order
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <AnimatePresence>
                        {isStickyModalOpen && stickyItem && (
                            <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-10">
                                {/* Backdrop for THIS modal only */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={() => setIsStickyModalOpen(false)}
                                    className="absolute inset-0 bg-black/95 backdrop-blur-md"
                                />

                                {/* Modal Content */}
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.9, opacity: 0 }}
                                    className="relative bg-stone-900 w-full max-w-5xl h-fit max-h-[90vh] overflow-hidden rounded-sm grid md:grid-cols-2 border border-white/10"
                                >
                                    <div className="relative h-64 md:h-full overflow-hidden">
                                        <img
                                            src={stickyItem.image_url}
                                            className="w-full h-full object-cover"
                                            alt=""
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/50 to-transparent" />
                                    </div>

                                    <div className="p-8 md:p-16 flex flex-col justify-center bg-stone-900">
                                        <button
                                            onClick={() =>
                                                setIsStickyModalOpen(false)
                                            }
                                            className="absolute top-8 right-8 text-stone-500 hover:text-white transition-colors"
                                        >
                                            <X size={20} />
                                        </button>

                                        <span className="text-cyan-500 font-mono text-[10px] tracking-[0.4em] uppercase mb-4">
                                            Chef's Signature
                                        </span>
                                        <h2 className="text-5xl font-serif italic text-white mb-6 leading-tight">
                                            {stickyItem.name}
                                        </h2>
                                        <p className="text-stone-400 font-light leading-relaxed mb-10 italic border-l border-cyan-800 pl-6">
                                            {stickyItem.description}
                                        </p>

                                        <div className="flex justify-between items-baseline border-t border-white/5 pt-8">
                                            <span className="text-4xl font-light text-white tracking-tighter">
                                                ₹{stickyItem.price}
                                            </span>
                                            <span className="text-[10px] text-stone-500 uppercase tracking-widest">
                                                Available for Dining
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        )}
                    </AnimatePresence>
                </section>
                {/* menu end */}

                <ImageGallery />

                {/* our story */}
                <OurStory />
                {/* our story end */}

                {/* contact us */}
                <section id="contact" className="pb-24 px-6 mt-20">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* FOLLOW THE BREW CARD */}
                        <div className="bg-stone-900 rounded-[2rem] p-10 text-white flex flex-col justify-between min-h-[450px]">
                            <div>
                                <Instagram className="mb-6 opacity-50 text-cyan-400" />
                                <h3 className="text-3xl font-serif mb-4 uppercase tracking-tighter leading-tight">
                                    Follow <br /> the Brew
                                </h3>

                                <p className="text-stone-400 text-sm mb-8">
                                    Join 12k+ coffee lovers on our journey to
                                    the perfect roast. Get brewing tips, first
                                    dibs on new beans, and a look behind the
                                    counter.
                                </p>

                                {/* Additional Content: Stats/Community info */}
                                <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-6 mb-4">
                                    <div>
                                        <p className="text-xs text-stone-500 uppercase tracking-widest">
                                            Community
                                        </p>
                                        <p className="text-lg font-medium">
                                            12.4k
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-stone-500 uppercase tracking-widest">
                                            Updates
                                        </p>
                                        <p className="text-lg font-medium">
                                            Daily
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full py-4 border border-white/20 rounded-xl hover:bg-white hover:text-black transition-all font-bold text-xs uppercase tracking-widest">
                                @cafe_anaya
                            </button>
                        </div>

                        {/* VISIT US CARD */}
                        <div className="md:col-span-2 relative group overflow-hidden rounded-[2rem] min-h-[550px]">
                            <img
                                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                alt="Interior"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                            <div className="absolute inset-0 p-10 flex flex-col justify-end">
                                <div className="text-white max-w-md">
                                    <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] mb-4 font-bold">
                                        <MapPin
                                            size={14}
                                            className="text-cyan-400"
                                        />
                                        Find Your Way
                                    </p>
                                    <h3 className="text-4xl font-serif mb-4">
                                        123 Artisan Alley, <br /> Metro City, MC
                                        90210
                                    </h3>

                                    {/* Additional Content: Hours & Directions */}
                                    <div className="flex flex-wrap gap-x-8 gap-y-4 mb-8 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                                        <div>
                                            <p className="text-cyan-400 text-[10px] uppercase font-bold tracking-widest mb-1">
                                                Weekdays
                                            </p>
                                            <p className="text-sm">
                                                7:00 AM — 8:00 PM
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-cyan-400 text-[10px] uppercase font-bold tracking-widest mb-1">
                                                Weekends
                                            </p>
                                            <p className="text-sm">
                                                9:00 AM — 9:00 PM
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <button className="bg-white text-black px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-cyan-400 transition-colors">
                                            Get Directions
                                        </button>
                                        <button
                                            onClick={() => setIsModalOpen(true)}
                                            className="backdrop-blur-md bg-white/10 border border-white/20 text-white px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-white/20 transition-colors"
                                        >
                                            Call Us
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* MODAL */}
                    {isModalOpen && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                            <div
                                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                                onClick={() => setIsModalOpen(false)}
                            />
                            <div className="relative bg-stone-900 border border-white/10 w-full max-w-md rounded-[2.5rem] p-8 text-white shadow-2xl">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10"
                                >
                                    <X size={20} />
                                </button>
                                <div className="mb-8">
                                    <h4 className="text-2xl font-serif mb-2">
                                        Get in touch
                                    </h4>
                                    <p className="text-stone-400 text-sm">
                                        We're here to help with your coffee
                                        cravings.
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    <a
                                        href="tel:+1234567890"
                                        className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-cyan-400 hover:text-black transition-all"
                                    >
                                        <Phone size={20} />
                                        <span className="font-medium">
                                            +1 (234) 567-890
                                        </span>
                                    </a>
                                    <a
                                        href="mailto:hello@cafeanaya.com"
                                        className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white hover:text-black transition-all"
                                    >
                                        <Mail size={20} />
                                        <span className="font-medium">
                                            hello@cafeanaya.com
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}
                </section>
                {/* contact us end  */}

                <section
                    id="booking"
                    className="relative bg-[#050505] text-white py-32 px-6 overflow-hidden"
                >
                    {/* Background Glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/10 blur-[120px] rounded-full" />

                    <div className="space-y-6 text-center relative z-10">
                        <div className="flex justify-center">
                            <Coffee
                                className="text-cyan-500"
                                size={28}
                                strokeWidth={2}
                            />
                        </div>

                        <h2 className="text-3xl md:text-5xl font-serif italic leading-tight">
                            A table is waiting, with <br /> your name & a warm
                            cup.
                        </h2>

                        <div className="flex items-center justify-center my-6">
                            <div className="w-48 h-px bg-gradient-to-r from-transparent via-[#22d3ee]/50 to-transparent" />

                            <div className="mx-3 w-2 h-2 rounded-full bg-[#22d3ee] shadow-[0_0_10px_rgba(34,211,238,0.6)]" />

                            <div className="w-48 h-px bg-gradient-to-l from-transparent via-[#22d3ee]/50 to-transparent" />
                        </div>

                        <p className="text-stone-400  leading-relaxed text-center">
                            Step into an atmosphere crafted with elegance, warm
                            conversations, handcrafted brews, <br /> and
                            unforgettable dining moments curated just for you.
                        </p>
                    </div>

                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                        {/* Reserve Button */}
                        <Link
                            href={"/reservations"}
                            className={`group relative overflow-hidden px-4 py-4 rounded-full bg-cyan-500 text-black text-xs uppercase tracking-[0.3em] font-bold transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,255,255,0.45)]`}
                        >
                            <span className="relative z-10 ">
                                Reserve A Table
                            </span>

                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        </Link>

                        {/* Order Online Button */}
                        <button className="group px-8 py-4 rounded-full border border-white/15 bg-white/[0.03] backdrop-blur-xl text-white text-xs uppercase tracking-[0.3em] font-bold transition-all duration-500 hover:border-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300 hover:scale-105">
                            Order Online
                        </button>
                    </div>
                </section>
            </div>
        </MainLayout>
    );
}
