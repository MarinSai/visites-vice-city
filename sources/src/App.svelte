<script>
  import { onMount } from 'svelte';
  import { T } from './textes.js';

  // Vice City : estimation de la revue (joueurs de GTA VI, samedi 21 et dimanche 22 novembre 2026)
  const VICE = 40.5e6, BAS = 30.4e6, HAUT = 49.1e6;

  // Arrivées internationales 2025 (Euromonitor, millions), ramenées à un week-end moyen (÷ 365 × 2)
  const ANNUEL = [30.3, 23.2, 22.7, 20.4, 19.7, 19.5, 18.7, 18.6, 18.3];
  const villes = ANNUEL.map((an, i) => {
    const v = (an * 1e6 * 2) / 365;
    return { nom: T.villes[i][0], pays: T.villes[i][1], v, ratio: Math.round(VICE / v) };
  });

  const MAX = 50e6;
  const pct = (x) => (x / MAX) * 100;
  const milliers = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, T.milliers);
  const enMilliers = (x) => milliers(Math.round(x / 1000) * 1000);
  const enMillions = (x) => (x / 1e6).toFixed(1).replace('.', ',');

  let visible = false;
  let compteur = 0;
  let bloc;

  onMount(() => {
    const p = new URLSearchParams(location.search);
    const reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches || p.has('fige');
    const lancer = () => {
      visible = true;
      if (reduit) { compteur = VICE; return; }
      const t0 = performance.now(), d = 1500;
      const pas = (t) => {
        const k = Math.min(1, (t - t0) / d);
        compteur = VICE * (1 - Math.pow(1 - k, 3));
        if (k < 1) requestAnimationFrame(pas);
      };
      requestAnimationFrame(pas);
    };
    const io = new IntersectionObserver((e) => {
      if (e[0].isIntersecting) { lancer(); io.disconnect(); }
    }, { threshold: 0.35 });
    io.observe(bloc);
    return () => io.disconnect();
  });
</script>

