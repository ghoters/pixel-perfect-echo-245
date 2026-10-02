import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Lightbulb, Store } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/sklep")({
  head: () => ({
    meta: [
      { title: "Sklep w przygotowaniu | prezent3d.com" },
      { name: "description", content: "Nasz sklep pojawi się już wkrótce – znajdziesz w nim gotowe modele i produkty do druku 3D. Już teraz możesz zamówić personalizowaną figurkę 3D." },
      { property: "og:title", content: "Sklep w przygotowaniu | prezent3d.com" },
      { property: "og:description", content: "Wkrótce gotowe modele i produkty do druku 3D. Już teraz zamów personalizowaną figurkę 3D na podstawie zdjęcia." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SklepPage,
});

function SklepPage() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-clip bg-background">
      <SiteHeader active="sklep" />

      <div className="flex flex-1 items-center justify-center">
        <section className="section-shell flex flex-col items-center py-16 text-center sm:py-20">
          <div className="flex size-[72px] items-center justify-center rounded-full bg-brand-soft">
            <Store className="size-8 text-primary" aria-hidden="true" />
          </div>

          <p className="mt-6 text-[11px] font-extrabold uppercase text-primary">Sklep w przygotowaniu</p>
          <h1 className="mt-3 max-w-[640px] text-[36px] font-extrabold leading-[1.08] text-foreground sm:text-[44px] lg:text-[52px]">
            Nasz sklep pojawi się już wkrótce
          </h1>
          <p className="mt-5 max-w-[520px] text-[15px] leading-7 text-muted-foreground">
            Wkrótce będziesz mógl znaleźć tutaj nasze gotowe modele i produkty do druku 3D.
          </p>
          <p className="mt-4 max-w-[520px] text-[15px] leading-7 text-muted-foreground">
            Już teraz możesz jednak zamówić swoją własną, personalizowaną figurkę 3D stworzoną na podstawie zdjęcia.
          </p>

          <Button variant="hero" size="lg" className="mt-8" asChild>
            <Link to="/oferta">Zamów personalizowaną figurkę <ArrowRight /></Link>
          </Button>

          <div className="mt-10 border-t border-border/60 pt-8">
            <p className="flex items-center justify-center gap-2 text-[13px] font-semibold text-foreground">
              <Lightbulb className="size-4 text-primary" aria-hidden="true" />
              Masz pomysł na inny model?
            </p>
            <p className="mt-2 max-w-[420px] text-[12px] leading-5 text-muted-foreground">
              Napisz do nas – chętnie przygotujemy indywidualny projekt.
            </p>
          </div>
        </section>
      </div>

      <SiteFooter />
    </main>
  );
}
