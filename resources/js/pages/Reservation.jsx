import { Calendar, Clock, Coffee, Users } from "lucide-react";
import { useRef, useState } from "react";
import MainLayout from "../Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import {
    AnimatePresence,
    motion,
    useScroll,
    useTransform,
} from "framer-motion";
import axios from "axios";

// ─── NLP Time converter: "7:00 PM" → "19:00" ───────────────────────────────
function toDisplayTime(time24) {
    if (!time24) return null;
    const [h, m] = time24.split(":").map(Number);
    const ampm = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 || 12;
    return `${h12}:${String(m).padStart(2, "0")} ${ampm}`;
}

// ─── NLP Guest count: 4 → "4 People" ───────────────────────────────────────
function toGuestString(n) {
    if (!n) return null;
    if (n === 1) return "1 Person";
    if (n >= 5) return "5+ People";
    return `${n} People`;
}

export default function Reservation() {
    const [step, setStep] = useState(1);

    const [form, setForm] = useState({
        date: "",
        time: "",
        guests: "",
        name: "",
        phone: "",
    });

    // ── NLP state ──────────────────────────────────────────────────────────
    const [nlpInput, setNlpInput] = useState("");
    const [nlpParsing, setNlpParsing] = useState(false);
    const [nlpResult, setNlpResult] = useState(null); // {confidence, filled fields}
    const [nlpError, setNlpError] = useState("");

    // const timeSlots = [
    //     "6:00 PM",
    //     "6:30 PM",
    //     "7:00 PM",
    //     "7:30 PM",
    //     "8:00 PM",
    //     "8:30 PM",
    // ];

    const generateTimeSlots = () => {
        const slots = [];
        // 6 means 6 AM, 23 means 11 PM
        for (let hour = 6; hour <= 23; hour++) {
            const period = hour >= 12 ? "PM" : "AM";
            const displayHour = hour > 12 ? hour - 12 : hour;

            slots.push(`${displayHour}:00 ${period}`);
            if (hour !== 23) {
                // Stop at exactly 11:00 PM
                slots.push(`${displayHour}:30 ${period}`);
            }
        }
        return slots;
    };

    const timeSlots = generateTimeSlots();

    const [focusedField, setFocusedField] = useState(null);
    const pageRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: pageRef,
        offset: ["start 80%", "end 20%"],
    });
    const imageY = useTransform(scrollYProgress, [0, 0.5], ["0%", "20%"]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({
        date: "",
        guests: "",
        time: "",
        name: "",
        phone: "",
    });

    // ── NLP parse handler ──────────────────────────────────────────────────
    const parseWithAi = async () => {
        if (!nlpInput.trim() || nlpParsing) return;
        setNlpParsing(true);
        setNlpResult(null);
        setNlpError("");

        try {
            const res = await fetch("/api/reservations/parse", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: nlpInput }),
            });
            const json = await res.json();

            if (json.success && json.data) {
                const d = json.data;
                const filled = [];

                setForm((prev) => {
                    const updated = { ...prev };

                    if (d.date) {
                        updated.date = d.date;
                        filled.push("date");
                    }
                    if (d.time) {
                        // Convert 24hr "19:00" → "7:00 PM" to match your time slots
                        const displayTime = toDisplayTime(d.time);
                        // Only set if it matches one of your time slots
                        if (timeSlots.includes(displayTime)) {
                            updated.time = displayTime;
                            filled.push("time");
                        } else {
                            // Pick the closest slot
                            updated.time = displayTime;
                            filled.push("time");
                        }
                    }
                    if (d.party_size) {
                        updated.guests = toGuestString(d.party_size);
                        filled.push("guests");
                    }

                    return updated;
                });

                setNlpResult({ confidence: d.confidence, filled });
            } else {
                setNlpError(
                    "Could not parse your request. Please fill the form manually.",
                );
            }
        } catch (e) {
            setNlpError("AI parsing failed. Please fill the form manually.");
        } finally {
            setNlpParsing(false);
        }
    };

    const confidenceBg = {
        high: "bg-emerald-50 border-emerald-200 text-emerald-700",
        medium: "bg-amber-50 border-amber-200 text-amber-700",
        low: "bg-red-50 border-red-200 text-red-600",
    };

    const confidenceMsg = {
        high: "✓ All details found — form is pre-filled below!",
        medium: "⚠ Some details found — check the highlighted fields.",
        low: "✗ Could not extract enough — please fill manually.",
    };

    // ── Step validation ────────────────────────────────────────────────────
    const nextStep = () => {
        let newErrors = { date: "", guests: "", time: "", name: "", phone: "" };

        if (step === 1) {
            if (!form.date) newErrors.date = "Please select reservation date";
            if (!form.guests) newErrors.guests = "Please select guests";
            setErrors(newErrors);
            if (!newErrors.date && !newErrors.guests) setStep(2);
        } else if (step === 2) {
            if (!form.time) newErrors.time = "Please select time slot";
            setErrors(newErrors);
            if (!newErrors.time) setStep(3);
        } else if (step === 3) {
            if (!form.name.trim()) newErrors.name = "Please enter your name";
            if (!form.phone.trim()) {
                newErrors.phone = "Please enter phone number";
            } else {
                const phoneRegex = /^[6-9]\d{9}$/;
                if (!phoneRegex.test(form.phone))
                    newErrors.phone =
                        "Please enter valid 10 digit phone number";
            }
            setErrors(newErrors);
            if (!newErrors.name && !newErrors.phone) setStep(4);
        }
    };

    const handleReservation = async () => {
        setLoading(true);
        try {
            const response = await axios.post("/api/reservations", form);
            if (response.data.success) setStep(5);
        } catch (error) {
            alert(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const isFieldAiFilled = (field) => nlpResult?.filled?.includes(field);

    return (
        <MainLayout>
            <div className="bg-[#080808] text-stone-200 selection:bg-cyan-500/30 selection:text-white mt-[-3rem]">
                <Head title="Our Story | Café Anaya" />

                <section className="relative min-h-[120vh] w-full overflow-hidden flex items-center justify-center">
                    {/* Background */}
                    <motion.div
                        style={{ y: imageY }}
                        className="absolute inset-0 z-0"
                    >
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#0b0908] z-10" />

                        {/* Ambient Light */}
                        <div className="absolute top-40 left-20 w-72 h-72 bg-[#d6b98c]/10 blur-[140px] rounded-full z-10" />

                        <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-500/5 blur-[160px] rounded-full z-10" />

                        {/* Noise Texture */}
                        <div className="absolute inset-0 opacity-[0.03] mix-blend-soft-light bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-10" />

                        <img
                            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2000"
                            className="w-full h-[120%] object-cover brightness-[0.45]"
                            alt="Luxury Cafe"
                        />
                    </motion.div>

                    {/* Content */}
                    <div className="relative z-20 text-center top-32 px-6 max-w-5xl">
                        {/* Top Label */}
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            className="text-cyan-300 text-[10px] tracking-[0.8em] uppercase mb-6 block"
                        >
                            Cafe Anaya • Reservation Experience
                        </motion.span>

                        {/* Heading */}
                        <motion.h1
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="text-6xl md:text-[5vw] font-serif italic text-white tracking-tight leading-none"
                        >
                            Evenings Worth{" "}
                            <span className="text-cyan-400">
                                Remembering
                            </span>{" "}
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 1 }}
                            className="mt-5 text-stone-300 text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
                        >
                            Every reservation at Café Anaya is an invitation
                            into slow conversations, artisan flavors, warm
                            lighting, and moments designed to linger
                            beautifully.
                        </motion.p>

                        {/* Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 1 }}
                            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5"
                        >
                            {/* Menu Button */}
                            <button className="px-8 py-4 rounded-full border border-white/15 bg-white/[0.03] backdrop-blur-xl text-white text-xs uppercase tracking-[0.35em] font-bold transition-all duration-500 hover:border-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300 hover:scale-105">
                                Explore Menu
                            </button>
                        </motion.div>
                    </div>
                </section>
            </div>

            <section className="relative bg-[#f4fbfb] text-[#062b2f] py-32 px-6 overflow-hidden">
                {/* Glows */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-cyan-300/20 blur-[140px] rounded-full" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-200/20 blur-[140px] rounded-full" />
                <div className="absolute inset-0 opacity-[0.03] mix-blend-soft-light bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                {/* Heading */}
                <div className="space-y-5 text-center relative z-10">
                    <p className="text-[10px] tracking-[0.6em] uppercase text-cyan-600 font-semibold">
                        Reservation
                    </p>
                    <h2 className="text-4xl md:text-6xl font-serif italic text-[#062b2f] leading-tight">
                        Save Your Corner
                    </h2>
                    <p className="text-cyan-900/70 leading-relaxed max-w-xl mx-auto">
                        Tell us when you're coming and we'll prepare a
                        beautifully curated table experience waiting just for
                        you.
                    </p>
                </div>

                {/* ── AI NLP Smart Bar — only show on step 1 ── */}
                <AnimatePresence>
                    {step === 1 && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="relative max-w-2xl mx-auto mt-12 z-10"
                        >
                            <div
                                className="bg-white/80 backdrop-blur-xl border border-cyan-200/80
                                rounded-3xl p-6 shadow-[0_8px_40px_rgba(6,182,212,0.10)]"
                            >
                                <div className="flex items-center gap-2 mb-4">
                                    <div
                                        className="w-6 h-6 rounded-full bg-cyan-500 flex items-center
                                        justify-center text-white text-xs flex-shrink-0"
                                    >
                                        ✨
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold tracking-widest text-[#062b2f]">
                                            Book with natural language
                                        </p>
                                        <p className="text-xs text-cyan-600/80 tracking-wider">
                                            Describe your booking — AI will fill
                                            the form for you
                                        </p>
                                    </div>
                                </div>

                                {/* Input row */}
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={nlpInput}
                                        onChange={(e) =>
                                            setNlpInput(e.target.value)
                                        }
                                        onKeyDown={(e) =>
                                            e.key === "Enter" && parseWithAi()
                                        }
                                        placeholder='"Table for 4 this Saturday at 7pm"'
                                        className="flex-1 bg-[#f4fbfb] border border-cyan-200 rounded-2xl
                                            px-4 py-3 text-sm text-[#062b2f] placeholder-cyan-400/90
                                            focus:outline-none focus:border-cyan-400 transition-all placeholder:tracking-widest tracking-widest"
                                    />
                                    <button
                                        type="button"
                                        onClick={parseWithAi}
                                        disabled={
                                            nlpParsing || !nlpInput.trim()
                                        }
                                        className="px-5 py-3 rounded-2xl text-sm font-semibold text-white
                                            bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40
                                            transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]
                                            whitespace-nowrap"
                                    >
                                        {nlpParsing ? (
                                            <span className="flex items-center gap-2">
                                                <svg
                                                    className="animate-spin w-4 h-4"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    />
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8v8z"
                                                    />
                                                </svg>
                                                Parsing...
                                            </span>
                                        ) : (
                                            "⚡ Auto-fill"
                                        )}
                                    </button>
                                </div>

                                {/* Example chips */}
                                {!nlpResult && !nlpParsing && (
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {[
                                            "Table for 2 tomorrow evening",
                                            "Dinner for 4 next Friday at 8pm",
                                            "Lunch for 3 this Sunday",
                                        ].map((ex) => (
                                            <button
                                                key={ex}
                                                type="button"
                                                onClick={() => setNlpInput(ex)}
                                                className="text-xs text-cyan-600 bg-cyan-50 border
                                                    border-cyan-200 rounded-full px-3 py-1
                                                    hover:bg-cyan-100 transition-colors tracking-widest"
                                            >
                                                {ex}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* Confidence result */}
                                {nlpResult && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`mt-3 px-4 py-2.5 rounded-2xl border text-xs font-medium
                                            ${confidenceBg[nlpResult.confidence]}`}
                                    >
                                        {confidenceMsg[nlpResult.confidence]}
                                        {nlpResult.filled.length > 0 && (
                                            <span className="ml-2 opacity-70 ">
                                                Filled:{" "}
                                                {nlpResult.filled.join(", ")}
                                            </span>
                                        )}
                                    </motion.div>
                                )}

                                {/* Error */}
                                {nlpError && (
                                    <p className="mt-3 text-xs text-red-500">
                                        {nlpError}
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* FORM */}
                <div className="relative max-w-4xl mx-auto mt-8">
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="relative bg-white/70 border border-cyan-200/60 backdrop-blur-3xl
                            rounded-[2.5rem] p-12 shadow-[0_25px_80px_rgba(6,182,212,0.12)] overflow-hidden"
                    >
                        {/* STEP INDICATOR */}
                        <div className="relative mb-16 px-4">
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="w-[70%] h-32 bg-cyan-400/10 blur-[100px] rounded-full" />
                            </div>
                            <div className="relative flex items-start justify-between">
                                <div
                                    className="absolute top-6 left-0 w-full h-[2px] rounded-full
                                    bg-gradient-to-r from-cyan-100/50 via-cyan-200/60 to-cyan-100/50"
                                />
                                <motion.div
                                    initial={false}
                                    animate={{
                                        width: `${step === 1 ? "0%" : step === 2 ? "33%" : step === 3 ? "66%" : "100%"}`,
                                    }}
                                    transition={{
                                        duration: 0.8,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    className="absolute top-6 left-0 h-[3px] rounded-full
                                        bg-gradient-to-r from-cyan-300 via-cyan-500 to-cyan-400
                                        shadow-[0_0_25px_rgba(6,182,212,0.45)]"
                                />
                                {["Details", "Time", "Contact", "Confirm"].map(
                                    (item, index) => {
                                        const active = step >= index + 1;
                                        return (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, y: 30 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{
                                                    delay: index * 0.08,
                                                    duration: 0.6,
                                                }}
                                                className="relative z-10 flex flex-col items-center"
                                            >
                                                {active && (
                                                    <div className="absolute top-0 w-20 h-20 bg-cyan-400/20 blur-3xl rounded-full" />
                                                )}
                                                <motion.div
                                                    whileHover={{
                                                        scale: 1.08,
                                                        y: -2,
                                                    }}
                                                    transition={{
                                                        duration: 0.3,
                                                    }}
                                                    className={`relative w-14 h-14 rounded-[1.2rem] flex items-center
                                                    justify-center text-[11px] font-semibold tracking-[0.15em]
                                                    transition-all duration-700 border ${
                                                        active
                                                            ? "bg-gradient-to-br from-cyan-400 via-cyan-500 to-cyan-600 border-cyan-300 text-white shadow-[0_15px_40px_rgba(6,182,212,0.35)]"
                                                            : "bg-white/70 backdrop-blur-2xl border-cyan-100 text-cyan-300 shadow-[0_10px_30px_rgba(6,182,212,0.08)]"
                                                    }`}
                                                >
                                                    <div className="absolute inset-0 rounded-[1.2rem] bg-gradient-to-b from-white/30 to-transparent opacity-40" />
                                                    {active && (
                                                        <motion.div
                                                            animate={{
                                                                scale: [1, 1.4],
                                                                opacity: [
                                                                    0.4, 0,
                                                                ],
                                                            }}
                                                            transition={{
                                                                duration: 2,
                                                                repeat: Infinity,
                                                            }}
                                                            className="absolute inset-0 rounded-[1.2rem] border border-cyan-300"
                                                        />
                                                    )}
                                                    <span className="relative z-10">
                                                        0{index + 1}
                                                    </span>
                                                </motion.div>
                                                <motion.span
                                                    animate={{
                                                        opacity: active
                                                            ? 1
                                                            : 0.6,
                                                        y: active ? 0 : 2,
                                                    }}
                                                    className={`mt-5 text-[10px] uppercase tracking-[0.35em] font-medium
                                                    transition-all duration-500 ${active ? "text-cyan-700" : "text-cyan-300"}`}
                                                >
                                                    {item}
                                                </motion.span>
                                                {active && (
                                                    <motion.div
                                                        layoutId="active-dot"
                                                        className="mt-2 w-1.5 h-1.5 rounded-full bg-cyan-500
                                                        shadow-[0_0_12px_rgba(6,182,212,0.6)]"
                                                    />
                                                )}
                                            </motion.div>
                                        );
                                    },
                                )}
                            </div>
                        </div>

                        <AnimatePresence mode="wait">
                            {/* STEP 1 */}
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 40 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -40 }}
                                    transition={{ duration: 0.5 }}
                                    className="space-y-10"
                                >
                                    <div className="flex gap-10">
                                        {/* DATE */}
                                        <div className="w-1/2 flex flex-col">
                                            <div className="flex justify-between">
                                                <label className="text-stone-500 text-md font-medium">
                                                    Select Date
                                                </label>
                                                {isFieldAiFilled("date") && (
                                                    <span className=" text-[10px] text-cyan-500 font-semibold bg-cyan-50 px-2 py-1 rounded-full border border-cyan-200 tracking-widest">
                                                        ✨ AI
                                                    </span>
                                                )}
                                            </div>
                                            <div className="relative flex items-center mt-3">
                                                <Calendar
                                                    className="absolute mb-1 text-cyan-600 pointer-events-none"
                                                    size={18}
                                                />
                                                <input
                                                    type="date"
                                                    min={
                                                        new Date()
                                                            .toISOString()
                                                            .split("T")[0]
                                                    }
                                                    value={form.date}
                                                    onChange={(e) =>
                                                        setForm({
                                                            ...form,
                                                            date: e.target
                                                                .value,
                                                        })
                                                    }
                                                    className={`peer w-full bg-transparent border-b pl-7 pr-1 pb-1 text-sm  focus:outline-none placeholder:text-[5px] placeholder-transparent
                                                       `}
                                                />
                                            </div>

                                            {errors?.date && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    {errors.date}
                                                </p>
                                            )}
                                        </div>

                                        {/* GUESTS */}

                                        <div className="w-1/2 flex flex-col gap-2">
                                            <div className="flex justify-between">
                                                <label className="text-stone-500 text-md font-medium">
                                                    Number of Guests
                                                </label>

                                                {isFieldAiFilled("guests") && (
                                                    <span className="text-[10px] text-cyan-500 font-semibold bg-cyan-50 px-2 py-1 rounded-full border border-cyan-200 tracking-widest">
                                                        ✨ AI
                                                    </span>
                                                )}
                                            </div>

                                            <div className="relative flex items-center mt-2">
                                                <Users
                                                    className="absolute mb-1 text-cyan-600 pointer-events-none"
                                                    size={18}
                                                />

                                                <select
                                                    value={form.guests}
                                                    onChange={(e) =>
                                                        setForm({
                                                            ...form,
                                                            guests: e.target
                                                                .value,
                                                        })
                                                    }
                                                    className={`peer w-full bg-transparent border-b pl-7 pb-1 text-sm appearance-none focus:outline-none `}
                                                >
                                                    <option
                                                        value=""
                                                        className="text-stone-400"
                                                    >
                                                        Select Guests
                                                    </option>
                                                    <option value="1 Person">
                                                        1 Person
                                                    </option>
                                                    <option value="2 People">
                                                        2 People
                                                    </option>
                                                    <option value="3 People">
                                                        3 People
                                                    </option>
                                                    <option value="4 People">
                                                        4 People
                                                    </option>
                                                    <option value="5+ People">
                                                        5+ People
                                                    </option>
                                                </select>
                                            </div>

                                            {errors?.guests && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    {errors.guests}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="w-full flex justify-end">
                                        <button
                                            onClick={nextStep}
                                            disabled={
                                                !form.date || !form.guests
                                            }
                                            className={`w-72 right-0 py-5 rounded-2xl text-[11px] uppercase
                                            tracking-[0.35em] font-semibold transition-all duration-500 ${
                                                !form.date || !form.guests
                                                    ? "bg-stone-300 text-stone-500 cursor-not-allowed"
                                                    : "bg-cyan-500 text-white hover:bg-cyan-400 hover:shadow-[0_0_30px_rgba(6,182,212,0.35)]"
                                            }`}
                                        >
                                            Continue
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 2 */}
                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 40 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -40 }}
                                    transition={{ duration: 0.5 }}
                                    className="space-y-10"
                                >
                                    <div>
                                        <h3 className="text-3xl font-serif italic text-[#062b2f] mb-3">
                                            Select Time
                                        </h3>
                                        <p className="text-sm text-cyan-900/60 mb-8">
                                            Choose your preferred dining slot.
                                        </p>

                                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 max-h-[600px] overflow-y-auto p-2 border border-slate-100 rounded-2xl">
                                            {timeSlots.map((slot) => {
                                                // Parse "6:30 PM" -> hour: "6", mins: "30", period: "PM"
                                                const [timePart, period] =
                                                    slot.split(" ");
                                                const [hour, mins] =
                                                    timePart.split(":");

                                                // Determine a subtle label based on the hour/period
                                                const numericHour =
                                                    parseInt(hour) +
                                                    (period === "PM" &&
                                                    hour !== "12"
                                                        ? 12
                                                        : 0);
                                                let timeOfDay = "🌅 Morning";
                                                if (
                                                    numericHour >= 12 &&
                                                    numericHour < 17
                                                )
                                                    timeOfDay = "☀️ Afternoon";
                                                if (numericHour >= 17)
                                                    timeOfDay = "🌙 Evening";

                                                const isSelected =
                                                    form.time === slot;

                                                return (
                                                    <button
                                                        key={slot}
                                                        type="button"
                                                        onClick={() =>
                                                            setForm({
                                                                ...form,
                                                                time: slot,
                                                            })
                                                        }
                                                        className={`py-3 px-4 rounded-2xl border flex flex-col items-center justify-center transition-all duration-300 relative group ${
                                                            isSelected
                                                                ? "bg-cyan-500 border-cyan-500 text-white shadow-lg shadow-cyan-500/20 scale-[1.03]"
                                                                : "border-slate-200 bg-white text-slate-700 hover:border-cyan-400 hover:bg-cyan-50/50"
                                                        }`}
                                                    >
                                                        {/* Time of Day Tag (Hidden by default, pops up on hover or selection) */}
                                                        <span
                                                            className={`text-[10px] mb-1 font-medium tracking-wider uppercase opacity-60 transition-colors ${
                                                                isSelected
                                                                    ? "text-cyan-100"
                                                                    : "text-slate-400 group-hover:text-cyan-600"
                                                            }`}
                                                        >
                                                            {timeOfDay}
                                                        </span>

                                                        {/* Main Creative Time Display */}
                                                        <div className="flex items-baseline gap-0.5">
                                                            <span className="text-2xl font-bold tracking-tight">
                                                                {hour}
                                                            </span>
                                                            <span className="text-xs font-semibold opacity-80">
                                                                :{mins}
                                                            </span>
                                                            <span className="text-xs font-medium ml-1 opacity-70 tracking-wide">
                                                                {period}
                                                            </span>
                                                        </div>

                                                        {/* AI pre-selected badge */}
                                                        {isFieldAiFilled(
                                                            "time",
                                                        ) &&
                                                            isSelected && (
                                                                <span className="absolute -top-2 -right-1.5 text-[9px] bg-white text-cyan-600 border border-cyan-200 rounded-full px-2 py-0.5 font-bold shadow-sm animate-bounce">
                                                                    ✨ AI
                                                                </span>
                                                            )}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                        {errors?.time && (
                                            <p className="text-red-500 text-xs mt-4">
                                                {errors.time}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => setStep(1)}
                                            className="w-full py-4 rounded-2xl border border-cyan-200 hover:bg-cyan-50 transition-all"
                                        >
                                            Back
                                        </button>
                                        <button
                                            onClick={nextStep}
                                            disabled={!form.time}
                                            className={`w-full py-4 rounded-2xl transition-all duration-500 ${
                                                !form.time
                                                    ? "bg-stone-300 text-stone-500 cursor-not-allowed"
                                                    : "bg-cyan-500 text-white hover:bg-cyan-400"
                                            }`}
                                        >
                                            Continue
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 3 */}
                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: 40 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -40 }}
                                    transition={{ duration: 0.5 }}
                                    className="space-y-10"
                                >
                                    <h3 className="text-3xl font-serif italic text-[#062b2f] mb-3">
                                        Enter Contact Info
                                    </h3>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={form.name}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    name: e.target.value,
                                                })
                                            }
                                            required
                                            className={`w-full bg-transparent border-b pb-2 text-sm
                                                focus:outline-none peer ${
                                                    errors?.name
                                                        ? "border-red-400 focus:border-red-500"
                                                        : "border-cyan-200 focus:border-cyan-500"
                                                }`}
                                        />
                                        <label
                                            className="absolute left-0 top-2 text-stone-500 text-sm
                                            transition-all peer-focus:-top-3 peer-focus:text-xs
                                            peer-focus:text-cyan-400 peer-valid:-top-3 peer-valid:text-xs"
                                        >
                                            Your Name
                                        </label>
                                        {errors?.name && (
                                            <p className="text-red-500 text-xs mt-3">
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={form.phone}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    phone: e.target.value,
                                                })
                                            }
                                            required
                                            className={`w-full bg-transparent border-b pb-2 text-sm
                                                focus:outline-none peer ${
                                                    errors?.phone
                                                        ? "border-red-400 focus:border-red-500"
                                                        : "border-cyan-200 focus:border-cyan-500"
                                                }`}
                                        />
                                        <label
                                            className="absolute left-0 top-2 text-stone-500 text-sm
                                            transition-all peer-focus:-top-3 peer-focus:text-xs
                                            peer-focus:text-cyan-400 peer-valid:-top-3 peer-valid:text-xs"
                                        >
                                            Phone Number
                                        </label>
                                        {errors?.phone && (
                                            <p className="text-red-500 text-xs mt-3">
                                                {errors.phone}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => setStep(2)}
                                            className="w-full py-4 rounded-2xl border border-cyan-200 hover:bg-cyan-50 transition-all"
                                        >
                                            Back
                                        </button>
                                        <button
                                            onClick={nextStep}
                                            className="w-full py-4 rounded-2xl bg-cyan-500 text-white hover:bg-cyan-400 transition-all duration-500"
                                        >
                                            Review
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 4 */}
                            {step === 4 && (
                                <motion.div
                                    key="step4"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="space-y-10"
                                >
                                    <div className="text-center">
                                        <h3 className="text-3xl font-serif italic text-[#062b2f]">
                                            Confirm Reservation
                                        </h3>
                                        <p className="text-sm text-cyan-900/60 mt-3">
                                            Review your booking details before
                                            confirmation.
                                        </p>
                                    </div>
                                    <div
                                        className="space-y-5 text-sm text-[#062b2f] bg-cyan-50/60
                                        border border-cyan-100 rounded-3xl p-8"
                                    >
                                        {[
                                            {
                                                label: "Date",
                                                value: form.date,
                                                field: "date",
                                            },
                                            {
                                                label: "Guests",
                                                value: form.guests,
                                                field: "guests",
                                            },
                                            {
                                                label: "Time",
                                                value: form.time,
                                                field: "time",
                                            },
                                            {
                                                label: "Name",
                                                value: form.name,
                                                field: null,
                                            },
                                            {
                                                label: "Phone",
                                                value: form.phone,
                                                field: null,
                                            },
                                        ].map(({ label, value, field }) => (
                                            <div
                                                key={label}
                                                className="flex justify-between border-b border-cyan-100 pb-3"
                                            >
                                                <span className="flex items-center gap-2">
                                                    {label}
                                                    {field &&
                                                        isFieldAiFilled(
                                                            field,
                                                        ) && (
                                                            <span
                                                                className="text-[9px] text-cyan-500 bg-cyan-50
                                                            border border-cyan-200 rounded-full px-1.5 py-0.5 font-semibold tracking-widest"
                                                            >
                                                                ✨ AI
                                                            </span>
                                                        )}
                                                </span>
                                                <span>{value}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => setStep(3)}
                                            className="w-full py-4 rounded-2xl border border-cyan-200 hover:bg-cyan-50 transition-all"
                                        >
                                            Back
                                        </button>
                                        <button
                                            onClick={handleReservation}
                                            disabled={loading}
                                            className="w-full py-4 rounded-2xl bg-cyan-500 text-white
                                                hover:bg-cyan-400 hover:shadow-[0_0_30px_rgba(6,182,212,0.35)]
                                                transition-all duration-500"
                                        >
                                            {loading
                                                ? "Booking..."
                                                : "Confirm Reservation"}
                                        </button>
                                    </div>
                                    <p className="text-cyan-900/50 leading-relaxed text-sm text-center">
                                        By reserving, you agree to our 15-minute
                                        table hold policy.
                                    </p>
                                </motion.div>
                            )}

                            {/* STEP 5 */}
                            {step === 5 && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-10"
                                >
                                    <div
                                        className="w-24 h-24 rounded-full bg-cyan-100 mx-auto
                                        flex items-center justify-center text-3xl"
                                    >
                                        ✓
                                    </div>
                                    <h2 className="text-4xl font-serif italic mt-8 text-[#062b2f]">
                                        Reservation Confirmed
                                    </h2>
                                    <p className="mt-4 text-cyan-900/60">
                                        Your table has been booked successfully.
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>
        </MainLayout>
    );
}
