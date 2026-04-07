import { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
import { router, usePage } from "@inertiajs/react";
import { Menu, X } from "lucide-react";

// 👇 Import both logos
import whiteLogo from "../../images/white-logo-transparent-png.png";
import colorLogo from "../../images/color-logo-transparent-png.png";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    // const navigate = useNavigate();
    // const location = useLocation();

    // const handleNavClick = (sectionId) => {
    //     setMenuOpen(false); // close menu on link click

    //     if (location.pathname === "/") {
    //         if (sectionId) {
    //             const section = document.querySelector(sectionId);
    //             if (section) section.scrollIntoView({ behavior: "smooth" });
    //         } else {
    //             window.scrollTo({ top: 0, behavior: "smooth" });
    //         }
    //     } else {
    //         // navigate(sectionId ? `/${sectionId}` : "/");
    //           router.visit(sectionId ? `/${sectionId}` : "/");
    //     }
    // };

    // useEffect(() => {
    //     if (location.pathname === "/" && location.hash) {
    //         const section = document.querySelector(location.hash);
    //         if (section) {
    //             setTimeout(
    //                 () => section.scrollIntoView({ behavior: "smooth" }),
    //                 100
    //             );
    //         }
    //     }
    // }, [location]);

    // useEffect(() => {
    //     const handleScroll = () => setScrolled(window.scrollY > 50);
    //     window.addEventListener("scroll", handleScroll);
    //     return () => window.removeEventListener("scroll", handleScroll);
    // }, []);

    // In Inertia, we use usePage().url instead of useLocation()
    const { url } = usePage();

    const handleNavClick = (sectionId) => {
        setMenuOpen(false);

        // If we are already on the home page, just scroll
        if (url === "/") {
            if (sectionId && sectionId.startsWith("#")) {
                const section = document.querySelector(sectionId);
                if (section) section.scrollIntoView({ behavior: "smooth" });
            } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        } else {
            // If we are on another page (like /about), go home first
            // Inertia handles this with router.visit
            router.visit(sectionId ? `/${sectionId}` : "/");
        }
    };

    // Smooth scroll handler for when we arrive at Home from another page
    useEffect(() => {
        if (url === "/" && window.location.hash) {
            const section = document.querySelector(window.location.hash);
            if (section) {
                setTimeout(
                    () => section.scrollIntoView({ behavior: "smooth" }),
                    100,
                );
            }
        }
    }, [url]);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed w-full top-0 z-50 transition-all duration-300 ${
                scrolled ? "bg-white shadow-md" : "bg-transparent"
            }`}
        >
            <div className="max-w-6xl  mx-auto px-6 py-2 flex items-center justify-between">
                {/* -------- Desktop Menu -------- */}
                <nav className="hidden md:flex items-end space-x-8">
                    {[
                        { name: "Home", id: null },
                        { name: "Menu", id: "#menu" },
                        { name: "Booking", id: "#booking" },
                    ].map((item) => (
                        <button
                            key={item.name}
                            onClick={() => handleNavClick(item.id)}
                            className={`font-normal text-2xl transition-colors duration-300 hover:text-white hover:bg-cyan-800 p-3 ${
                                scrolled ? "text-cyan-600" : "text-white"
                            }`}
                        >
                            {item.name}
                        </button>
                    ))}
                </nav>

                {/* -------- Center Logo -------- */}
                <button
                    onClick={() => handleNavClick(null)}
                    className="flex-shrink-0"
                >
                    <img
                        src={scrolled ? colorLogo : whiteLogo}
                        alt="Logo"
                        className={`transition-all duration-300 mx-auto ${
                            scrolled ? "h-16" : "h-32"
                        }`}
                    />
                </button>

                {/* -------- Right Menu -------- */}
                <nav className="hidden md:flex items-start space-x-8">
                    {[
                        { name: "About", id: "#about" },
                        { name: "Blog", id: "#blog" },
                        { name: "Contact", id: "#contact" },
                    ].map((item) => (
                        <button
                            key={item.name}
                            onClick={() => handleNavClick(item.id)}
                            className={`font-normal text-2xl transition-colors duration-300 hover:text-white hover:bg-cyan-800 p-3 ${
                                scrolled ? "text-cyan-600" : "text-white"
                            }`}
                        >
                            {item.name}
                        </button>
                    ))}
                </nav>

                {/* -------- Mobile Button -------- */}
                <button
                    className={`md:hidden focus:outline-none ${
                        scrolled ? "text-gray-800" : "text-white"
                    }`}
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* -------- Mobile Menu -------- */}
            {menuOpen && (
                <div className="md:hidden bg-white shadow-lg transition-all duration-300 text-gray-800">
                    <nav className="flex flex-col space-y-3 py-4 px-6">
                        {[
                            { name: "Home", id: null },
                            { name: "About", id: "#about" },
                            { name: "Menu", id: "#menu" },
                            { name: "Contact", id: "#contact" },
                        ].map((item) => (
                            <button
                                key={item.name}
                                onClick={() => handleNavClick(item.id)}
                                className="text-left text-lg font-semibold py-2 border-b border-gray-200 hover:text-red-600"
                            >
                                {item.name}
                            </button>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
}
