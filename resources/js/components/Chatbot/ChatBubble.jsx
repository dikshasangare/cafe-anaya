import { useState, useEffect } from 'react';
import ChatPanel from './ChatPanel';

export default function ChatBubble() {
    const [open, setOpen]         = useState(false);
    const [pulse, setPulse]       = useState(true);
    const [tooltip, setTooltip]   = useState(false);

    // Stop pulsing after first open
    useEffect(() => {
        if (open) setPulse(false);
    }, [open]);

    // Show tooltip after 3 seconds on first load
    useEffect(() => {
        const t = setTimeout(() => setTooltip(true), 3000);
        const t2 = setTimeout(() => setTooltip(false), 7000);
        return () => { clearTimeout(t); clearTimeout(t2); };
    }, []);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

            {/* Chat panel */}
            {open && <ChatPanel onClose={() => setOpen(false)} />}

            {/* Tooltip */}
            {!open && tooltip && (
                <div
                    className="px-3 py-2 rounded-xl text-sm text-white animate-bounce"
                    style={{
                        background: 'linear-gradient(135deg, #0fa4af, #0e7490)',
                        boxShadow: '0 4px 16px rgba(15,164,175,0.3)',
                        fontFamily: 'Georgia, serif',
                        fontSize: '12px',
                        whiteSpace: 'nowrap',
                    }}
                >
                    Ask me about our menu! 🍛
                    <div
                        style={{
                            position: 'absolute',
                            bottom: '-6px',
                            right: '22px',
                            width: 0,
                            height: 0,
                            borderLeft: '6px solid transparent',
                            borderRight: '6px solid transparent',
                            borderTop: '6px solid #0e7490',
                        }}
                    />
                </div>
            )}

            {/* Floating button */}
            <div className="relative">
                {/* Pulse ring */}
                {pulse && !open && (
                    <span
                        className="absolute inset-0 rounded-full animate-ping"
                        style={{ background: 'rgba(15,164,175,0.3)' }}
                    />
                )}
                <button
                    onClick={() => setOpen(prev => !prev)}
                    className="relative w-14 h-14 rounded-full flex items-center justify-center
                        text-white transition-all hover:scale-110 active:scale-95"
                    style={{
                        background: open
                            ? 'linear-gradient(135deg, #0e7490, #0fa4af)'
                            : 'linear-gradient(135deg, #0fa4af, #0e7490)',
                        boxShadow: '0 8px 32px rgba(15,164,175,0.45), 0 2px 8px rgba(0,0,0,0.15)',
                    }}
                    aria-label={open ? 'Close chat' : 'Open chat'}
                >
                    <span
                        className="transition-all duration-200"
                        style={{ fontSize: open ? '18px' : '22px' }}
                    >
                        {open ? '✕' : '☕'}
                    </span>
                </button>
            </div>
        </div>
    );
}