// resources/js/i18n/translator.js

export async function translateBatch(texts, targetLocale, onProgress) {
    const results = {};
    let done = 0;

    for (const text of texts) {
        try {
            if (!text || !text.trim()) {
                done++;
                onProgress?.(done);
                continue;
            }

            const res = await fetch("/api/translate-page", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    text,
                    locale: targetLocale,
                }),
            });

            const data = await res.json();

            results[text] = data.translated || text;
        } catch (e) {
            results[text] = text; // fallback
        }

        done++;
        onProgress?.(done);
    }

    return results;
}