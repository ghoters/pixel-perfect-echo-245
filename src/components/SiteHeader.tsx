import { Link } from "@tanstack/react-router";
import { ArrowRight, Mail, Menu, Search, ShieldCheck, ShoppingCart, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoAsset from "@/assets/logo.png.asset.json";

const navLinkHover = "transition-colors duration-200 hover:text-primary/70 focus-visible:text-primary/70 focus-visible:outline-none";

export function SiteHeader({ active = "", variant = "full" }: { active?: "home" | "offer" | "faq" | "kontakt" | ""; variant?: "full" | "checkout" }) {
  if (variant === "checkout") {
    return (
      <header className="sticky top-0 z-50 border-b border-border/60 bg-card">
        <div className="section-shell flex h-[68px] items-center justify-between gap-5">
          <Link to="/" className="flex shrink-0 items-center" aria-label="prezent3d.com — strona główna">
            <img src={logoAsset.url} alt="prezent3d.com" className="h-9 w-auto" />
          </Link>
          <div className="flex items-center gap-5 text-[12px] font-semibold text-muted-foreground">
            <span className="hidden items-center gap-1.5 sm:flex"><ShieldCheck className="size-4 text-primary" aria-hidden="true" /> Bezpieczne zakupy</span>
            <a href="mailto:kontakt@prezent3d.com" className={`flex items-center gap-1.5 ${navLinkHover}`}><Mail className="size-4" aria-hidden="true" /> Potrzebujesz pomocy?</a>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-card">
      <div className="section-shell grid h-[68px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-5">
        <Link to="/" className="flex shrink-0 items-center" aria-label="prezent3d.com — strona główna">
          <img src={logoAsset.url} alt="prezent3d.com" className="h-9 w-auto" />
        </Link>
        <nav className="hidden items-center justify-center gap-6 text-[12px] font-semibold text-foreground lg:flex" aria-label="Główna nawigacja">
          <Link to="/" className={active === "home" ? "border-b-2 border-primary py-6 text-primary" : navLinkHover}>Strona główna</Link>
          <Link to="/oferta" className={active === "offer" ? "border-b-2 border-primary py-6 text-primary" : navLinkHover}>Stwórz swoją figurkę⌄</Link>
          <Link to="/" hash="realizacje" className={navLinkHover}>Sklep</Link>
          <Link to="/kontakt" className={active === "kontakt" ? "border-b-2 border-primary py-6 text-primary" : navLinkHover}>Kontakt</Link>
          <Link to="/faq" className={active === "faq" ? "border-b-2 border-primary py-6 text-primary" : navLinkHover}>FAQ</Link>
        </nav>
        <div className="hidden items-center gap-4 lg:flex">
          <Search className="size-4" aria-hidden="true" />
          <UserRound className="size-4" aria-hidden="true" />
          <ShoppingCart className="size-4" aria-hidden="true" />
          <Button variant="hero" size="default" asChild><Link to="/oferta">Stwórz swoją figurkę <ArrowRight /></Link></Button>
        </div>
        <Menu className="size-6 lg:hidden" aria-label="Otwórz menu" />
      </div>
    </header>
  );
}