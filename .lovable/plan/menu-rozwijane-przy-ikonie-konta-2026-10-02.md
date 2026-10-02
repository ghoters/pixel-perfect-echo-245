# Menu rozwijane przy ikonie konta

## Problem
Ikonka konta w nagłówku zawsze prowadzi do strony `/logowanie`. Zalogowany użytkownik, klikając ją, trafia na ekran logowania — wygląda to jak wylogowanie.

## Rozwiązanie
Nagłówek (`src/components/SiteHeader.tsx`) sprawdza sesję logowania przy wczytaniu strony (ten sam mechanizm co na `/konto`).

- **Niezalogowany:** ikona konta działa jak dotąd — przenosi do `/logowanie`.
- **Zalogowany:** kliknięcie ikony otwiera rozwijane menu (gotowy komponent DropdownMenu, taki sam styl jak reszta strony) z pozycjami:
  1. **Moje konto** → `/konto` (dashboard)
  2. **Moje zamówienia** → `/konto?view=orders`
  3. **Dane konta** → `/konto?view=profile`
  4. Na końcu, oddzielone linią: **Wyloguj się** (prawdziwe wylogowanie + powrót na stronę główną) — jeśli nie chcesz tej pozycji, dam znać i ją usunę.

Menu działa też na mobile (klik w ikonę otwiera je nad treścią), zamyka się po kliknięciu poza menu i po wyborze pozycji.

## Pliki
- `src/components/SiteHeader.tsx` — jedyna zmiana: sprawdzenie sesji + rozwijane menu.
