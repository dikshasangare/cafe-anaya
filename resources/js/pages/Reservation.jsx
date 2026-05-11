import { Calendar, Clock, Coffee, Users } from "lucide-react";
import { useRef, useState } from "react";
import MainLayout from "../Layouts/MainLayout";
import { Head } from "@inertiajs/react";

import {
    AnimatePresence,
    motion,
    useAnimation,
    useInView,
    useMotionTemplate,
    useMotionValue,
    useScroll,
    useSpring,
    useTransform,
} from "framer-motion";
import axios from "axios";

export default function Reservation() {
    const [step, setStep] = useState(1);

    const [form, setForm] = useState({
        date: "",
        time: "",
        guests: "",
        name: "",
        phone: "",
    });

    const timeSlots = [
        "6:00 PM",
        "6:30 PM",
        "7:00 PM",
        "7:30 PM",
        "8:00 PM",
        "8:30 PM",
    ];

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
    const nextStep = () => {
        let newErrors = {
            date: "",
            guests: "",
            time: "",
            name: "",
            phone: "",
        };

        // STEP 1
        if (step === 1) {
            if (!form.date) {
                newErrors.date = "Please select reservation date";
            }

            if (!form.guests) {
                newErrors.guests = "Please select guests";
            }

            setErrors(newErrors);

            if (!newErrors.date && !newErrors.guests) {
                setStep(2);
            }
        }

        // STEP 2
        else if (step === 2) {
            if (!form.time) {
                newErrors.time = "Please select time slot";
            }

            setErrors(newErrors);

            if (!newErrors.time) {
                setStep(3);
            }
        }

        // STEP 3
        else if (step === 3) {
            if (!form.name.trim()) {
                newErrors.name = "Please enter your name";
            }

            if (!form.phone.trim()) {
                newErrors.phone = "Please enter phone number";
            } else {
                const phoneRegex = /^[6-9]\d{9}$/;

                if (!phoneRegex.test(form.phone)) {
                    newErrors.phone =
                        "Please enter valid 10 digit phone number";
                }
            }

            setErrors(newErrors);

            if (!newErrors.name && !newErrors.phone) {
                setStep(4);
            }
        }
    };

    const handleReservation = async () => {
        setLoading(true);

        try {
            const response = await axios.post("/api/reservations", form);

            if (response.data.success) {
                setStep(5);
            }
        } catch (error) {
            console.log(error);

            alert(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };
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
            {/* bg-[#050505] */}

            <section className="relative bg-[#f4fbfb] text-[#062b2f] py-32 px-6 overflow-hidden">
                {/* Soft Cyan Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-cyan-300/20 blur-[140px] rounded-full" />

                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-200/20 blur-[140px] rounded-full" />

                {/* Noise Texture */}
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
                        Tell us when you’re coming and we’ll prepare a
                        beautifully curated table experience waiting just for
                        you.
                    </p>
                </div>

                {/* FORM */}
                {/* FORM */}
                <div className="relative max-w-2xl mx-auto mt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="relative bg-white/70 border border-cyan-200/60 backdrop-blur-3xl rounded-[2.5rem] p-12 shadow-[0_25px_80px_rgba(6,182,212,0.12)] overflow-hidden"
                    >
                        {/* STEP INDICATOR */}

                        <div className="relative mb-16 px-4">
                            {/* Ambient Glow */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="w-[70%] h-32 bg-cyan-400/10 blur-[100px] rounded-full" />
                            </div>

                            <div className="relative flex items-start justify-between">
                                {/* Base Line */}
                                <div className=" absolute top-6 left-0 w-full h-[2px] rounded-full bg-gradient-to-r from-cyan-100/50 via-cyan-200/60 to-cyan-100/50 " />

                                {/* Active Line */}
                                <motion.div
                                    initial={false}
                                    animate={{
                                        width: `${
                                            step === 1
                                                ? "0%"
                                                : step === 2
                                                  ? "33%"
                                                  : step === 3
                                                    ? "66%"
                                                    : "100%"
                                        }`,
                                    }}
                                    transition={{
                                        duration: 0.8,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    className=" absolute top-6 left-0 h-[3px] rounded-full bg-gradient-to-r from-cyan-300 via-cyan-500 to-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.45)] "
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
                                                {/* Outer Glow */}
                                                {active && (
                                                    <div className=" absolute top-0 w-20 h-20 bg-cyan-400/20 blur-3xl rounded-full " />
                                                )}

                                                {/* Step Circle */}
                                                <motion.div
                                                    whileHover={{
                                                        scale: 1.08,
                                                        y: -2,
                                                    }}
                                                    transition={{
                                                        duration: 0.3,
                                                    }}
                                                    className={` relative w-14 h-14 rounded-[1.2rem] flex items-center justify-center text-[11px] font-semibold tracking-[0.15em] transition-all duration-700 border ${active ? ` bg-gradient-to-br from-cyan-400 via-cyan-500 to-cyan-600 border-cyan-300 text-white shadow-[0_15px_40px_rgba(6,182,212,0.35)] ` : ` bg-white/70 backdrop-blur-2xl border-cyan-100 text-cyan-300 shadow-[0_10px_30px_rgba(6,182,212,0.08)] `} `}
                                                >
                                                    {/* Glass Reflection */}
                                                    <div className=" absolute inset-0 rounded-[1.2rem] bg-gradient-to-b from-white/30 to-transparent opacity-40" />

                                                    {/* Pulse Ring */}
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
                                                            className=" absolute inset-0 rounded-[1.2rem] border border-cyan-300 "
                                                        />
                                                    )}

                                                    <span className="relative z-10">
                                                        0{index + 1}
                                                    </span>
                                                </motion.div>

                                                {/* Label */}
                                                <motion.span
                                                    animate={{
                                                        opacity: active
                                                            ? 1
                                                            : 0.6,
                                                        y: active ? 0 : 2,
                                                    }}
                                                    className={` mt-5 text-[10px] uppercase tracking-[0.35em] font-medium transition-all duration-500 ${active ? "text-cyan-700" : "text-cyan-300"} `}
                                                >
                                                    {item}
                                                </motion.span>

                                                {/* Active Dot */}
                                                {active && (
                                                    <motion.div
                                                        layoutId="active-dot"
                                                        className=" mt-2 w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_12px_rgba(6,182,212,0.6)]"
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
                                    {/* DATE */}
                                    <div className="relative">
                                        <Calendar
                                            className="absolute left-0 top-1 text-cyan-600"
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
                                                    date: e.target.value,
                                                })
                                            }
                                            placeholder="Select Date"
                                            className={`peer w-full bg-transparent border-b border-cyan-200 pl-8 pb-2 text-sm focus:outline-none focus:border-cyan-500 placeholder:text-[5px] placeholder-transparent focus:placeholder-stone-400 ${
                                                errors?.date
                                                    ? "border-red-400 focus:border-red-500"
                                                    : "border-cyan-200 focus:border-cyan-500"
                                            }`}
                                        />

                                        <label className="absolute left-8 transition-all text-stone-500 top-2 text-sm peer-focus:-top-3 peer-focus:text-xs peer-focus:text-cyan-400 peer-[&:not(:placeholder-shown)]:-top-3 peer-[&:not(:placeholder-shown)]:text-xs">
                                            Select Date
                                        </label>

                                        {errors?.date && (
                                            <p className="text-red-500 text-xs mt-3">
                                                {errors.date}
                                            </p>
                                        )}
                                    </div>

                                    {/* GUESTS */}
                                    <div className="relative">
                                        <Users
                                            className="absolute left-0 top-1 text-cyan-600"
                                            size={18}
                                        />

                                        <select
                                            value={form.guests}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    guests: e.target.value,
                                                })
                                            }
                                            className={`peer w-full bg-transparent border-b border-cyan-200 pl-8 pb-3 text-sm focus:outline-none focus:border-cyan-500 placeholder:text-[5px] placeholder-transparent focus:placeholder-stone-400 ${
                                                errors?.guests
                                                    ? "border-red-400 focus:border-red-500"
                                                    : "border-cyan-200 focus:border-cyan-500"
                                            }`}
                                        >
                                            <option value="">
                                                Select Guests
                                            </option>

                                            <option>1 Person</option>
                                            <option>2 People</option>
                                            <option>3 People</option>
                                            <option>4 People</option>
                                            <option>5+ People</option>
                                        </select>

                                        {errors?.guests && (
                                            <p className="text-red-500 text-xs mt-3">
                                                {errors.guests}
                                            </p>
                                        )}
                                    </div>

                                    <button
                                        onClick={nextStep}
                                        disabled={!form.date || !form.guests}
                                        className={`w-full py-5 rounded-2xl text-[11px] uppercase tracking-[0.35em] font-semibold transition-all duration-500 ${
                                            !form.date || !form.guests
                                                ? "bg-stone-300 text-stone-500 cursor-not-allowed"
                                                : "bg-cyan-500 text-white hover:bg-cyan-400 hover:shadow-[0_0_30px_rgba(6,182,212,0.35)]"
                                        }`}
                                    >
                                        Continue
                                    </button>
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

                                        <div className="grid grid-cols-2 gap-4">
                                            {timeSlots.map((slot) => (
                                                <button
                                                    key={slot}
                                                    onClick={() =>
                                                        setForm({
                                                            ...form,
                                                            time: slot,
                                                        })
                                                    }
                                                    className={`py-4 rounded-2xl border text-sm transition-all duration-500 ${
                                                        form.time === slot
                                                            ? "bg-cyan-500 border-cyan-500 text-white shadow-lg shadow-cyan-500/20 scale-[1.03]"
                                                            : "border-cyan-200 hover:border-cyan-500 hover:bg-cyan-50"
                                                    }`}
                                                >
                                                    {slot}
                                                </button>
                                            ))}
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
                                    {/* NAME */}
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
                                            className={`w-full bg-transparent border-b border-cyan-200 pb-2 text-sm focus:outline-none focus:border-cyan-500 peer ${
                                                errors?.name
                                                    ? "border-red-400 focus:border-red-500"
                                                    : "border-cyan-200 focus:border-cyan-500"
                                            }`}
                                        />
                                        <label className="absolute left-0 top-2 text-stone-500 text-sm transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-cyan-400 peer-valid:-top-3 peer-valid:text-xs">
                                            Your Name
                                        </label>

                                        {errors?.name && (
                                            <p className="text-red-500 text-xs mt-3">
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>

                                    {/* PHONE */}
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
                                            className={`w-full bg-transparent border-b border-cyan-200 pb-2 text-sm focus:outline-none focus:border-cyan-500 peer ${
                                                errors?.phone
                                                    ? "border-red-400 focus:border-red-500"
                                                    : "border-cyan-200 focus:border-cyan-500"
                                            }`}
                                        />

                                        <label className="absolute left-0 top-2 text-stone-500 text-sm transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-cyan-400 peer-valid:-top-3 peer-valid:text-xs">
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

                                    <div className="space-y-5 text-sm text-[#062b2f] bg-cyan-50/60 border border-cyan-100 rounded-3xl p-8">
                                        <div className="flex justify-between border-b border-cyan-100 pb-3">
                                            <span>Date</span>
                                            <span>{form.date}</span>
                                        </div>

                                        <div className="flex justify-between border-b border-cyan-100 pb-3">
                                            <span>Guests</span>
                                            <span>{form.guests}</span>
                                        </div>

                                        <div className="flex justify-between border-b border-cyan-100 pb-3">
                                            <span>Time</span>
                                            <span>{form.time}</span>
                                        </div>

                                        <div className="flex justify-between border-b border-cyan-100 pb-3">
                                            <span>Name</span>
                                            <span>{form.name}</span>
                                        </div>

                                        <div className="flex justify-between border-b border-cyan-100 pb-3">
                                            <span>Phone</span>
                                            <span>{form.phone}</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => setStep(3)}
                                            className="w-full py-4 rounded-2xl border border-cyan-200 hover:bg-cyan-50 transition-all"
                                        >
                                            Back
                                        </button>

                                        <button
                                            className="w-full py-4 rounded-2xl bg-cyan-500 text-white hover:bg-cyan-400 hover:shadow-[0_0_30px_rgba(6,182,212,0.35)] transition-all duration-500"
                                            onClick={handleReservation}
                                            disabled={loading}
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
                                    <div className="w-24 h-24 rounded-full bg-cyan-100 mx-auto flex items-center justify-center">
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
