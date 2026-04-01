import { useState, useEffect } from "react";

const slides = [
    {
        image: "https://images.unsplash.com/photo-1696448953689-d3ea896718fc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470",
        title: "Taste of Royal India",
        subtitle:
            "Experience the rich flavors and aroma of authentic Indian cuisine",
    },
    {
        image: "https://images.unsplash.com/photo-1611601184963-9d1de9b79ff3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470",
        title: "A Feast for the Senses",
        subtitle: "Where Taste Meets Elegance",
    },
    {
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1470",
        title: "Crafted With Passion",
        subtitle: "Every Dish Tells a Story",
    },
    {
        image: "https://images.unsplash.com/photo-1670710028442-06a2df4bdf85?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1413",
        title: "Experience Flavorful Creations",
        subtitle: "Taste the Luxury You Deserve",
    },
];

export default function HeroCarousel() {
    const [current, setCurrent] = useState(0);

    // Auto slide every 5s
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-[80vh] sm:h-[90vh] lg:h-screen overflow-hidden bg-black">
            {/* Slides */}
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                        index === current ? "opacity-100 z-10" : "opacity-0 z-0"
                    }`}
                >
                    <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/55"></div>

                    {/* Text Animation */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
                        <h1
                            className={`text-3xl sm:text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg transition-all duration-700 ease-out ${
                                index === current
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-16"
                            }`}
                        >
                            {slide.title}
                        </h1>
                        <p
                            className={`text-lg sm:text-xl md:text-2xl font-light transition-all duration-700 ease-out delay-200 ${
                                index === current
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-16"
                            }`}
                        >
                            {slide.subtitle}
                        </p>
                    </div>
                </div>
            ))}

            {/* Dots */}
            {/* <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`w-3 h-3 rounded-full transition-all ${
                            current === index
                                ? "bg-cyan-600 scale-125"
                                : "bg-white hover:bg-cyan-600 border-4 border-cyan-600"
                        }`}
                    />
                ))}
            </div> */}
        </div>
    );
}
