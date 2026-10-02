# Konto admina i panel zarządzania zamówieniami

Konto sebjara.ghoters@gmail.com istnieje i jest potwierdzone (ma 2 zamówienia testowe). Dostanie ono rolę admina.

## Co powstanie
1. **Rola admina** dla sebjara.ghoters@gmail.com (wpis w tabeli ról, nie w kodzie, bez hasła w kodzie).
2. **Panel admina `/admin`** w stylu strony (nagłówek, stopka, typografia jak na stronie głównej), widoczny tylko dla admina; inni dostają komunikat „Brak dostępu”.
   - **Zamówienia**: lista wszystkich zamówień wszystkich klientów (numer, klient, data, cena, dostawa, status), wyszukiwanie i filtr statusu.
   - **Zmiana statusu**: W realizacji → Gotowe do pobrania → Wysłane → Zakończone / Anulowane.
   - **Dodawanie zamówienia** ręcznie (wybór klienta, ceny, dostawa, status).
   - **Edycja i usuwanie** zamówienia (z potwierdzeniem przed usunięciem).
   - **Klienci**: lista kont (nazwa, e-mail, data rejestracji, liczba zamówień).
3. **Link „Panel admina”** w menu konta `/konto` — pokazany tylko adminowi.
4. Liczniki w `/konto` („Gotowe do pobrania”, „Wysłane”) zaczną liczyć prawdziwe statusy.

## Szczegóły techniczne
- Migracja: polityki RLS na `orders` dla `has_role(auth.uid(),'admin')` (SELECT/INSERT/UPDATE/DELETE wszystkich), na `profiles` SELECT dla admina; dodanie kolumny `email text` w profiles (backfill z auth.users, trigger uzupełnia przy rejestracji) do listy klientów.
- Nadanie roli: insert do `user_roles` (deef1546-…, 'admin').
- Sprawdzanie roli po stronie bazy (RLS + `has_role`), nigdy z localStorage.
- Nowa trasa `src/routes/admin.tsx` (ssr off dla danych, zapytania przeglądarkowym klientem z RLS).
