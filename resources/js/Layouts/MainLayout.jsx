import Header from "../components/Header";
import Footer from "../components/Footer";
import ChatBubble from "../components/Chatbot/ChatBubble";

export default function MainLayout({ children }) {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
            <ChatBubble />
        </>
    );
}
