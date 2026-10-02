# Zmniejszenie typografii podstrony /sklep

## Cel
Podstrona /sklep wygląda zbyt monumentalnie — nagłówek i teksty mają pełną skalę hero strony głównej (36→44→52px). Trzeba ją zmniejszyć o jeden stopień, zachowując układ, fonty (extrabold, te same font-family), kolory i strukturę sekcji.

## Zakres zmian — tylko `src/routes/sklep.tsx`

Zmiany rozmiarów (fonty, wagi i kolory bez zmian):

| Element | Obecnie | Nowo |
|---|---|---|
| Ikona sklepu w kółku | kółko 72px, ikona 32 (size-8) | kółko 56px, ikona 24 (size-6) |
| Eyebrow „Sklep w przygotowaniu" | text-[11px] | text-[11px] (bez zmian) |
| H1 „Nasz sklep pojawi się już wkrótce" | 36 / sm:44 / lg:52 px | 28 / sm:32 / lg:36 px |
| Akapity (2×) | text-[15px] leading-7 | text-[14px] leading-6 |
| Przycisk CTA | size="lg" | size="default" (mniejszy przycisk) |
| „Masz pomysł na inny model?" | text-[13px] | text-[12px] |
| Notka pod żarówką | text-[12px] | text-[11px] |
| Odstępy pionowe (mt/py) | — | lekko zmniejszone (mt-6→mt-5, mt-8→mt-7, mt-10→mt-8, pt-8→pt-6), by proporcje pasowały do mniejszej typografii |

Header, stopka, kolorystyka, treść i struktura strony pozostają bez zmian; stopka nadal przymocowana do dołu.

## Weryfikacja
- Build OK (build-errors.log).
- Zrzuty desktop (1280px) i mobile (390px): mniejszy nagłówek, spójny układ, stopka na dole.
