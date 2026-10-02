# Prawdziwe konto administratora do testowania

## Efekt
- Będzie można utworzyć własne konto, zalogować się i obejrzeć istniejący widok „Moje konto” jako administrator.
- Dostęp do konta będzie rzeczywiście chroniony; nie dodam publicznego hasła testowego ani przełącznika „udawaj admina”.
- Zachowam obecny wygląd stron logowania i konta oraz istniejącą ścieżkę zakupową. Nie będę tworzyć osobnego panelu zarządzania, bo nie został wskazany jego zakres.

## Kroki
1. Uruchomić Lovable Cloud dla kont użytkowników oraz włączyć logowanie e-mailem i hasłem oraz Google.
2. Utworzyć osobny profil użytkownika (np. imię i nazwisko), zakładany automatycznie po rejestracji, oraz osobne, chronione uprawnienie administratora. Zwykły użytkownik nie może nadać sobie tej roli.
3. Podłączyć istniejący formularz rejestracji i logowania do rzeczywistych kont; dodać wylogowanie, komunikaty o błędach i potwierdzeniu adresu oraz odzyskiwanie hasła z formularzem ustawienia nowego hasła.
4. Chronić stronę `/konto` przed niezalogowanymi osobami, zachować jej obecny wygląd, a w nagłówku pokazywać stan zalogowania. Po zalogowaniu administrator trafi do tego samego widoku konta.
5. Nadać rolę administratora wyłącznie konkretnemu, zweryfikowanemu kontu poprzez zaufaną operację administracyjną po jego rejestracji; nie zakładać z góry adresu e-mail ani nie umieszczać hasła w kodzie. Jeśli konto docelowe nie jest jeszcze znane, przydzielenie roli będzie wymagało wskazania go po rejestracji.
6. Sprawdzić rejestrację, logowanie, wylogowanie, wejście na `/konto`, odzyskanie hasła i zachowanie na telefonie oraz komputerze.

## Szczegóły techniczne
- `profiles` połączone z kontem użytkownika, własnościowe zasady dostępu i automatyczne tworzenie; role w oddzielnej tabeli `user_roles` z serwerową weryfikacją.
- Brak publicznej funkcji do samodzielnego nadawania roli admina. Strona `/konto` pod chronioną bramką; formularz odzyskiwania hasła pozostaje publiczny.
- Obecny ekran `/logowanie` ma tylko prezentację formularza, a `/konto` jest publicznym widokiem demonstracyjnym; plan zastąpi te zachowania realną sesją bez przebudowy ich wyglądu.
