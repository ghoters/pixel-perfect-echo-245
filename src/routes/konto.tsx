import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  ArrowRight, Bell, Box, Camera, CheckCircle2, ChevronRight, Clock3, CreditCard,
  FileText, Lightbulb, LogOut, Mail, MapPin, MoreVertical, Package, Paintbrush,
  Pencil, Phone, Plus, Search, ShieldCheck, ShoppingBag, Truck, UserRound,
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
  const [orders, setOrders] = useState<{ id: string; order_number: string; figurine_price: number; delivery_price: number; delivery_label: string; status: string; created_at: string }[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [profile, setProfile] = useState<{ display_name: string; email: string } | null>(null);
  const [settings, setSettings] = useState({ newsletter: true, orderStatus: true, savedAddresses: true });
  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return;
      const { data } = await supabase.from("orders").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
      setOrders(data ?? []);
      const { data: r } = await supabase.from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin");
      setIsAdmin(!!r?.length);
    });
  }, []);
  const [typeFilter, setTypeFilter] = useState<"Wszystkie" | "Figurki na zamówienie" | "Modele 3D">("Wszystkie");
  const [statusFilter, setStatusFilter] = useState<"Wszystkie" | "W realizacji" | "Wymaga działania" | "Zakończone">("Wszystkie");
  const statusMap: Record<string, string[]> = { "W realizacji": ["W realizacji"], "Wymaga działania": ["Wymaga działania"], "Zakończone": ["Gotowe do pobrania", "Wysłane", "Zakończone"] };
  const filtered = orders.filter(o => (!query || o.order_number.includes(query)) && (statusFilter === "Wszystkie" || statusMap[statusFilter]?.includes(o.status)));
  const countFor = (label: string) => label === "Łączna liczba zamówień" ? orders.length : orders.filter(o => o.status === label).length;
  const orderList = (list: typeof orders) => <ul className="mt-3 w-full divide-y divide-border text-left">{list.map(o => <li key={o.id} className="flex items-center justify-between gap-3 py-3"><span><strong className="block text-[13px]">Zamówienie {o.order_number}</strong><span className="text-[11px] text-muted-foreground">{new Date(o.created_at).toLocaleDateString("pl-PL")} · {o.delivery_label}</span></span><span className="text-right"><strong className="block text-[13px]">{(Number(o.figurine_price) + Number(o.delivery_price)).toFixed(2).replace(".", ",")} zł</strong><span className="text-[11px] text-primary">{o.status}</span></span></li>)}</ul>;

  return <div className="flex min-h-screen flex-col bg-background">
    <SiteHeader />
    <main className="section-shell-wide w-full flex-1 py-6 md:py-9">
      <div className="overflow-hidden rounded-md border border-border bg-card shadow-sm lg:grid lg:min-h-[680px] lg:grid-cols-[174px_minmax(0,1fr)]">
        <aside className="border-b border-border bg-card p-3 lg:border-b-0 lg:border-r lg:py-5" aria-label="Panel klienta">
          <Link to="/" className="mb-5 hidden px-2 lg:block" aria-label="Strona główna"><img src={logoAsset.url} alt="prezent3d.com" className="h-7 w-auto" /></Link>
          <nav className="flex gap-1 overflow-x-auto lg:flex-col" aria-label="Menu konta">
            {navigation.map(({ id, label, icon: Icon }) => <Button key={id} type="button" variant="ghost" onClick={() => setView(id)} aria-current={view === id ? "page" : undefined} className={`h-10 shrink-0 justify-start gap-2 px-2.5 text-[12px] font-semibold lg:w-full ${view === id ? "bg-secondary text-primary hover:bg-secondary" : "text-foreground hover:text-primary"}`}><Icon className="size-4" />{label}</Button>)}
            {isAdmin && <Button asChild variant="ghost" className="h-10 shrink-0 justify-start gap-2 px-2.5 text-[12px] font-semibold text-primary lg:w-full"><Link to="/admin"><UserRound className="size-4" />Panel admina</Link></Button>}
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
              ].map(({ label, icon: Icon, color, bg }) => <Button key={label} type="button" variant="ghost" onClick={() => setView("orders")} className="h-auto min-h-[98px] min-w-0 justify-start gap-2 rounded-md border border-border bg-card px-2 py-3 text-left shadow-sm hover:bg-card sm:gap-3 sm:px-4"><span className={`grid size-9 shrink-0 place-items-center rounded-full sm:size-11 ${bg} ${color}`}><Icon className="size-5" /></span><span className="min-w-0 flex-1 whitespace-normal"><span className="block break-words text-[10px] leading-4 font-semibold">{label}</span><strong className="block text-base leading-6">{countFor(label)}</strong><span className="block text-[10px] leading-4 font-normal text-muted-foreground">{countFor(label) ? "Zamówienia" : "Brak zamówień"}</span></span><ChevronRight className="hidden size-3 shrink-0 text-primary sm:block" /></Button>)}
            </div>

            <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
              <section className="flex min-h-[295px] flex-col rounded-md border border-border bg-card p-4 shadow-sm"><div className="flex items-center justify-between gap-3"><h2 className="text-sm font-extrabold">Twoje zamówienia</h2><Button type="button" variant="link" onClick={() => setView("orders")} className="h-auto p-0 text-[11px]">Zobacz wszystkie <ArrowRight className="size-3" /></Button></div>{orders.length ? orderList(orders.slice(0, 4)) : <div className="flex flex-1 flex-col items-center justify-center py-3 text-center"><img src={emptyBox} alt="Otwarte puste pudełko" loading="lazy" width={768} height={768} className="h-[110px] w-[150px] object-contain" /><h3 className="mt-1 text-[15px] font-bold">Brak zamówień</h3><p className="mt-1 text-[11px] leading-5 text-muted-foreground">Na razie nie masz jeszcze żadnych zamówień.<br />Rozpocznij od stworzenia własnej figurki 3D lub wybierz gotowy model ze sklepu.</p><Button asChild variant="hero" size="sm" className="mt-3 px-6"><Link to="/oferta">Przejdź do oferty <ArrowRight /></Link></Button></div>}</section>
              <section className="flex min-h-[295px] flex-col rounded-md border border-border bg-card p-4 shadow-sm"><h2 className="text-sm font-extrabold">Ostatnia aktywność</h2><div className="flex flex-1 items-center justify-center text-center text-[11px] text-muted-foreground">Brak ostatniej aktywności.</div><Link to="/oferta" className="flex items-center gap-3 rounded-md border border-border bg-secondary/50 p-3 text-[11px] leading-5 hover:border-primary/40"><span className="grid size-11 shrink-0 place-items-center rounded-full bg-secondary text-primary"><Lightbulb className="size-5" /></span><span className="flex-1">Brak zamówień w świetnym momencie,<br />aby stworzyć swoją pierwszą figurkę!</span><ChevronRight className="size-4 text-primary" /></Link></section>
            </div>

            <Link to="/oferta" className="relative flex min-h-[82px] items-center gap-3 overflow-hidden rounded-md border border-border bg-gradient-to-r from-secondary/60 via-card to-secondary/60 p-4 shadow-sm hover:border-primary/40"><img src={couple} alt="" loading="lazy" width={768} height={768} className="hidden h-[72px] w-[145px] shrink-0 object-cover object-top sm:block" /><div className="min-w-0 flex-1"><h2 className="text-sm font-extrabold">Zamów swoją wymarzoną figurkę 3D!</h2><p className="mt-1 text-[11px] leading-5">Przekształć swoje zdjęcia w wyjątkową figurkę, która będzie doskonałą pamiątką lub prezentem.</p></div><span className="hidden items-center gap-2 rounded-md bg-primary px-4 py-2 text-[11px] font-semibold text-primary-foreground sm:inline-flex">Zobacz ofertę <ArrowRight className="size-3" /></span></Link>
          </div> : view === "orders" ? <section className="min-h-[520px] space-y-4 p-4 sm:p-6">
            <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
              <div className="py-1"><h1 className="text-xl font-extrabold sm:text-2xl">Moje zamówienia</h1><p className="mt-1 max-w-md text-[12px] leading-5 text-muted-foreground">Tutaj znajdziesz wszystkie swoje zamówienia – zarówno figurki 3D na zamówienie, jak i gotowe modele 3D ze sklepu.</p></div>
              <div className="relative flex min-h-[108px] overflow-hidden rounded-md border border-border bg-card p-2"><div className="relative w-full overflow-hidden rounded-md bg-secondary/70 p-4"><div className="relative z-10 max-w-[64%]"><h2 className="text-[13px] font-bold">Stwórz swoją figurkę 3D</h2><p className="mt-1 text-[11px] leading-4">Zamów personalizowaną figurkę ze swoich zdjęć i ciesz się wyjątkową pamiątką!</p><Link to="/oferta" className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-primary underline underline-offset-2">Przejdź do konfiguratora <ArrowRight className="size-3" /></Link></div><img src={couple} alt="Figurka pary z psem" width={768} height={768} className="absolute -bottom-6 right-0 h-[125px] w-[38%] object-contain object-bottom" /></div></div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap gap-2">{(["Wszystkie", "Figurki na zamówienie", "Modele 3D"] as const).map(t => <Button key={t} type="button" size="sm" variant={typeFilter === t ? "hero" : "outline"} onClick={() => setTypeFilter(t)} className="h-8 rounded-full px-4 text-[11px] font-semibold">{t}</Button>)}</div>
              <div className="flex flex-wrap gap-2">{(["Wszystkie", "W realizacji", "Wymaga działania", "Zakończone"] as const).map(s => <Button key={s} type="button" size="sm" variant={statusFilter === s ? "hero" : "outline"} onClick={() => setStatusFilter(s)} className="h-8 rounded-full px-4 text-[11px] font-semibold">{s}</Button>)}</div>
            </div>

            {filtered.length ? <div className="rounded-md border border-border bg-card px-5 py-2">{orderList(filtered)}</div> : <div className="flex flex-col items-center rounded-md border border-border bg-card px-5 py-10 text-center">
              <img src={emptyBox} alt="Otwarte puste pudełko" width={768} height={768} className="h-36 w-40 object-contain" />
              <h2 className="mt-3 text-lg font-extrabold">Nie masz jeszcze żadnych zamówień</h2>
              <p className="mt-2 max-w-md text-[12px] leading-5 text-muted-foreground">{query ? `Nie znaleziono zamówień dla „${query}”.` : "Gdy złożysz zamówienie na personalizowaną figurkę 3D lub kupisz gotowy model 3D, pojawi się ono tutaj. Możesz od razu przejść do konfiguratora i stworzyć coś wyjątkowego!"}</p>
              <Button asChild variant="hero" className="mt-5 px-6"><Link to="/oferta"><Box className="size-4" /> Stwórz swoją figurkę 3D <ArrowRight /></Link></Button>
              <div className="mt-8 grid w-full grid-cols-1 gap-4 border-t border-border pt-6 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { icon: Camera, title: "Własne zdjęcia", text: "Wyślij nam zdjęcia, a my zajmiemy się resztą." },
                  { icon: Box, title: "Precyzyjne modele 3D", text: "Wysoka jakość i dbałość o detale." },
                  { icon: Paintbrush, title: "Ręczne malowanie", text: "Opcja personalizacji i ręcznego malowania." },
                  { icon: Truck, title: "Bezpieczna dostawa", text: "Twoja figurka dotrze do Ciebie w idealnym stanie." },
                ].map(({ icon: Icon, title, text }) => <div key={title} className="flex items-start gap-3 text-left"><span className="grid size-10 shrink-0 place-items-center rounded-full bg-secondary text-primary"><Icon className="size-5" /></span><span><strong className="block text-[12px] font-bold">{title}</strong><span className="block text-[11px] leading-4 text-muted-foreground">{text}</span></span></div>)}
              </div>
            </div>}
          </section> : <section className="min-h-[520px] p-5 sm:p-7"><h1 className="text-2xl font-extrabold">{navigation.find(item => item.id === view)?.label}</h1><div className="mt-8 rounded-md border border-border bg-card p-7 text-sm text-muted-foreground">{view === "profile" ? "Dane konta będą dostępne po uruchomieniu logowania." : view === "addresses" ? "Nie dodano jeszcze adresów." : "Nie masz jeszcze płatności ani faktur."}</div></section>}
        </div>
      </div>
    </main>
    <SiteFooter />
  </div>;
}