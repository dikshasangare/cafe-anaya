// resources/js/i18n/PageTranslator.jsx
import { useEffect, useRef, useState } from "react";
import { usePage } from "@inertiajs/react";
import { translateBatch } from "./translator";
import { useTranslation } from "../context/TranslationContext";

// Tags to skip
const SKIP_TAGS = new Set([
    "SCRIPT",
    "STYLE",
    "CODE",
    "PRE",
    "INPUT",
    "TEXTAREA",
    "SELECT",
    "OPTION",
    "META",
    // "LINK",
    "NOSCRIPT",
    "SVG",
    "PATH",
]);

const SKIP_CLASSES = ["no-translate", "notranslate"];

// Store originals so we can restore English
const originals = new Map();

function collectTextNodes(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
            const p = node.parentElement;
            if (!p) return NodeFilter.FILTER_REJECT;
            if (SKIP_TAGS.has(p.tagName)) return NodeFilter.FILTER_REJECT;
            if (SKIP_CLASSES.some((c) => p.classList?.contains(c)))
                return NodeFilter.FILTER_REJECT;
            if (!node.textContent?.trim()) return NodeFilter.FILTER_SKIP;
            return NodeFilter.FILTER_ACCEPT;
        },
    });
    const nodes = [];
    let n;
    while ((n = walker.nextNode())) nodes.push(n);
    return nodes;
}

export default function PageTranslator() {
    const { locale } = useTranslation();
    const prevLocale = useRef("en");
    const [progress, setProgress] = useState(0);
    const [total, setTotal] = useState(0);
    const [active, setActive] = useState(false);

    useEffect(() => {
        if (locale === prevLocale.current) return;
        prevLocale.current = locale;

        const root = document.getElementById("app") ?? document.body;

        // Restore originals first
        originals.forEach((original, node) => {
            if (node.isConnected) node.textContent = original;
        });

        if (locale === "en") {
            originals.clear();
            setActive(false);
            setProgress(0);
            setTotal(0);
            return;
        }

        const nodes = collectTextNodes(root);
        if (!nodes.length) return;

        // Save originals
        nodes.forEach((node) => {
            if (!originals.has(node)) {
                originals.set(node, node.textContent);
            }
        });

        const strings = nodes.map((n) => n.textContent.trim());
        setTotal(nodes.length);
        setProgress(0);
        setActive(true);

        translateBatch(strings, locale, (done) => {
            setProgress(done);
        }).then((results) => {
            nodes.forEach((node) => {
                if (!node.isConnected) return;
                const original = originals.get(node)?.trim();
                if (original && results[original]) {
                    node.textContent = node.textContent.replace(
                        original,
                        results[original],
                    );
                }
            });
            setActive(false);
        });
    }, [locale]);

    if (!active) return null;

    const pct = total > 0 ? Math.round((progress / total) * 100) : 0;

    return (
        <div
            style={{
                position: "fixed",
                bottom: "88px",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 9999,
                background: "rgba(6, 43, 47, 0.92)",
                backdropFilter: "blur(12px)",
                color: "#fff",
                padding: "10px 20px",
                borderRadius: "99px",
                fontSize: "12px",
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                gap: "10px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                pointerEvents: "none",
                minWidth: "220px",
            }}
        >
            <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                style={{ animation: "spin 1s linear infinite", flexShrink: 0 }}
            >
                <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="3"
                />
                <path
                    d="M12 2a10 10 0 0 1 10 10"
                    stroke="#0fa4af"
                    strokeWidth="3"
                    strokeLinecap="round"
                />
                <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
            </svg>
            <div style={{ flex: 1 }}>
                <div style={{ marginBottom: "4px" }}>Translating... {pct}%</div>
                <div
                    style={{
                        height: "3px",
                        background: "rgba(255,255,255,0.2)",
                        borderRadius: "99px",
                        overflow: "hidden",
                    }}
                >
                    <div
                        style={{
                            height: "100%",
                            width: `${pct}%`,
                            background: "#0fa4af",
                            borderRadius: "99px",
                            transition: "width 0.3s ease",
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
