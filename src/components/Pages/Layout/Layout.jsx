import { Outlet } from "react-router-dom";
import NavBar from "../../component/Navbar/Navbar.jsx";
import Footer from "../../component/Footer/Footer.jsx";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar at the very top */}
      <header className="sticky top-0 z-50 p-8">
        <NavBar />
      </header>

      {/* Main content area that grows to push footer down */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 py-6">
        <Outlet />
      </main>

      {/* Footer at the very bottom */}
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
}