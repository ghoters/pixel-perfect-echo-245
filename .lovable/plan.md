# Plan odtworzenia interfejsu prezent3d.com

## Zakres
- Przenieść kompletny frontend projektu referencyjnego, bez reinterpretacji wizualnej.
- Odtworzyć wszystkie widoki: strona główna, konfigurator, dane zamówienia, płatność, potwierdzenie, FAQ i kontakt.
- Zachować pełny przebieg konfiguracji oraz stanów pustych, formularzy, walidacji, galerii zdjęć i podsumowań.

## Realizacja
1. Przenieść oryginalny system wizualny: font Manrope, tokeny kolorów, szerokości kontenerów, spacing, typografię, obramowania, cienie, promienie i animacje.
2. Przenieść wspólny nagłówek, wariant nagłówka zamówienia, stopkę oraz używane komponenty interfejsu.
3. Przenieść wszystkie strony i ich dokładną treść, układ, ikony, warianty kart, przyciski, formularze i stany interaktywne.
4. Przenieść oryginalne obrazy i logo, zachowując kadrowanie, proporcje i punkty ogniskowe.
5. Zachować logikę konfiguratora, obliczanie ceny, dodawanie zdjęć, formularz dostawy, wybór płatności i ekran potwierdzenia.
6. Zachować metadane każdej strony i polską konfigurację dokumentu.

## Weryfikacja
- Porównać projekt źródłowy i odtworzony na szerokościach desktop, tablet i mobile.
- Przejść wszystkie strony oraz pełną ścieżkę: konfigurator → zamówienie → płatność → potwierdzenie.
- Sprawdzić rozwijane FAQ, formularze, upload i galerię zdjęć, stany hover/focus/disabled oraz brak błędów widoku.

## Szczegóły techniczne
- Zachować architekturę TanStack Start i routing odpowiadający oryginałowi.
- Użyć dokładnych plików źródłowych i zależności projektu referencyjnego tam, gdzie są zgodne z bieżącym środowiskiem.
- Nie dodawać bazy danych ani usług zewnętrznych; oryginalny przepływ korzysta wyłącznie ze stanu przeglądarki.
