export default function ChatMessage({ message }) {
    const isUser = message.role === "user";

    return (
        <div
            className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3 items-end gap-2`}
        >
            {/* AI Avatar */}
            {!isUser && (
                <div
                    className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center
                    text-white text-xs font-bold mb-0.5"
                    style={{
                        background: "linear-gradient(135deg, #0fa4af, #2dd4bf)",
                    }}
                >
                    ☕
                </div>
            )}

            {/* Bubble */}
            <div
                className={`max-w-[78%] px-4 py-2.5 text-sm leading-relaxed ${
                    isUser
                        ? "text-white rounded-2xl rounded-br-sm"
                        : "rounded-2xl rounded-bl-sm"
                }`}
                style={
                    isUser
                        ? {
                              background:
                                  "linear-gradient(135deg, #0fa4af, #0e7490)",
                          }
                        : {
                              background: "#f0fdfc",
                              color: "#134e4a",
                              border: "1px solid #99f6e4",
                          }
                }
            >
                {message.content}
            </div>

            {/* User Avatar */}
            {isUser && (
                <div
                    className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center
                    text-white text-xs font-bold mb-0.5"
                    style={{ background: "#0e7490" }}
                >
                    U
                </div>
            )}
        </div>
    );
}
