import Desktop from "../components/Desktop";
import PdfContent from "../components/Windows/PdfContent";

export default function Home() {
    return (
        <main className="bg-beige-200 h-screen w-full relative text-coal-300 overflow-hidden">
            <Desktop>
                <PdfContent />
            </Desktop>
        </main>
    );
}
