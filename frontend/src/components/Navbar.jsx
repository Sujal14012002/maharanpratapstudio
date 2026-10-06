import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useStudio } from "../context/StudioContext";

const links = [
  { to: "/", label: "Home" },
  { to: "/photos", label: "Photos" },
  { to: "/videos", label: "Videos & Reels" },
  { to: "/frames", label: "Photo Frames" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { studio } = useStudio();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass = ({ isActive }) =>
    `relative text-sm tracking-wide transition-colors duration-200 py-1 ${
      isActive ? "text-gold" : "text-ivory/80 hover:text-gold"
    }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-charcoal/95 backdrop-blur border-b border-white/5 shadow-lg shadow-black/30" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 h-20 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          {studio?.logoUrl ? (
            <img src={studio.logoUrl} alt={studio.studioName} className="h-11 w-11 object-contain rounded-full border border-gold/40" />
          ) : (
            <div className="h-11 w-11 rounded-full border border-gold/40 flex items-center justify-center">
              <span className="font-display text-gold text-lg">MP</span>
            </div>
          )}
          <span className="font-display text-xl md:text-2xl text-ivory tracking-wide">
            {studio?.studioName || "Maharana Pratap Studio"}
          </span>
        </NavLink>

        <div className="hidden lg:flex items-center gap-9">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass} end={l.to === "/"}>
              {l.label}
            </NavLink>
          ))}
        </div>

        <button
          className="lg:hidden flex flex-col gap-1.5 w-8"
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className={`h-[2px] bg-gold transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-[2px] bg-gold transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`h-[2px] bg-gold transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </nav>

      {open && (
        <div className="lg:hidden bg-charcoal-light border-t border-white/5 px-6 py-6 flex flex-col gap-5">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass} end={l.to === "/"} onClick={() => setOpen(false)}>
              {l.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}
