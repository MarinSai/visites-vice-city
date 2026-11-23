// Textes du graphique en trois langues. La langue est choisie à la compilation (VITE_LANGUE = fr, es ou it).
export const LANGUES = {
  fr: {
    titre: 'Ce week-end, Vice City a été visitée 400 fois plus que Paris',
    chapo: 'Visiteurs estimés samedi 21 et dimanche 22 novembre 2026 : joueurs de GTA VI pour Vice City, touristes internationaux pour les neuf villes les plus visitées au monde',
    cle: ['Joueurs de GTA VI (estimation centrale)', 'Fourchette d’estimation (intervalle à 90 %)', 'Touristes internationaux (week-end moyen)', 'Niveau de Vice City'],
    entetes: ['Visiteurs', 'Vice City en a reçu'],
    jeu: 'GTA VI',
    fourchette: (a, b) => `Entre ${a} et ${b} millions (intervalle à 90 %)`,
    millions: 'M',
    fois: (n) => `${n} fois plus`,
    villes: [['Bangkok', 'Thaïlande'], ['Hong Kong', 'Chine'], ['Londres', 'Royaume-Uni'], ['Macao', 'Chine'], ['Istanbul', 'Turquie'],
             ['Dubaï', 'Émirats arabes unis'], ['La Mecque', 'Arabie saoudite'], ['Antalya', 'Turquie'], ['Paris', 'France']],
    note: 'Note : le nombre de joueurs de GTA VI n’est pas publié ; il est estimé à partir des ventes annoncées par Take-Two, des estimations de Sensor Tower, des taux d’activation mesurés par Circana et des utilisateurs actifs de PlayStation. Pour les villes, arrivées internationales de 2025 ramenées à un week-end moyen (chiffre annuel ÷ 365 × 2). À l’échelle, la barre de chaque ville mesure moins de 0,5 % de celle de Vice City, ville fictive du jeu.',
    source: 'Source : Euromonitor International, Take-Two Interactive, Sensor Tower, Circana, Sony ; calculs du Grand Continent · Graphique : Le Grand Continent',
    milliers: ' '
  },
  es: {
    titre: 'Este fin de semana, Vice City recibió 400 veces más visitantes que París',
    chapo: 'Visitantes estimados el sábado 21 y el domingo 22 de noviembre de 2026: jugadores de GTA VI en Vice City, turistas internacionales en las nueve ciudades más visitadas del mundo',
    cle: ['Jugadores de GTA VI (estimación central)', 'Horquilla de estimación (intervalo al 90 %)', 'Turistas internacionales (fin de semana medio)', 'Nivel de Vice City'],
    entetes: ['Visitantes', 'Vice City recibió'],
    jeu: 'GTA VI',
    fourchette: (a, b) => `Entre ${a} y ${b} millones (intervalo al 90 %)`,
    millions: 'M',
    fois: (n) => `${n} veces más`,
    villes: [['Bangkok', 'Tailandia'], ['Hong Kong', 'China'], ['Londres', 'Reino Unido'], ['Macao', 'China'], ['Estambul', 'Turquía'],
             ['Dubái', 'Emiratos Árabes Unidos'], ['La Meca', 'Arabia Saudí'], ['Antalya', 'Turquía'], ['París', 'Francia']],
    note: 'Nota: el número de jugadores de GTA VI no se ha publicado; se estima a partir de las ventas anunciadas por Take-Two, las estimaciones de Sensor Tower, las tasas de activación medidas por Circana y los usuarios activos de PlayStation. Para las ciudades, llegadas internacionales de 2025 reducidas a un fin de semana medio (cifra anual ÷ 365 × 2). A escala, la barra de cada ciudad mide menos del 0,5 % de la de Vice City, ciudad ficticia del juego.',
    source: 'Fuente: Euromonitor International, Take-Two Interactive, Sensor Tower, Circana, Sony; cálculos de El Grand Continent · Gráfico: El Grand Continent',
    milliers: '.'
  },
  it: {
    titre: 'Questo fine settimana Vice City ha ricevuto 400 volte più visitatori di Parigi',
    chapo: 'Visitatori stimati sabato 21 e domenica 22 novembre 2026: giocatori di GTA VI per Vice City, turisti internazionali per le nove città più visitate al mondo',
    cle: ['Giocatori di GTA VI (stima centrale)', 'Forchetta di stima (intervallo al 90%)', 'Turisti internazionali (fine settimana medio)', 'Livello di Vice City'],
    entetes: ['Visitatori', 'Vice City ne ha ricevuti'],
    jeu: 'GTA VI',
    fourchette: (a, b) => `Tra ${a} e ${b} milioni (intervallo al 90%)`,
    millions: 'mln',
    fois: (n) => `${n} volte di più`,
    villes: [['Bangkok', 'Thailandia'], ['Hong Kong', 'Cina'], ['Londra', 'Regno Unito'], ['Macao', 'Cina'], ['Istanbul', 'Turchia'],
             ['Dubai', 'Emirati Arabi Uniti'], ['La Mecca', 'Arabia Saudita'], ['Antalya', 'Turchia'], ['Parigi', 'Francia']],
    note: 'Nota: il numero di giocatori di GTA VI non è pubblicato; è stimato a partire dalle vendite annunciate da Take-Two, dalle stime di Sensor Tower, dai tassi di attivazione misurati da Circana e dagli utenti attivi di PlayStation. Per le città, arrivi internazionali del 2025 riportati a un fine settimana medio (dato annuo ÷ 365 × 2). In scala, la barra di ogni città misura meno dello 0,5% di quella di Vice City, città immaginaria del gioco.',
    source: 'Fonte: Euromonitor International, Take-Two Interactive, Sensor Tower, Circana, Sony; calcoli de Il Grand Continent · Grafico: Il Grand Continent',
    milliers: '.'
  }
};
export const T = LANGUES[import.meta.env?.VITE_LANGUE || 'fr'];
