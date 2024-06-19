import Footer from "../components/Footer";
import Desktop from "../components/Desktop";
import Icon from "../components/Icon";

export default function Home() {
    return (
        <main className="bg-beige-200 h-screen w-full relative text-coal-300 overflow-hidden">
            <Desktop> {/* client component */}
                <Footer /> {/* server component */}
            </Desktop>
        </main>
    );
}
