# Vice City, ville la plus visitée du week-end

Graphique du Grand Continent : visiteurs estimés samedi 21 et dimanche 22 novembre 2026 à Vice City (joueurs de GTA VI) et dans les neuf villes les plus visitées au monde (arrivées internationales 2025 selon Euromonitor, ramenées à un week-end moyen).

- Vice City : estimation de la revue, environ 40,5 millions de joueurs (intervalle à 90 % : 30,4 à 49,1 millions).
- Villes : chiffre annuel Euromonitor ÷ 365 × 2.

Compilation (Svelte 4 + Vite + vite-plugin-singlefile) :

    npm install
    VITE_LANGUE=fr npx vite build   # → dist-fr/index.html (copié en ../index.html)
    VITE_LANGUE=es npx vite build   # → dist-es/index.html (copié en ../es.html)
    VITE_LANGUE=it npx vite build   # → dist-it/index.html (copié en ../it.html)

Les textes des trois langues sont dans `src/textes.js`.
