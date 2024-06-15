import Footer from "../components/Footer";
import Icon from "../components/Icon";
import Window from "../components/Window";

export default function Home() {
  return (
    <main className="bg-beige-200 h-screen w-full relative text-coal-300 overflow-hidden">
      <div className="p-4">
        <Icon src="/images/folder.svg" alt="folder icon" />
        <Window />
      </div>
      <Footer />
    </main>
  );
}
