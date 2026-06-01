import { useMemo, useState, useEffect, useRef } from "react";
import { Reveal } from "../components/Reveal";
import {
    Sparkles,
    ArrowUpRight,
    Leaf,
    Coffee,
    Sun,
    Moon,
    Flame,
    Heart,
    Wand2,
} from "lucide-react";
import { Link } from "@inertiajs/react";
import {
    AnimatePresence,
    motion,
    useAnimation,
    useInView,
} from "framer-motion";

export default function RecommendedDishes() {
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);
    const [active, setActive] = useState([]);
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

    const toggle = (id) => {
        setActive((p) =>
            p.includes(id) ? p.filter((x) => x !== id) : [...p, id],
        );
    };

    useEffect(() => {
        fetch("/api/recommendations")
            .then((res) => res.json())
            .then((res) => {
                if (res.success) {
                    console.log("MENU", res.data);
                    console.log("FIRST ITEM", res.data[0]);
                    setMenu(res.data);
                }
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    const picks = useMemo(() => {
        return menu.slice(0, 6).map((item) => ({
            item,
            score: 1,
        }));

        const scored = menu.map((item) => {
            let score = 0;

            return {
                item,
                score,
            };
        });

        const filtered = scored.filter((dish) => dish.score > 0);

        return filtered.length
            ? filtered.sort((a, b) => b.score - a.score).slice(0, 6)
            : menu.slice(0, 6).map((item) => ({
                  item,
                  score: 1,
              }));
    }, [menu, active]);

    console.log("get data " + picks);
    if (!loading && !menu.length) return null;

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

    return (
        <div>
            <section className="relative mx-auto max-w-full px-6 py-24 lg:px-10 bg-cyan-50">
                <Reveal className="text-center">
                    <div className="flex items-center justify-center gap-4 mb-5">
                        <div className="h-[1px] w-16 bg-cyan-300" />

                        <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-primary">
                            <Wand2 className="h-3.5 w-3.5" />
                            Personalised For You
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
                        <motion.span variants={wordAnim}>Tell </motion.span>
                        <motion.span variants={wordAnim}>us </motion.span>
                        <motion.span variants={wordAnim}>your </motion.span>
                        <motion.span variants={wordAnim}>mood </motion.span>
                        <motion.span
                            className="text-cyan-500"
                            variants={wordAnim}
                        >
                            we'll{" "}
                        </motion.span>
                        <motion.span
                            className="text-cyan-500"
                            variants={wordAnim}
                        >
                            plate{" "}
                        </motion.span>
                        <motion.span
                            className="text-cyan-500"
                            variants={wordAnim}
                        >
                            the
                        </motion.span>
                        <motion.span
                            className="text-cyan-500"
                            variants={wordAnim}
                        >
                            rest.
                        </motion.span>
                    </motion.p>

                    <motion.p
                        ref={ref}
                        className="mt-4 mx-auto max-w-xl text-center text-gray-600"
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
                        <motion.span variants={wordAnim}>
                            Pick a vibe (or three). Our little kitchen oracle
                            will whisper back three dishes made just for this
                            moment.
                        </motion.span>
                    </motion.p>
                </Reveal>

                <div className="mt-20 grid gap-8 md:grid-cols-3">
                    {picks.map((pick, i) => {
                        const p = pick.item;
                        return (
                            <Reveal key={`${p.id}-${i}`} delay={i * 100}>
                                <article className="group relative overflow-hidden rounded-[32px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition duration-500 hover:-translate-y-2 hover:shadow-cyan-200/50">
                                    {/* Image */}
                                    <div className="relative h-[280px] overflow-hidden">
                                        <img
                                            src={`/storage/${p.image}`}
                                            alt={p.name}
                                            loading="lazy"
                                            className="h-full w-full object-cover transition duration-[1400ms] group-hover:scale-110"
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent" />
                                        {/* Icon */}
                                        <span className="absolute top-3 left-3 rounded-full bg-cyan-600 text-white px-3 py-1 text-xs backdrop-blur">
                                            <Sparkles className="inline h-3 w-3" />{" "}
                                            Score {pick.score.toFixed(1)}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div className="p-8">
                                        <h3 className="font-serif text-[30px] leading-none text-cyan-950">
                                            {p.name}
                                        </h3>

                                        <div className="flex justify-between">
                                            <p className="mt-4 text-[17px] leading-8 text-cyan-800/70">
                                                <span className="flex items-center gap-2">
                                                    {/* Final Price */}
                                                    <span className="text-sm font-semibold text-[#22d3ee]">
                                                        ₹
                                                        {p.discount_price ||
                                                            p.price}
                                                    </span>

                                                    {/* Original Price */}
                                                    {p.discount_price &&
                                                        p.price &&
                                                        p.price >
                                                            p.discount_price && (
                                                            <span className="text-xs text-gray-400 line-through">
                                                                ₹{p.price}
                                                            </span>
                                                        )}
                                                </span>
                                            </p>
                                        </div>
                                        <div className="mt-5 flex justify-center">
                                            <div className="h-[1px] w-48 rounded-full bg-gradient-to-r from-cyan-100 via-cyan-400 to-cyan-100" />
                                        </div>
                                    </div>
                                </article>
                            </Reveal>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}
