import { Outlet } from "react-router-dom";
import Navbar from "../components/Ui/Navbar";

export default function HomeLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fff5e2]">
      <Navbar />

      <main className="flex-1 pt-4">
        <Outlet />
      </main>
    </div>
  );
}