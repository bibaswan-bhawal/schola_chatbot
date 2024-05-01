import Chat from "@/components/chat";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <main className="flex flex-col h-screen">
      <nav>
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <h1 className="font-bold">Schola Assistant</h1>
            <ThemeToggle />
          </div>
        </div>
      </nav>
      <div className="h-full">
        <div className="flex flex-1 py-4 h-full">
          <div className="w-[90vw] md:w-[50vw] h-full mx-auto">
            <Chat />
          </div>
        </div>
      </div>
    </main>
  );
}
