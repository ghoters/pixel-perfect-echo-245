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
        <section className="section-shell flex flex-col items-center py-14 text-center sm:py-16">
          <div className="flex size-[64px] items-center justify-center rounded-full bg-brand-soft">
            <Store className="size-7 text-primary" aria-hidden="true" />
          </div>

          <p className="mt-5 text-[12px] font-extrabold uppercase text-primary">Sklep w przygotowaniu</p>
          <h1 className="mt-3 max-w-[580px] text-[32px] font-extrabold leading-[1.1] text-foreground sm:text-[38px] lg:text-[44px]">
            Nasz sklep pojawi się już wkrótce
          </h1>
          <p className="mt-5 max-w-[540px] text-[15px] leading-7 text-muted-foreground">
            Wkrótce będziesz mógl znaleźć tutaj nasze gotowe modele.
          </p>
          <p className="mt-4 max-w-[540px] text-[15px] leading-7 text-muted-foreground">
            Już teraz możesz jednak zamówić swoją własną, personalizowaną figurkę 3D stworzoną na podstawie zdjęcia.
          </p>

          <Button variant="hero" size="default" className="mt-7" asChild>
            <Link to="/oferta">Zamów personalizowaną figurkę <ArrowRight /></Link>
          </Button>

          <Link
            to="/kontakt"
            className="group mt-8 block border-t border-border/60 pt-6 transition-colors hover:text-primary focus-visible:text-primary focus-visible:outline-none"
          >
            <p className="flex items-center justify-center gap-2 text-[13px] font-semibold text-inherit">
              <Lightbulb className="size-4 text-primary" aria-hidden="true" />
              <span className="underline-offset-4 group-hover:underline">Masz pomysł na inny model?</span>
            </p>
            <p className="mt-2 max-w-[420px] text-[12px] leading-5 text-inherit">
              <span className="underline-offset-4 group-hover:underline">
                Napisz do nas – chętnie przygotujemy indywidualny projekt.
              </span>
            </p>
          </Link>
        </section>
      </div>

      <SiteFooter />
    </main>
  );
}
