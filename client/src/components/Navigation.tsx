import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
      setActiveSection(id);
    }
  };

  // Simple scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "services", "website-samples", "copy-samples", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
          setActiveSection(section);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "services", label: "Services" },
    { id: "website-samples", label: "Websites" },
    { id: "copy-samples", label: "Copy Samples" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => scrollTo("home")}
          className="text-2xl font-bold font-display cursor-pointer text-[#000120] hover:text-[#a2a4ff] transition-colors"
        >
          A.S. Copy
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`text-sm font-medium transition-colors hover:text-[#a2a4ff] ${
                activeSection === link.id ? "text-[#a2a4ff]" : "text-[#000120]"
              }`}
            >
              {link.label}
            </button>
          ))}
          <Button 
            onClick={() => scrollTo("contact")}
            className="bg-[#a2a4ff] text-[#000120] hover:bg-[#8e90ff] hover:-translate-y-0.5 transition-all rounded-full px-6 font-semibold"
          >
            Contact Me
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-[#000120]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 shadow-xl py-8 px-6 flex flex-col space-y-4 animate-in slide-in-from-top-5">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`text-left text-lg font-medium py-2 ${
                activeSection === link.id ? "text-[#a2a4ff]" : "text-[#000120]"
              }`}
            >
              {link.label}
            </button>
          ))}
          <Button 
            onClick={() => scrollTo("contact")}
            className="w-full bg-[#a2a4ff] text-[#000120] hover:bg-[#8e90ff] mt-4 rounded-full"
          >
            Contact Me
          </Button>
        </div>
      )}
    </nav>
  );
}
