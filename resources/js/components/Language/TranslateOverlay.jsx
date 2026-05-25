import { useEffect, useMemo, useRef, useState } from "react";
import { Globe, Search, X, Check } from "lucide-react";
import { useTranslation } from "../../context/TranslationContext";
import { LANGS } from "../../i18n/languages";

const POPULAR = [
    "en",
    "hi",
    "ta",
    "te",
    "mr",
    "bn",
    "gu",
    "kn",
    "ml",
    "pa",
    "ur",
    "ar",
    "zh",
    "fr",
    "de",
    "es",
    "ja",
    "ko",
    "ru",
    "pt",
];

export default function TranslateOverlay() {
    const { locale, setLocale } = useTranslation();

    const [open, setOpen] = useState(false);

    const [search, setSearch] = useState("");

    const [selected, setSelected] = useState(locale || "en");

    const [loading, setLoading] = useState(false);

    const searchRef = useRef(null);

    const current = LANGS.find((l) => l.code === locale) || LANGS[0];

    useEffect(() => {
        if (open) {
            setSelected(locale || "en");
            setSearch("");

            setTimeout(() => {
                searchRef.current?.focus();
            }, 100);
        }
    }, [open, locale]);

    useEffect(() => {
        const h = (e) => {
            if (e.key === "Escape") {
                setOpen(false);
            }
        };

        window.addEventListener("keydown", h);

        return () => window.removeEventListener("keydown", h);
    }, []);

    const filtered = useMemo(() => {
        if (!search.trim()) return LANGS;

        return LANGS.filter(
            (l) =>
                l.label.toLowerCase().includes(search.toLowerCase()) ||
                l.native.toLowerCase().includes(search.toLowerCase()) ||
                l.country.toLowerCase().includes(search.toLowerCase()) ||
                l.code.toLowerCase().includes(search.toLowerCase()),
        );
    }, [search]);

    const popular = filtered.filter((l) => POPULAR.includes(l.code));

    const others = filtered.filter((l) => !POPULAR.includes(l.code));

    const applyLanguage = async () => {
        if (selected === locale) {
            setOpen(false);
            return;
        }

        setLoading(true);

        try {
            setLocale(selected);

            localStorage.setItem("selected-language", selected);
console.log("Language set to", selected);
            setOpen(false);
            window.location.reload();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Floating Bubble */}
            <div className="fixed bottom-24 right-6 z-[49] flex flex-col items-end gap-2">
                {!open && (
                    <div className="rounded-full bg-[#062b2fd9] px-3 py-1 text-[11px] font-medium text-white backdrop-blur-xl">
                        {current?.label || "English"}
                    </div>
                )}

                <button
                    onClick={() => setOpen((o) => !o)}
                    disabled={loading}
                    className="relative flex h-14 w-14 items-center justify-center rounded-full text-white shadow-[0_8px_32px_rgba(15,164,175,0.45)] transition-all duration-200 hover:scale-110 active:scale-95"
                    style={{
                        background: "linear-gradient(135deg,#0fa4af,#0e7490)",
                    }}
                >
                    {loading ? (
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    ) : (
                        <Globe size={24} />
                    )}

                    <div className="absolute -right-1 -top-1 rounded-full border border-cyan-400 bg-white px-1.5 text-[9px] font-bold uppercase text-cyan-700">
                        {(locale || "en").toUpperCase().slice(0, 2)}
                    </div>
                </button>
            </div>

            {/* Modal */}
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 z-[50] flex items-end justify-center bg-[#062b2f80] p-4 backdrop-blur-sm"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="flex max-h-[80vh] w-full max-w-xl flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_-4px_40px_rgba(6,43,47,0.18)]"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-cyan-50 px-5 py-5">
                            <div>
                                <h3 className="text-[17px] font-semibold text-[#062b2f]">
                                    Choose Language
                                </h3>

                                <p className="mt-0.5 text-xs text-[#6b9ea4]">
                                    {LANGS.length} languages available
                                </p>
                            </div>

                            <button
                                onClick={() => setOpen(false)}
                                className="flex h-8 w-8 items-center justify-center rounded-full border border-cyan-50 bg-cyan-50 text-cyan-700"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* Search */}
                        <div className="border-b border-cyan-50 p-4">
                            <div className="relative">
                                <Search
                                    size={16}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b9ea4]"
                                />

                                <input
                                    ref={searchRef}
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search language..."
                                    className="w-full rounded-xl border border-cyan-200 bg-cyan-50 py-2.5 pl-10 pr-4 text-sm text-[#062b2f] outline-none transition-all focus:border-cyan-500"
                                />
                            </div>
                        </div>

                        {/* Languages */}
                        <div className="flex-1 overflow-y-auto p-4">
                            {!search && popular.length > 0 && (
                                <>
                                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#6b9ea4]">
                                        Popular
                                    </p>

                                    <div className="mb-5 grid grid-cols-2 gap-2">
                                        {popular.map((lang) => (
                                            <LangItem
                                                key={lang.code}
                                                lang={lang}
                                                selected={selected}
                                                onSelect={setSelected}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}

                            <p className="mb-2 text-[12px] font-semibold capitalize border-t border-cyan-200 pt-7 tracking-[0.12em] text-cyan-600">
                                All Languages
                            </p>

                            <div className="grid grid-cols-2 gap-2">
                                {(search ? filtered : others).map((lang) => (
                                    <LangItem
                                        key={lang.code}
                                        lang={lang}
                                        selected={selected}
                                        onSelect={setSelected}
                                    />
                                ))}
                            </div>

                            {filtered.length === 0 && (
                                <p className="py-8 text-center text-sm text-[#6b9ea4]">
                                    No language found for "{search}"
                                </p>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="border-t border-cyan-50 bg-white p-4">
                            {selected !== locale && (
                                <p className="mb-3 text-center text-xs font-medium text-cyan-700">
                                    Translate to:{" "}
                                    {
                                        LANGS.find((l) => l.code === selected)
                                            ?.label
                                    }
                                </p>
                            )}

                            <button
                                onClick={applyLanguage}
                                disabled={loading}
                                className={`flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-sm font-semibold transition-all ${
                                    selected === locale
                                        ? "cursor-default bg-cyan-50 text-[#6b9ea4]"
                                        : "bg-gradient-to-r from-cyan-500 to-cyan-700 text-white"
                                }`}
                            >
                                <Globe size={17} />

                                {selected === locale
                                    ? "Currently Selected"
                                    : `Apply ${
                                          LANGS.find((l) => l.code === selected)
                                              ?.label
                                      }`}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

function LangItem({ lang, selected, onSelect }) {
    const isSelected = selected === lang.code;

    return (
        <button
            onClick={() => onSelect(lang.code)}
            className={`flex items-center justify-between rounded-xl border border-cyan-200 px-3 py-2.5 text-left transition-all ${
                isSelected
                    ? "border-cyan-500 bg-cyan-50"
                    : "border-cyan-50 bg-[#fafffe]"
            }`}
        >
            <div>
                <div className="text-2xl">{lang.flag}</div>
                <p
                    className={`text-[13px] ${
                        isSelected
                            ? "font-semibold text-cyan-700"
                            : "text-[#062b2f]"
                    }`}
                >
                    {lang.label} ({lang.code})
                </p>

                <p className="text-[11px] text-[#6b9ea4]">
                    {lang.native} • {lang.country}
                </p>
            </div>

            {isSelected && <Check size={16} className="text-cyan-500" />}
        </button>
    );
}
