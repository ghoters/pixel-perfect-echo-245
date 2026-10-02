import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight, Bell, Box, CheckCircle2, ChevronRight, Clock3, CreditCard,
  Lightbulb, LogOut, MapPin, Package, Search, ShoppingBag, Truck, UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import couple from "@/assets/account-couple.png";
import emptyBox from "@/assets/account-empty-box.png";
import giftBox from "@/assets/account-gift-box.png";
import logoAsset from "@/assets/logo.png.asset.json";

export const Route = createFileRoute("/konto")({
  head: () => ({ meta: [
    { title: "Moje konto — prezent3d.com" },
    { name: "description", content: "Panel klienta prezent3d.com: zamówienia, dane konta, adresy oraz płatności." },
    { property: "og:title", content: "Moje konto — prezent3d.com" },
    { property: "og:description", content: "Sprawdź swoje zamówienia i informacje o koncie prezent3d.com." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: AccountPage,
});

type View = "dashboard" | "orders" | "profile" | "addresses" | "payments";
const navigation = [
  { id: "dashboard", label: "Dashboard", icon: Box },
  { id: "orders", label: "Moje zamówienia", icon: Package },
  { id: "profile", label: "Dane konta", icon: UserRound },
  { id: "addresses", label: "Adresy", icon: MapPin },
  { id: "payments", label: "Płatności i faktury", icon: CreditCard },
] as const;

function AccountPage() {
  const [view, setView] = useState<View>("dashboard");
  const [query, setQuery] = useState("");
  const [noticeOpen, setNoticeOpen] = useState(false);

  return <div className="flex min-h-screen flex-col bg-background">
    <SiteHeader />
    <main className="section-shell-wide w-full flex-1 py-6 md:py-9">
      <div className="overflow-hidden rounded-md border border-border bg-card shadow-sm lg:grid lg:min-h-[680px] lg:grid-cols-[174px_minmax(0,1fr)]">
        <aside className="border-b border-border bg-card p-3 lg:border-b-0 lg:border-r lg:py-5" aria-label="Panel klienta">
          <Link to="/" className="mb-5 hidden px-2 lg:block" aria-label="Strona główna"><img src={logoAsset.url} alt="prezent3d.com" className="h-7 w-auto" /></Link>
          <nav className="flex gap-1 overflow-x-auto lg:flex-col" aria-label="Menu konta">
            {navigation.map(({ id, label, icon: Icon }) => <Button key={id} type="button" variant="ghost" onClick={() => setView(id)} aria-current={view === id ? "page" : undefined} className={`h-10 shrink-0 justify-start gap-2 px-2.5 text-[12px] font-semibold lg:w-full ${view === id ? "bg-secondary text-primary hover:bg-secondary" : "text-foreground hover:text-primary"}`}><Icon className="size-4" />{label}</Button>)}
            <Button type="button" variant="ghost" onClick={() => window.location.assign("/logowanie")} className="h-10 shrink-0 justify-start gap-2 px-2.5 text-[12px] font-semibold text-foreground lg:mt-1 lg:w-full"><LogOut className="size-4" />Wróć do logowania</Button>
          </nav>
        </aside>

        <div className="min-w-0 bg-background/50">
          <div className="flex min-h-14 items-center justify-between gap-4 border-b border-border bg-card px-4 py-2 sm:px-5">
            <label className="flex h-9 w-full max-w-[260px] items-center gap-2 rounded-md border border-border bg-background px-3 focus-within:border-primary"><Search className="size-4 shrink-0 text-primary" /><input type="search" value={query} onChange={e => { setQuery(e.target.value); if (e.target.value) setView("orders"); }} placeholder="Szukaj zamówień..." aria-label="Szukaj zamówień" className="min-w-0 w-full bg-transparent text-[11px] outline-none placeholder:text-muted-foreground" /></label>
            <div className="flex items-center gap-2 sm:gap-4"><Button type="button" variant="ghost" size="icon" aria-label="Powiadomienia" title="Powiadomienia" onClick={() => setNoticeOpen(!noticeOpen)} className="relative text-primary"><Bell className="size-5" /></Button><span className="hidden text-[11px] font-semibold sm:block">Moje konto</span><span className="grid size-8 place-items-center rounded-full bg-secondary text-primary"><UserRound className="size-4" /></span></div>
          </div>
          {noticeOpen && <div role="status" className="border-b border-border bg-secondary px-5 py-2 text-[11px] text-foreground">Nie masz nowych powiadomień.</div>}

          {view === "dashboard" ? <div className="space-y-4 p-4 sm:p-5">
            <div className="grid gap-4 lg:grid-cols-[1.8fr_.95fr]">
              <section className="relative min-h-[174px] overflow-hidden rounded-md border border-border bg-gradient-to-br from-secondary via-card to-background p-5 sm:p-6">
                <div className="relative z-10 max-w-[65%] sm:max-w-[55%]"><h1 className="text-xl font-extrabold text-foreground sm:text-2xl">Cześć!</h1><p className="mt-1 text-[12px] leading-5 text-foreground">Witaj w swoim panelu klienta. Tutaj znajdziesz wszystkie informacje o swoich zamówieniach, projektach i plikach.</p><Button asChild variant="hero" size="sm" className="mt-5 px-4"><Link to="/oferta">Stwórz swoją figurkę 3D <ArrowRight /></Link></Button></div>
                <img src={couple} alt="Figurka pary z psem" width={768} height={768} className="absolute -bottom-9 right-0 h-[205px] w-[45%] object-contain object-bottom sm:right-5 sm:h-[230px]" />
              </section>
              <section className="relative flex min-h-[174px] overflow-hidden rounded-md border border-border bg-card p-3"><div className="relative w-full overflow-hidden rounded-md bg-secondary/70 p-5"><div className="relative z-10 max-w-[66%]"><h2 className="text-[13px] font-bold">Sprawdź naszą ofertę</h2><p className="mt-2 text-[11px] leading-5">Stwórz własną, spersonalizowaną figurkę 3D z Twojego zdjęcia.</p><Link to="/oferta" className="mt-5 inline-flex items-center gap-1 text-[11px] font-semibold text-primary underline underline-offset-2">Zobacz ofertę <ArrowRight className="size-3" /></Link></div><img src={giftBox} alt="Pudełko prezentowe" width={768} height={768} className="absolute -bottom-7 -right-7 h-[180px] w-[45%] object-contain" /></div></section>
            </div>

            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {[
                { label: "Łączna liczba zamówień", icon: ShoppingBag, color: "text-primary", bg: "bg-secondary" },
                { label: "W realizacji", icon: Clock3, color: "text-chart-1", bg: "bg-promo-soft" },
                { label: "Gotowe do pobrania", icon: CheckCircle2, color: "text-chart-2", bg: "bg-accent" },
                { label: "Wysłane", icon: Truck, color: "text-primary", bg: "bg-secondary" },
              ].map(({ label, icon: Icon, color, bg }) => <Button key={label} type="button" variant="ghost" onClick={() => setView("orders")} className="h-[92px] min-w-0 justify-start gap-3 rounded-md border border-border bg-card px-3 text-left shadow-sm hover:bg-card sm:px-4"><span className={`grid size-11 shrink-0 place-items-center rounded-full ${bg} ${color}`}><Icon className="size-5" /></span><span className="min-w-0 flex-1 whitespace-normal"><span className="block text-[10px] leading-4 font-semibold">{label}</span><strong className="block text-base leading-6">0</strong><span className="block text-[10px] font-normal text-muted-foreground">Brak zamówień</span></span><ChevronRight className="size-3 shrink-0 text-primary" /></Button>)}
            </div>

            <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
              <section className="flex min-h-[295px] flex-col rounded-md border border-border bg-card p-4 shadow-sm"><div className="flex items-center justify-between gap-3"><h2 className="text-sm font-extrabold">Twoje zamówienia</h2><Button type="button" variant="link" onClick={() => setView("orders")} className="h-auto p-0 text-[11px]">Zobacz wszystkie <ArrowRight className="size-3" /></Button></div><div className="flex flex-1 flex-col items-center justify-center py-3 text-center"><img src={emptyBox} alt="Otwarte puste pudełko" loading="lazy" width={768} height={768} className="h-[110px] w-[150px] object-contain" /><h3 className="mt-1 text-[15px] font-bold">Brak zamówień</h3><p className="mt-1 text-[11px] leading-5 text-muted-foreground">Na razie nie masz jeszcze żadnych zamówień.<br />Rozpocznij od stworzenia własnej figurki 3D lub wybierz gotowy model ze sklepu.</p><Button asChild variant="hero" size="sm" className="mt-3 px-6"><Link to="/oferta">Przejdź do oferty <ArrowRight /></Link></Button></div></section>
              <section className="flex min-h-[295px] flex-col rounded-md border border-border bg-card p-4 shadow-sm"><h2 className="text-sm font-extrabold">Ostatnia aktywność</h2><div className="flex flex-1 items-center justify-center text-center text-[11px] text-muted-foreground">Brak ostatniej aktywności.</div><Link to="/oferta" className="flex items-center gap-3 rounded-md border border-border bg-secondary/50 p-3 text-[11px] leading-5 hover:border-primary/40"><span className="grid size-11 shrink-0 place-items-center rounded-full bg-secondary text-primary"><Lightbulb className="size-5" /></span><span className="flex-1">Brak zamówień w świetnym momencie,<br />aby stworzyć swoją pierwszą figurkę!</span><ChevronRight className="size-4 text-primary" /></Link></section>
            </div>

            <Link to="/oferta" className="relative flex min-h-[82px] items-center gap-3 overflow-hidden rounded-md border border-border bg-gradient-to-r from-secondary/60 via-card to-secondary/60 p-4 shadow-sm hover:border-primary/40"><img src={couple} alt="" loading="lazy" width={768} height={768} className="hidden h-[72px] w-[145px] shrink-0 object-cover object-top sm:block" /><div className="min-w-0 flex-1"><h2 className="text-sm font-extrabold">Zamów swoją wymarzoną figurkę 3D!</h2><p className="mt-1 text-[11px] leading-5">Przekształć swoje zdjęcia w wyjątkową figurkę, która będzie doskonałą pamiątką lub prezentem.</p></div><span className="hidden items-center gap-2 rounded-md bg-primary px-4 py-2 text-[11px] font-semibold text-primary-foreground sm:inline-flex">Zobacz ofertę <ArrowRight className="size-3" /></span></Link>
          </div> : <section className="min-h-[520px] p-5 sm:p-7"><h1 className="text-2xl font-extrabold">{navigation.find(item => item.id === view)?.label}</h1>{view === "orders" ? <div className="mt-8 flex flex-col items-center rounded-md border border-border bg-card px-5 py-12 text-center"><img src={emptyBox} alt="Otwarte puste pudełko" width={768} height={768} className="h-36 w-40 object-contain" /><h2 className="mt-2 text-base font-bold">Brak zamówień</h2><p className="mt-2 text-sm text-muted-foreground">{query ? `Nie znaleziono zamówień dla „${query}”.` : "Na razie nie masz jeszcze żadnych zamówień."}</p><Button asChild variant="hero" className="mt-5"><Link to="/oferta">Przejdź do oferty <ArrowRight /></Link></Button></div> : <div className="mt-8 rounded-md border border-border bg-card p-7 text-sm text-muted-foreground">{view === "profile" ? "Dane konta będą dostępne po uruchomieniu logowania." : view === "addresses" ? "Nie dodano jeszcze adresów." : "Nie masz jeszcze płatności ani faktur."}</div>}</section>}
        </div>
      </div>
    </main>
    <SiteFooter />
  </div>;
}