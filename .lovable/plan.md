# Delikatna, pulsująca poświata fioletowa na tekście „Napisz do nas…“ (/sklep)

## Cel
Tekst linku „Napisz do nas – chętnie przygotujemy indywidualny projekt.” na podstronie `/sklep` ma delikatnie emanować subtelną poświatą w kolorze fioletu (kolor przewodni strony, `--primary`). Poświata ma się powoli, płynnie unosić i opadać — efekt dyskretny, nie duży.

## Zakres zmian
1. **`src/styles.css`** — dodać na końcu mały, lokalny blok:
   - `@keyframes glow-breathe` — cykl ok. 3,5–4 s, `ease-in-out`, naprzemienny (`alternate`), animujący delikatny fioletowy `text-shadow` (2 warstwy: wąska jaśniejsza + szeroka, mocno rozmyta i przezroczysta; maksymalna intensywność ok. 35–40% koloru przewodniego) oraz bardzo lekką zmianę intensywności koloru tekstu, tak żeby emanacja była widoczna, ale subtelna.
   - Klasa `.glow-breathe` stosująca tę animację, zdefiniowana przez `color-mix(in oklab, var(--primary) …, transparent)`, więc automatycznie podąża za kolor przewodni (jasny/ciemny motyw).
   - Blok `@media (prefers-reduced-motion: reduce)` wyłączający animację (statyczny, delikatny stan poświaty).
2. **`src/routes/sklep.tsx`** — dodać klasę `glow-breathe` wyłącznie do `<span>` wewnątrz linku do `/kontakt` (linia 55). Tytuł „Masz pomysł na inny model?”, nagłówek, akapity i przycisk pozostają bez zmian.

## Czego nie zmieniać
- Układ, rozmiary, fonty, kolory i treść strony /sklep pozostają bez zmian.
- Zachowanie linku (kolor na hover, podkreślenie, przejście do /kontakt) bez zmian.
- Żadnych innych stron ani komponentów.

## Weryfikacja
- Playwright na desktopie (1280px) i mobile (390px): zrzuty ekranu potwierdzają, że poświata jest subtelna i dotyczy tylko tekstu linku; brak błędów w konsoli; build OK (build-errors.log).
