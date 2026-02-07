import Sidebar from "@/components/workflow/Sidebar";
import Canvas from "@/components/workflow/Canvas";
import Header from "@/components/workflow/Header";

export default function Home() {
  return (
    <main className="flex flex-col h-screen w-screen bg-white overflow-hidden">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 relative bg-slate-50">
          <Canvas />
        </div>
      </div>
    </main>
  );
}