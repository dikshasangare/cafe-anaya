import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ChatBubble from "../components/Chatbot/ChatBubble";
import TranslateOverlay from "../components/Language/TranslateOverlay";
import { useTranslation } from "../context/TranslationContext";
import PageTranslator from "../i18n/PageTranslator";

export default function MainLayout({ children }) {
    const { locale } = useTranslation();

    useEffect(() => {
        if (locale === "en") return;

        const translatePage = async () => {
            const elements = document.querySelectorAll(
                "h1, h2, h3, p, span, button, a, li",
            );

            for (const el of elements) {
                const text = el.innerText?.trim();

                if (!text || text.length < 2) continue;

                if (el.dataset.translated === locale) continue;

                try {
                    const res = await fetch("/api/translate-page", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "X-CSRF-TOKEN": document
                                .querySelector('meta[name="csrf-token"]')
                                ?.getAttribute("content"),
                        },
                        body: JSON.stringify({
                            text,
                            locale,
                        }),
                    });

                    const data = await res.json();

                    if (data.translated) {
                        el.innerText = data.translated;
                        el.dataset.translated = locale;
                    }
                } catch (e) {
                    console.error(e);
                }
            }
        };

        // 🔥 CRITICAL FIX: wait until DOM is fully ready after reload
        const waitForDOM = setTimeout(() => {
            requestAnimationFrame(() => {
                translatePage();
            });
        }, 800);

        return () => clearTimeout(waitForDOM);
    }, [locale]);

    return (
        <>
            <Header />

            <main>{children}</main>

            <Footer />
            {/* for language translation */}
            <PageTranslator />
            <TranslateOverlay />

            <ChatBubble />
        </>
    );
}
