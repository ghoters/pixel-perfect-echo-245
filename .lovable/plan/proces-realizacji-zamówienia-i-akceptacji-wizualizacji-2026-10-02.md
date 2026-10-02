# Proces realizacji zamówienia i akceptacji wizualizacji

## Cel
Zamówienie figurki personalizowanej stanie się centrum współpracy klienta z administratorem. Administrator ręcznie prowadzi je przez etapy, publikuje wizualizacje i pliki, a klient obserwuje postęp, akceptuje projekt lub zgłasza poprawki.

Referencyjna grafika wyznacza układ i styl nowych ekranów. Typografia, kolory, nagłówek i stopka pozostaną zgodne z obecną stroną.

## Panel klienta
1. Rozbudować listę „Moje zamówienia” o typ, czytelny status, oznaczenie „Wymaga działania”, kwotę i przycisk „Szczegóły”. Filtry zaczną działać na rzeczywistych etapach procesu.
2. Dodać szczegóły zamówienia pod adresem `/konto/zamowienia/{id}`:
   - pozioma oś: Opłacone → Projektowanie → Wizualizacja → Modelowanie → Druk → Malowanie → Gotowe → Wysłane,
   - przewidywany termin, konfiguracja, cena i dostawa,
   - dane przesyłki po wysłaniu,
   - chronologiczna historia zmian,
   - pliki przypisane do zamówienia dostępne do pobrania.
3. Dla etapu wizualizacji odtworzyć widok z dużym podglądem, miniaturami ujęć i wersjami v1/v2/v3. Klient będzie mógł:
   - zaakceptować aktualną wersję,
   - otworzyć formularz zmian, opisać poprawki i opcjonalnie dołączyć zdjęcie referencyjne,
   - zobaczyć wcześniejsze wersje i zgłoszenia w historii.
4. Po akceptacji aktualna wersja zostanie zablokowana, zdarzenie trafi do historii, a zamówienie przejdzie do „Modelowanie”.
5. System policzy wykorzystane rundy poprawek. Dwie pierwsze będą bezpłatne; kolejna pokaże ekran 50 zł i utworzy zgłoszenie do administratora — bez płatności internetowej na tym etapie.
6. Dzwonek i „Ostatnia aktywność” pokażą prawdziwe, nieprzeczytane powiadomienia związane z zamówieniami.

## Panel administratora
1. Zachować obecną listę klientów i zamówień, ale dopasować statusy i filtry do pełnego procesu figurki.
2. Dodać ekran szczegółów zamówienia `/admin/zamowienia/{id}` z:
   - danymi klienta, konfiguracją, ceną, dostawą i historią,
   - ręcznym przełączaniem kolejnych etapów oraz planowanego terminu,
   - dodaniem firmy kurierskiej, numeru i linku śledzenia,
   - wgrywaniem ogólnych plików zamówienia.
3. Dodać obsługę wizualizacji:
   - utworzenie kolejnej wersji,
   - kilka uporządkowanych ujęć w jednej wersji,
   - wysłanie wersji do akceptacji,
   - podgląd decyzji klienta i treści poprawek,
   - obsługa zgłoszenia płatnej rundy poza stroną i ręczne odblokowanie następnej rundy.
4. Każda istotna czynność zapisze zdarzenie w historii i utworzy powiadomienie dla właściwej strony.

## Powiadomienia i e-mail
- Powiadomienia w panelu będą działać od razu: lista, licznik i oznaczanie jako przeczytane.
- Zdarzenia wymagające wiadomości e-mail będą zapisywane w sposób gotowy do późniejszego podłączenia Resend.
- W tej wersji e-maile nie będą jeszcze wysyłane, ponieważ Resend zostanie podłączony później.

## Dane, pliki i bezpieczeństwo
- Rozszerzyć zamówienia o typ, etap, termin, dane przesyłki i konfigurację bez usuwania istniejących danych.
- Dodać osobne dane dla historii, wersji wizualizacji, ujęć, zgłoszeń poprawek, plików i powiadomień.
- Utworzyć prywatne miejsce na pliki. Klient zobaczy wyłącznie pliki własnych zamówień, a administrator wszystkie pliki potrzebne do obsługi.
- Wszystkie odczyty i działania będą chronione po stronie bazy: właściciel zamówienia albo administrator. Akceptacja, poprawki i zmiany etapów będą wykonywane jako sprawdzane operacje, aby nie dało się ominąć kolejności lub limitu rund.
- Istniejące zamówienia zostaną bezpiecznie przypisane do procesu figurki i zachowają swoje numery oraz ceny.

## Zakres tej wersji
- Główny workflow dotyczy wyłącznie personalizowanej figurki 3D.
- Gotowy model 3D pozostaje zwykłym produktem sklepowym bez akceptacji wizualizacji; jego krótki proces zostanie wdrożony razem ze sklepem.
- Nie budujemy teraz płatności za dodatkową rundę, faktur ani wysyłki e-mail.
- Obecnej sekcji „Płatności i faktury” nie rozbudowujemy; pliki będą dostępne bezpośrednio w szczegółach zamówienia.

## Weryfikacja
- Sprawdzić pełną ścieżkę na prawdziwym zamówieniu: admin zmienia etap → dodaje wizualizację → klient zgłasza poprawki → admin dodaje v2 → klient akceptuje → admin prowadzi do wysyłki.
- Potwierdzić historię, licznik dwóch darmowych rund, zgłoszenie płatnej rundy, pliki, dane przesyłki i powiadomienia.
- Sprawdzić brak dostępu do cudzych zamówień i plików oraz widoki na komputerze i telefonie.
