import { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';

const SUGGESTIONS = [
    'Vegetarian dishes?',
    'Chef specials?',
    'Spicy options?',
    'Best for 2 people?',
];

export default function ChatPanel({ onClose }) {
    const [messages, setMessages]   = useState([
        {
            role: 'assistant',
            content: "Namaste! Welcome to Café Anaya 🍃 I'm your menu guide. Ask me about our dishes, ingredients, or let me suggest something special for you!",
        },
    ]);
    const [input, setInput]         = useState('');
    const [loading, setLoading]     = useState(false);
    const [sessionId, setSessionId] = useState(null);
    const bottomRef                 = useRef(null);
    const inputRef                  = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, loading]);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const send = async (text) => {
        const msg = (text || input).trim();
        if (!msg || loading) return;

        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: msg }]);
        setLoading(true);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: msg, session_id: sessionId }),
            });
            const data = await res.json();
            setSessionId(data.session_id);
            setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
        } catch {
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: 'Sorry, I seem to have stepped away from the kitchen. Please try again in a moment.',
            }]);
        } finally {
            setLoading(false);
        }
    };

    const handleKey = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            send();
        }
    };

    return (
        <div
            className="flex flex-col rounded-2xl overflow-hidden"
            style={{
                width: '340px',
                height: '500px',
                boxShadow: '0 20px 60px rgba(15, 164, 175, 0.2), 0 4px 20px rgba(0,0,0,0.12)',
                border: '1px solid #99f6e4',
                background: '#ffffff',
            }}
        >
            {/* ── Header ── */}
            <div
                className="flex-shrink-0 px-4 py-3 flex items-center justify-between"
                style={{ background: 'linear-gradient(135deg, #0fa4af 0%, #0e7490 100%)' }}
            >
                <div className="flex items-center gap-3">
                    {/* Cafe logo placeholder */}
                    <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-lg flex-shrink-0"
                        style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)' }}
                    >
                        ☕
                    </div>
                    <div>
                        <p className="text-white font-semibold text-sm leading-tight"
                            style={{ fontFamily: 'Georgia, serif', letterSpacing: '0.01em' }}>
                            Café Anaya
                        </p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse inline-block" />
                            <span className="text-teal-100 text-xs">Menu Assistant</span>
                        </div>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="w-7 h-7 rounded-full flex items-center justify-center
                        text-white/70 hover:text-white hover:bg-white/20 transition-all text-base"
                    aria-label="Close chat"
                >
                    ✕
                </button>
            </div>

            {/* ── Messages ── */}
            <div
                className="flex-1 overflow-y-auto px-3 py-4 space-y-1"
                style={{ background: '#f8fffe' }}
            >
                {messages.map((msg, i) => (
                    <ChatMessage key={i} message={msg} />
                ))}

                {/* Typing indicator */}
                {loading && (
                    <div className="flex justify-start items-end gap-2 mb-3">
                        <div
                            className="w-7 h-7 rounded-full flex-shrink-0 flex items-center
                                justify-center text-white text-xs mb-0.5"
                            style={{ background: 'linear-gradient(135deg, #0fa4af, #2dd4bf)' }}
                        >
                            ☕
                        </div>
                        <div
                            className="px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-1"
                            style={{ background: '#f0fdfc', border: '1px solid #99f6e4' }}
                        >
                            {[0, 150, 300].map(delay => (
                                <span
                                    key={delay}
                                    className="w-2 h-2 rounded-full animate-bounce inline-block"
                                    style={{
                                        background: '#0fa4af',
                                        animationDelay: `${delay}ms`,
                                        animationDuration: '0.9s',
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                )}
                <div ref={bottomRef} />
            </div>

            {/* ── Suggested questions ── */}
            <div
                className="flex-shrink-0 px-3 py-2 flex gap-1.5 flex-wrap"
                style={{ background: '#f8fffe', borderTop: '1px solid #e0fdf8' }}
            >
                {SUGGESTIONS.map(q => (
                    <button
                        key={q}
                        onClick={() => send(q)}
                        disabled={loading}
                        className="text-xs px-2.5 py-1 rounded-full transition-all
                            disabled:opacity-40 hover:scale-105"
                        style={{
                            background: '#e0fdf8',
                            color: '#0f766e',
                            border: '1px solid #99f6e4',
                            fontFamily: 'Georgia, serif',
                        }}
                    >
                        {q}
                    </button>
                ))}
            </div>

            {/* ── Input ── */}
            <div
                className="flex-shrink-0 flex items-center gap-2 px-3 py-3"
                style={{ borderTop: '1px solid #e0fdf8', background: '#ffffff' }}
            >
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKey}
                    placeholder="Ask about our menu..."
                    className="flex-1 text-sm rounded-full px-4 py-2 focus:outline-none transition-all"
                    style={{
                        background: '#f0fdfc',
                        border: '1.5px solid #99f6e4',
                        color: '#134e4a',
                        fontSize: '13px',
                    }}
                    onFocus={e => e.target.style.borderColor = '#0fa4af'}
                    onBlur={e => e.target.style.borderColor = '#99f6e4'}
                />
                <button
                    onClick={() => send()}
                    disabled={loading || !input.trim()}
                    className="w-9 h-9 rounded-full flex items-center justify-center
                        flex-shrink-0 transition-all hover:scale-105 disabled:opacity-40"
                    style={{ background: 'linear-gradient(135deg, #0fa4af, #0e7490)', color: '#fff' }}
                    aria-label="Send message"
                >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13"/>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                </button>
            </div>
        </div>
    );
}