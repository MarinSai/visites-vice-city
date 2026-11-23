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
    note: 'Note : le nombre de joueurs de GTA VI n’est pas publié, il s’agit ici d’une estimation réalisée par la revue sur le week-end des 21 et 22 novembre. Pour les villes, il s’agit des arrivées internationales pour l’année 2025 ramenées à un week-end. Vice City est la ville virtuelle de GTA VI.',
    surPiste: (n) => `Vice City en a reçu ${n} fois plus`,
    source: 'Sources : Euromonitor International, Take-Two Interactive, Sensor Tower, Circana, Sony ; calculs du Grand Continent · Graphique : Le Grand Continent',
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
    note: 'Nota: el número de jugadores de GTA VI no se ha publicado; se trata de una estimación realizada por la revista para el fin de semana del 21 y 22 de noviembre. Para las ciudades, se trata de las llegadas internacionales del año 2025 reducidas a un fin de semana. Vice City es la ciudad virtual de GTA VI.',
    surPiste: (n) => `Vice City recibió ${n} veces más`,
    source: 'Fuentes: Euromonitor International, Take-Two Interactive, Sensor Tower, Circana, Sony; cálculos de El Grand Continent · Gráfico: El Grand Continent',
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
    note: 'Nota: il numero di giocatori di GTA VI non è pubblicato; si tratta di una stima realizzata dalla rivista per il fine settimana del 21 e 22 novembre. Per le città, si tratta degli arrivi internazionali dell’anno 2025 riportati a un fine settimana. Vice City è la città virtuale di GTA VI.',
    surPiste: (n) => `Vice City ne ha ricevuti ${n} volte di più`,
    source: 'Fonti: Euromonitor International, Take-Two Interactive, Sensor Tower, Circana, Sony; calcoli de Il Grand Continent · Grafico: Il Grand Continent',
    milliers: '.'
  }
};
export const T = LANGUES[import.meta.env?.VITE_LANGUE || 'fr'];