<figure class="bloc" class:visible class:immediat={visible && compteur === VICE} bind:this={bloc}>
  <div class="tete">
    <h1>{T.titre}</h1>
    <p class="chapo">{T.chapo}</p>
  </div>

  <ul class="cle">
    <li><svg width="18" height="14" viewBox="0 0 18 14" aria-hidden="true"><rect x="1" y="3" width="16" height="8" fill="#dd203c"/></svg>{T.cle[0]}</li>
    <li><svg width="18" height="14" viewBox="0 0 18 14" aria-hidden="true"><rect x="1" y="4" width="16" height="6" fill="#9a9aa0"/></svg>{T.cle[1]}</li>
    <li><svg width="18" height="14" viewBox="0 0 18 14" aria-hidden="true"><path d="M2 3v8M2 7h14M16 3v8" stroke="#141414" stroke-width="1.4" fill="none"/></svg>{T.cle[2]}</li>
  </ul>

  <div class="tableau" role="table">
    <div class="ligne entetes" role="row" aria-hidden="true">
      <span></span><span></span>
      <span class="num">{T.entetes[0]}</span>
      <span class="num">{T.entetes[1]}</span>
    </div>

    <div class="ligne vice" role="row">
      <div class="nom">
        <strong>Vice City</strong>
        <span class="etiquette">{T.jeu}</span>
      </div>
      <div class="piste">
        <i class="barre rouge" style="--w:{pct(VICE)}%"></i>
        <i class="intervalle" style="left:{pct(BAS)}%;width:{pct(HAUT) - pct(BAS)}%"></i>
      </div>
      <div class="num valeur">≈ {enMillions(compteur)} {T.millions}</div>
      <div class="num ratio vide">—</div>
      <p class="fourchette">{T.fourchette(enMillions(BAS), enMillions(HAUT))}</p>
    </div>

    {#each villes as c, i}
      <div class="ligne" role="row" style="--d:{0.8 + i * 0.05}s">
        <div class="nom">
          <strong>{c.nom}</strong>
          <span class="pays">{c.pays}</span>
        </div>
        <div class="piste"><i class="barre gris" style="--w:{pct(c.v)}%"></i></div>
        <div class="num valeur">{enMilliers(c.v)}</div>
        <div class="num ratio"><span class="devant">{T.entetes[1]} </span>{T.fois(c.ratio)}</div>
      </div>
    {/each}
  </div>

  <div class="source">
    <p>{T.note}</p>
    <p>{T.source}</p>
  </div>
</figure>

<style>
  .bloc{max-width:1040px;margin:0 auto;padding:6px var(--marge) 10px;display:flex;flex-direction:column;gap:14px;background:var(--papier)}
  .tete{display:flex;flex-direction:column;gap:6px}
  h1{font-family:var(--titre);font-weight:700;font-size:clamp(21px,3.3vw,28px);line-height:1.16;text-wrap:balance}
  .chapo{font-size:15px;line-height:1.4;color:var(--gris);max-width:70ch}

  .cle{list-style:none;display:flex;flex-wrap:wrap;gap:6px 18px;font-size:12.5px;line-height:1.3;color:#3b3b40}
  .cle li{display:flex;align-items:center;gap:6px;white-space:nowrap}
  .cle svg{flex:none;display:block}

  .ligne{display:grid;grid-template-columns:150px 1fr 110px 130px;column-gap:16px;align-items:center;padding:9px 0;border-bottom:1px solid #ededed}
  .entetes{padding:0 0 6px;border-bottom:1px solid var(--filet);font-size:12px;line-height:1.25;color:var(--gris)}
  .num{text-align:right;font-variant-numeric:tabular-nums lining-nums}

  .nom{display:flex;flex-direction:column;line-height:1.2;min-width:0}
  .nom strong{font-size:15px;font-weight:600}
  .pays{font-size:12px;color:var(--gris)}

  .piste{position:relative;height:12px}
  .barre{position:absolute;left:0;top:0;bottom:0;width:0;transition:width 1.5s cubic-bezier(.2,.8,.2,1)}
  .visible .barre{width:var(--w)}
  .barre.gris{background:#9a9aa0}
  .visible .barre.gris{min-width:2px;transition-delay:var(--d)}

  .vice{padding:14px 0 12px;border-bottom:1px solid var(--filet)}
  .vice .nom strong{font-family:var(--titre);font-weight:700;font-size:20px}
  .etiquette{align-self:flex-start;margin-top:4px;font-size:10.5px;font-weight:600;letter-spacing:1.6px;text-transform:uppercase;color:var(--rouge)}
  .vice .piste{height:26px}
  .barre.rouge{background:var(--rouge)}
  .intervalle{position:absolute;top:50%;height:0;border-top:1.4px solid var(--encre);opacity:0;transition:opacity .4s 1.4s}
  .intervalle::before,.intervalle::after{content:'';position:absolute;top:-6px;height:11px;border-left:1.4px solid var(--encre)}
  .intervalle::before{left:0}
  .intervalle::after{right:0}
  .visible .intervalle{opacity:1}
  .vice .valeur{font-family:var(--titre);font-weight:700;font-size:20px;color:var(--rouge)}
  .fourchette{grid-column:2 / -1;margin-top:6px;font-size:12px;color:var(--gris)}

  .valeur{font-size:15px;font-weight:600}
  .ratio{font-size:13.5px;font-weight:500;color:var(--rouge-sombre)}
  .ratio.vide{color:var(--gris);font-weight:400}
  .devant{display:none}

  .source{font-size:12px;line-height:1.45;color:var(--gris);border-top:1px solid var(--filet);padding-top:10px;display:flex;flex-direction:column;gap:6px}

  @media (max-width:600px){
    .bloc{gap:12px}
    .chapo{font-size:14px}
    .cle{gap:5px 14px;font-size:12px}
    .entetes{display:none}
    .ligne{grid-template-columns:1fr auto;grid-template-areas:'nom valeur' 'piste piste' 'ratio ratio';row-gap:5px;padding:9px 0 8px}
    .nom{grid-area:nom;flex-direction:row;align-items:baseline;gap:6px;flex-wrap:wrap}
    .piste{grid-area:piste}
    .valeur{grid-area:valeur}
    .ratio{grid-area:ratio;text-align:left;font-size:12.5px}
    .devant{display:inline;font-weight:400;color:var(--gris)}
    .vice .ratio{display:none}
    .vice .nom{align-items:baseline}
    .etiquette{margin-top:0}
    .fourchette{grid-column:1 / -1;margin-top:2px}
  }
  @media (prefers-reduced-motion:reduce){ .barre,.intervalle{transition:none} }
</style>
