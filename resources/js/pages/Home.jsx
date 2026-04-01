import React, { useEffect, useRef, useState } from "react";
import Body from "../components/Body";
import HeroCarousel from "../components/HeroCarousel";
import { motion, useAnimation, useInView } from "framer-motion";
import {
    Leaf,
    Plus,
    Star,
    MapPin,
    Instagram,
    ArrowRight,
    Sun,
    Moon,
    Globe,
    Wind,
    Droplets,
    Zap,
} from "lucide-react";

export default function Home() {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // about us animation
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.5 });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        } else {
            controls.start("hidden"); // reverse on scroll up
        }
    }, [isInView, controls]);

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

    // why choose us animation
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

    const [menu, setMenu] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/menu")
            .then((res) => res.json())
            .then((data) => setMenu(data))
            .catch(() =>
                setMenu([
                    {
                        name: "Truffle Tagliolini",
                        price: "850",
                        category: "plates",
                        desc: "Hand-rolled pasta, winter truffle, 24-month parmigiano.",
                    },
                    {
                        name: "Kyoto Matcha Cold Foam",
                        price: "450",
                        category: "beverage",
                        desc: "Ceremonial grade whisked over nitro-infused milk.",
                    },
                    {
                        name: "Saffron Burrata",
                        price: "620",
                        category: "plates",
                        desc: "Heirloom tomatoes, saffron oil, toasted sourdough.",
                    },
                    {
                        name: "Hibiscus & Rose Elixir",
                        price: "380",
                        category: "botanical",
                        desc: "Cold-pressed botanicals, sparkling mineral water.",
                    },
                ]),
            );
    }, []);

    const SectionTitle = ({ subtitle, title, dark = false }) => (
        <div className="mb-16">
            <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className={`font-medium tracking-[0.3em] uppercase text-xs ${dark ? "text-amber-500" : "text-amber-700"}`}
            >
                {subtitle}
            </motion.span>
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className={`text-4xl md:text-6xl font-serif font-bold mt-4 ${dark ? "text-white" : "text-stone-900"}`}
            >
                {title}
            </motion.h2>
        </div>
    );

    return (
        <Body>
            <div className="relative">
                <HeroCarousel />
                {/* about us  */}
                <section className="relative w-full">
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
                                    className="absolute text-cyan-600 font-bold tracking-[0.2em] text-xs uppercase"
                                >
                                    Since 2014
                                </motion.span>
                                <div className="mt-5">
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
                                </div>

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

                {/* SECTION 6: THE PHILOSOPHY OF ELEMENTS */}
                <section className="py-40 px-6 md:px-24 bg-[#050505] text-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row gap-20 items-start">
                            <div className="md:w-1/3">
                                <h2 className="text-xs uppercase tracking-[0.5em] text-cyan-500 font-bold mb-8 italic">
                                    Sensory Elements
                                </h2>
                                <h3 className="text-5xl md:text-7xl font-serif italic leading-[0.9]">
                                    The Art of <br /> Transition.
                                </h3>
                            </div>
                            <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
                                <div className="space-y-4 p-8 border-l border-white/5 hover:border-cyan-500 transition-colors">
                                    <Wind
                                        className="text-cyan-500"
                                        size={32}
                                        strokeWidth={1}
                                    />
                                    <h4 className="text-xl font-medium">
                                        Aerated Roasts
                                    </h4>
                                    <p className="text-sm text-cyan-500 leading-loose">
                                        Our proprietary air-roasting technology
                                        preserves the volatile aromatic oils of
                                        every bean.
                                    </p>
                                </div>
                                <div className="space-y-4 p-8 border-l border-white/5 hover:border-cyan-500 transition-colors">
                                    <Droplets
                                        className="text-cyan-500"
                                        size={32}
                                        strokeWidth={1}
                                    />
                                    <h4 className="text-xl font-medium">
                                        Mineral Infusion
                                    </h4>
                                    <p className="text-sm text-cyan-500 leading-loose">
                                        Water, restructured through charcoal
                                        filtration to match the volcanic origin
                                        of the coffee.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* <section class="md:flex my-10 items-center justify-center h-[500px] md:h-[500px] lg:h-full xl:h-full bg-fixed bg-center md:bg-center lg:bg-center bg-cover md:bg-cover lg:bg-cover bg-black/25 bg-blend-overlay bg-[url('https://images.unsplash.com/photo-1615557509870-98972c5e1396?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1374')]">
                    <div class="min-h-full h-[600px] md:min-h-screen lg:min-h-screen md:h-[800px] lg:h-full xl:h-full max-w-full md:max-w-6xl lg:max-w-6xl mx-auto flex flex-col justify-center items-center text-center text-white p-2 md:p-6 lg:p-6">
                        <div>
                            <h1 class="text-xl sm:text-xl md:text-4xl lg:text-4xl xl:text-4xl text-center font-bold pb-2 sm:pb-2 md:pb-5 lg:pb-5 xl:pb-5 text-white tracking-widest">
                                What Our Customers Are Saying!
                            </h1>
                        </div>
                    </div>
                </section> */}

                {/* why choose us */}
                <section className="relative w-full">
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
                                    ease: "easeInOut",
                                }}
                                viewport={{ once: true, amount: 0.3 }}
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
                                    }}
                                    viewport={{ once: false, amount: 0.3 }}
                                />

                                <motion.div
                                    initial={{ x: 40, opacity: 0 }}
                                    whileInView={{ x: 0, opacity: 1 }}
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
                                    transition={{ duration: 0.8 }}
                                    originX={1}
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
                                class="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-cyan-500 rounded-xl group"
                            >
                                <span class="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-cyan-700 rounded group-hover:-mr-4 group-hover:-mt-4">
                                    <span class="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                                </span>
                                <span class="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-cyan-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
                                <span class="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                                    Read More About Us
                                </span>
                            </a>
                        </div>
                    </div>
                </section>
                {/* why choose us end */}

                {/* our story */}
                <section
                    className="relative md:flex items-center justify-center h-[500px] md:h-[500px] bg-center bg-cover bg-black/50 bg-blend-overlay bg-fixed mt-20"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1680359871322-aabe6b33eff5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c291dGglMjBpbmRpYW4lMjBmb29kfGVufDB8fDB8fHww')",
                    }}
                >
                    {/* Content */}
                    <div className="min-h-full h-[600px] md:min-h-screen md:h-[800px] max-w-6xl mx-auto flex flex-col justify-center items-center text-center text-white p-2 md:p-6">
                        {/* Heading */}
                        <motion.h1
                            initial={{ opacity: 0, y: -50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            viewport={{ once: false }}
                            className="text-xl md:text-6xl font-bold pb-2 md:pb-5 tracking-widest"
                        >
                            Café Anaya
                        </motion.h1>

                        {/* Tagline */}
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.3 }}
                            viewport={{ once: false }}
                            className="text-sm md:text-xl opacity-90 max-w-xl leading-relaxed"
                        >
                            Brewing happiness in every cup ☕ — where taste
                            meets comfort and every visit feels special.
                        </motion.p>
                    </div>

                    {/* Animated Circle */}
                    <motion.div
                        initial={{ y: -120, opacity: 0 }}
                        whileInView={{ y: 80, opacity: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        viewport={{ once: false }}
                        className="absolute right-10 bottom-36 w-28 h-28 bg-cyan-500 rounded-full shadow-xl flex items-center justify-center"
                    >
                        <span className="text-white text-xl font-normal">
                            Our Café
                        </span>
                    </motion.div>
                </section>
                {/* our story end */}

                {/* Features - Minimalist Glass Cards */}

                <section className="bg-[#050505] text-white">
                    {/* SECTION 8: THE PRIVATE ATELIER (IMMERSIVE) */}
                    <section className="py-40 px-6 md:px-24">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                            <div className="relative overflow-hidden aspect-[4/5] bg-stone-900">
                                <motion.img
                                    initial={{ scale: 1.2 }}
                                    whileInView={{ scale: 1 }}
                                    transition={{ duration: 2 }}
                                    src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80"
                                    className="w-full h-full object-cover opacity-50 hover:opacity-100 transition-all duration-1000"
                                />
                                <div className="absolute top-10 right-10 text-right">
                                    <span className="text-[10px] text-cyan-500 tracking-[0.5em] block mb-2 font-bold uppercase">
                                        The Studio
                                    </span>
                                    <h3 className="text-4xl font-serif italic text-white/40">
                                        Private <br /> Tasting
                                    </h3>
                                </div>
                            </div>
                            <div className="space-y-12">
                                <Zap
                                    className="text-cyan-500"
                                    size={40}
                                    strokeWidth={1}
                                />

                                <div className="z-10 max-w-5xl">
                                    <motion.h1
                                        initial={{ y: 40, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{
                                            duration: 1.2,
                                            ease: [0.22, 1, 0.36, 1],
                                        }}
                                        className="text-[10vw] md:text-[7vw] leading-[0.85] font-serif italic text-white"
                                    >
                                        Anaya <br />{" "}
                                        <span className="ml-[5vw] text-cyan-500">
                                            Collective.
                                        </span>
                                    </motion.h1>
                                </div>

                                {/* <h2 className="text-5xl md:text-8xl font-serif leading-tight">Collective <br /> <span className="text-cyan-500 italic">Narrative.</span></h2> */}
                                {/* <p className="text-lg text-stone-400 leading-relaxed max-w-md font-light italic">
                                    "Our atelier is more than a cafe. It is a curated stage for culinary performance, where dawn beverages transition into midnight elixirs."
                                </p>
                                <button className="text-[10px] uppercase tracking-[0.6em] text-cyan-400 border-b border-cyan-500/40 pb-2 hover:tracking-[0.8em] transition-all">
                                    Request Access <ArrowUpRight className="inline ml-4" size={16} />
                                </button> */}

                                {/* 2. MULTI-SENSORY CONTENT (FOOD, BEV, VIBE) */}
                                <div className="px-6 grid grid-cols-1 md:grid-cols-2 gap-24 items-start">
                                    <div className="space-y-6">
                                        <Sun
                                            size={20}
                                            strokeWidth={1}
                                            className="text-cyan-500"
                                        />
                                        <h3 className="text-xl font-serif italic text-white">
                                            The Kitchen
                                        </h3>
                                        <p className="text-sm leading-relaxed text-cyan-500">
                                            Beyond the bean. Our culinary
                                            program focuses on hyper-seasonal
                                            small plates—where Mediterranean
                                            technique meets local farm sourcing.
                                        </p>
                                    </div>
                                    <div className="space-y-6">
                                        <Moon
                                            size={20}
                                            strokeWidth={1}
                                            className="text-cyan-500"
                                        />
                                        <h3 className="text-xl font-serif italic text-white">
                                            The Lounge
                                        </h3>
                                        <p className="text-sm leading-relaxed text-cyan-500">
                                            A sanctuary of sound and light.
                                            Designed with acoustic timber and
                                            soft-glow lighting to facilitate
                                            deep work or quiet intimacy.
                                        </p>
                                    </div>
                                    <div className="space-y-6">
                                        <Globe
                                            size={20}
                                            strokeWidth={1}
                                            className="text-cyan-500"
                                        />
                                        <h3 className="text-xl font-serif italic text-white">
                                            The Apothecary
                                        </h3>
                                        <p className="text-sm leading-relaxed text-cyan-500">
                                            Our beverage lab explores fermented
                                            tonics, botanical elixirs, and rare
                                            teas that transition from dawn to
                                            dusk.
                                        </p>
                                    </div>
                                    <div className="space-y-6">
                                        <Globe
                                            size={20}
                                            strokeWidth={1}
                                            className="text-cyan-500"
                                        />
                                        <h3 className="text-xl font-serif italic text-white">
                                            The Apothecary
                                        </h3>
                                        <p className="text-sm leading-relaxed text-cyan-500">
                                            Our beverage lab explores fermented
                                            tonics, botanical elixirs, and rare
                                            teas that transition from dawn to
                                            dusk.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </section>

                {/* 4. THE MENU (Modern Grid) */}
                <section className="py-32 px-6 bg-[#f4f2ee]">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
                            <SectionTitle
                                subtitle="Curated Menu"
                                title="Chef's Signature Selection"
                            />
                            <div className="flex gap-2 pb-4">
                                {["Coffee", "Breakfast", "Desserts"].map(
                                    (tab) => (
                                        <button
                                            key={tab}
                                            className="px-6 py-2 rounded-full border border-stone-300 text-sm font-medium hover:bg-stone-900 hover:text-white transition-all"
                                        >
                                            {tab}
                                        </button>
                                    ),
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {menu.slice(0, 6).map((item, index) => (
                                <motion.div
                                    key={item.id || index}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group relative"
                                >
                                    <div className="relative h-96 overflow-hidden rounded-[2.5rem] bg-stone-200 shadow-lg">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="h-full w-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 text-white">
                                            <p className="text-sm text-amber-400 mb-2 font-medium italic">
                                                Available till 6 PM
                                            </p>
                                            <button className="bg-white text-stone-900 py-3 rounded-full font-bold flex items-center justify-center gap-2">
                                                Add to Order <Plus size={18} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="mt-6 flex justify-between items-start px-2">
                                        <div>
                                            <h3 className="text-2xl font-serif font-bold text-stone-900">
                                                {item.name}
                                            </h3>
                                            <div className="flex items-center gap-1 text-amber-600 mt-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        size={14}
                                                        fill="currentColor"
                                                    />
                                                ))}
                                                <span className="text-stone-400 text-xs ml-2">
                                                    (120+ Reviews)
                                                </span>
                                            </div>
                                        </div>
                                        <span className="text-xl font-bold text-stone-900">
                                            ₹{item.price}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 5. VISUAL SOCIAL GRID */}
                <section className="pb-24 px-6">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-stone-900 rounded-[2rem] p-10 text-white flex flex-col justify-between aspect-square md:aspect-auto">
                            <div>
                                <Instagram className="mb-6 opacity-50" />
                                <h3 className="text-3xl font-serif mb-4 uppercase tracking-tighter">
                                    Follow <br /> the Brew
                                </h3>
                                <p className="text-stone-400 text-sm">
                                    Join 12k+ coffee lovers on our journey to
                                    the perfect roast.
                                </p>
                            </div>
                            <button className="w-full py-4 border border-white/20 rounded-xl hover:bg-white hover:text-black transition-all font-bold text-xs uppercase tracking-widest">
                                @cafe_anaya
                            </button>
                        </div>
                        <div className="md:col-span-2 relative group overflow-hidden rounded-[2rem] min-h-[300px]">
                            <img
                                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80"
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                alt="Interior"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                            <div className="absolute bottom-10 left-10 text-white">
                                <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] mb-2 font-bold">
                                    <MapPin
                                        size={14}
                                        className="text-cyan-400"
                                    />{" "}
                                    Visit Us
                                </p>
                                <h3 className="text-3xl font-serif">
                                    123 Artisan Alley, Metro City
                                </h3>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Body>
    );
}
