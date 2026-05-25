import { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
import { Link, router, usePage } from "@inertiajs/react";
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
            <div className="max-w-full  mx-auto px-6 py-2 flex items-center justify-between">
                {/* -------- Desktop Menu -------- */}
                <nav className="hidden md:flex items-end space-x-8 capitalize">
                    <button
                        onClick={() => handleNavClick(null)}
                        className={`font-normal text-2xl transition-colors duration-300 hover:text-white hover:bg-cyan-800 p-3 ${
                            scrolled ? "text-cyan-600" : "text-white"
                        }`}
                    >
                        Home
                    </button>
                    <Link
                        href={"/cafe-menus"}
                        className={`font-normal text-2xl transition-colors duration-300 hover:text-white hover:bg-cyan-800 p-3 ${
                            scrolled ? "text-cyan-600" : "text-white"
                        }`}
                    >
                        Menu
                    </Link>

                    <Link
                        href={"/reservations"}
                        className={`font-normal text-2xl transition-colors duration-300 hover:text-white hover:bg-cyan-800 p-3 ${
                            scrolled ? "text-cyan-600" : "text-white"
                        }`}
                    >
                        Reserve
                    </Link>
                    <Link
                        href={"/cafe-gallery"}
                        className={`font-normal text-2xl transition-colors duration-300 hover:text-white hover:bg-cyan-800 p-3 ${
                            scrolled ? "text-cyan-600" : "text-white"
                        }`}
                    >
                        Gallery
                    </Link>
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
                <nav className="hidden md:flex items-start space-x-8 capitalize">
                    <Link
                        href={"/our-story"}
                        className={`font-normal text-2xl transition-colors duration-300 hover:text-white hover:bg-cyan-800 p-3 ${
                            scrolled ? "text-cyan-600" : "text-white"
                        }`}
                    >
                        Our&nbsp;Story
                    </Link>

                    <Link
                        href={"/cafe-events"}
                        className={`font-normal text-2xl transition-colors duration-300 hover:text-white hover:bg-cyan-800 p-3 ${
                            scrolled ? "text-cyan-600" : "text-white"
                        }`}
                    >
                        events
                    </Link>

                    <button
                        onClick={() => handleNavClick("#about")}
                        className={`font-normal text-2xl capitalize transition-colors duration-300 hover:text-white hover:bg-cyan-800 p-3 ${
                            scrolled ? "text-cyan-600" : "text-white"
                        }`}
                    >
                        about
                    </button>

                    <button
                        onClick={() => handleNavClick("#contact")}
                        className={`font-normal text-2xl capitalize transition-colors duration-300 hover:text-white hover:bg-cyan-800 p-3 ${
                            scrolled ? "text-cyan-600" : "text-white"
                        }`}
                    >
                        contact
                    </button>
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
                <div className="md:hidden bg-white shadow-lg transition-all duration-300 text-gray-800 border-t border-cyan-100">
                    <nav className="flex flex-col space-y-2  py-2 px-6">
                        <button
                            onClick={() => handleNavClick(null)}
                            className={`transition-colors duration-300 hover:text-white hover:bg-cyan-800 text-left text-sm tracking-widest font-semibold capitalize py-2 border-b border-gray-200 ${
                                scrolled ? "text-cyan-600" : "text-white"
                            }`}
                        >
                            Home
                        </button>
                        <Link
                            href={"/cafe-menus"}
                            className={`transition-colors duration-300 hover:text-white hover:bg-cyan-800 text-left text-sm tracking-widest font-semibold capitalize py-2 border-b border-gray-200 ${
                                scrolled ? "text-cyan-600" : "text-white"
                            }`}
                        >
                            menu
                        </Link>

                        <Link
                            href={"/reservations"}
                            className={`transition-colors duration-300 hover:text-white hover:bg-cyan-800 text-left text-sm tracking-widest font-semibold capitalize py-2 border-b border-gray-200 ${
                                scrolled ? "text-cyan-600" : "text-white"
                            }`}
                        >
                            reserve
                        </Link>
                        <Link
                            href={"/cafe-gallery"}
                            className={`transition-colors duration-300 hover:text-white hover:bg-cyan-800 text-left text-sm tracking-widest font-semibold capitalize py-2 border-b border-gray-200 ${
                                scrolled ? "text-cyan-600" : "text-white"
                            }`}
                        >
                            gallery
                        </Link>
                        <Link
                            href={"/our-story"}
                            className={`transition-colors duration-300 hover:text-white hover:bg-cyan-800 text-left text-sm tracking-widest font-semibold capitalize py-2 border-b border-gray-200 ${
                                scrolled ? "text-cyan-600" : "text-white"
                            }`}
                        >
                            our&nbsp;story
                        </Link>

                        <Link
                            href={"/cafe-events"}
                            className={`transition-colors duration-300 hover:text-white hover:bg-cyan-800 text-left text-sm tracking-widest font-semibold capitalize py-2 border-b border-gray-200 ${
                                scrolled ? "text-cyan-600" : "text-white"
                            }`}
                        >
                            events
                        </Link>

                        <button
                            onClick={() => handleNavClick("#about")}
                            className={`transition-colors duration-300 hover:text-white hover:bg-cyan-800 text-left text-sm tracking-widest font-semibold capitalize py-2 border-b border-gray-200 ${
                                scrolled ? "text-cyan-600" : "text-white"
                            }`}
                        >
                            about
                        </button>

                        <button
                            onClick={() => handleNavClick("#contact")}
                            className={`transition-colors duration-300 hover:text-white hover:bg-cyan-800 text-left text-sm tracking-widest font-semibold capitalize py-2 border-b border-gray-200 ${
                                scrolled ? "text-cyan-600" : "text-white"
                            }`}
                        >
                            contact
                        </button>
                    </nav>
                </div>
            )}
        </header>
    );
}
