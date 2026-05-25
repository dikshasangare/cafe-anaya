import { createContext, useContext, useEffect, useState } from "react";

const TranslationContext = createContext();

export function TranslationProvider({ children }) {
    // Load immediately from localStorage
    const [locale, setLocaleState] = useState(() => {
        return localStorage.getItem("selected-language") || "en";
    });

    // Custom setter
    const setLocale = (lang) => {
        localStorage.setItem("selected-language", lang);

        setLocaleState(lang);
    };

    // Sync on refresh
    useEffect(() => {
        const saved = localStorage.getItem("selected-language");

        if (saved) {
            setLocaleState(saved);
        }
    }, []);

    return (
        <TranslationContext.Provider
            value={{
                locale,
                setLocale,
            }}
        >
            {children}
        </TranslationContext.Provider>
    );
}

export const useTranslation = () => useContext(TranslationContext);
