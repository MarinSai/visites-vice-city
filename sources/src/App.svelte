<script>
  import { onMount } from 'svelte';
  import { T } from './textes.js';
  import th from 'flag-icons/flags/4x3/th.svg?url';
  import cn from 'flag-icons/flags/4x3/cn.svg?url';
  import gb from 'flag-icons/flags/4x3/gb.svg?url';
  import tr from 'flag-icons/flags/4x3/tr.svg?url';
  import ae from 'flag-icons/flags/4x3/ae.svg?url';
  import sa from 'flag-icons/flags/4x3/sa.svg?url';
  import fr from 'flag-icons/flags/4x3/fr.svg?url';
  const DRAPEAUX = [th, cn, gb, cn, tr, ae, sa, tr, fr];

  // Vice City : estimation de la revue (joueurs de GTA VI, samedi 21 et dimanche 22 novembre 2026)
  const VICE = 40.5e6, BAS = 30.4e6, HAUT = 49.1e6;

  // Arrivées internationales 2025 (Euromonitor, millions), ramenées à un week-end moyen (÷ 365 × 2)
  const ANNUEL = [30.3, 23.2, 22.7, 20.4, 19.7, 19.5, 18.7, 18.6, 18.3];
  const villes = ANNUEL.map((an, i) => {
    const v = (an * 1e6 * 2) / 365;
    return { nom: T.villes[i][0], pays: T.villes[i][1], drapeau: DRAPEAUX[i], v, ratio: Math.round(VICE / v) };
  });

  const MAX = 50e6;
  const pct = (x) => (x / MAX) * 100;
  // positions à l'intérieur de la barre de Vice City (qui s'étend jusqu'à la borne haute)
  const dans = (x) => (x / HAUT) * 100;
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
      const t0 = performance.now(), d = 1400;
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

<figure class="bloc" class:visible bind:this={bloc}>
  <div class="tete">
    <h1>{T.titre}</h1>
    <p class="chapo">{T.chapo}</p>
  </div>

  <svg width="0" height="0" aria-hidden="true" style="position:absolute">
    <defs>
      <pattern id="hachures" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <rect width="5" height="5" fill="#efe9ff" />
        <line x1="0" y1="0" x2="0" y2="5" stroke="#8b68b0" stroke-width="1.6" />
      </pattern>
    </defs>
  </svg>

  <ul class="cle">
    <li><svg width="18" height="14" viewBox="0 0 18 14" aria-hidden="true"><rect x="1" y="3" width="16" height="8" fill="#8b68b0"/></svg>{T.cle[0]}</li>
    <li><svg width="18" height="14" viewBox="0 0 18 14" aria-hidden="true"><rect x="1" y="3" width="16" height="8" fill="url(#hachures)"/></svg>{T.cle[1]}</li>
    <li><svg width="18" height="14" viewBox="0 0 18 14" aria-hidden="true"><rect x="1" y="4" width="16" height="6" fill="#f34f4e"/></svg>{T.cle[2]}</li>
    <li><svg width="18" height="14" viewBox="0 0 18 14" aria-hidden="true"><rect x="1" y="4" width="16" height="6" fill="#f1edff"/></svg>{T.cle[3]}</li>
  </ul>

  <div class="tableau" role="table">
    <div class="ligne entetes" role="row" aria-hidden="true">
      <span></span><span></span>
      <span class="num">{T.entetes[0]}</span>
      <span class="num">{T.entetes[1]}</span>
    </div>

    <div class="ligne vice" role="row">
      <div class="nom"><strong>Vice City</strong><span class="etiquette">{T.jeu}</span></div>
      <div class="piste">
        <div class="vice-barre" style="--w:{pct(HAUT)}%">
          <i class="sur" style="width:{dans(BAS)}%"></i>
          <svg class="fourche" style="left:{dans(BAS)}%;width:{dans(HAUT) - dans(BAS)}%" preserveAspectRatio="none" aria-hidden="true">
            <rect width="100%" height="100%" fill="url(#hachures)" />
          </svg>
          <i class="centre" style="left:{dans(VICE)}%"></i>
        </div>
      </div>
      <div class="num valeur">≈ {enMillions(compteur)} {T.millions}</div>
      <div class="num ratio vide"></div>
      <p class="fourchette">{T.fourchette(enMillions(BAS), enMillions(HAUT))}</p>
    </div>

    {#each villes as c, i}
      <div class="ligne ville" role="row" style="--d:{0.7 + i * 0.05}s">
        <div class="nom"><img class="drapeau" src={c.drapeau} alt="" width="16" height="12" /><strong>{c.nom}</strong><span class="pays">{c.pays}</span></div>
        <div class="piste">
          <i class="repere" style="width:{pct(VICE)}%"></i>
          <i class="barre" style="--w:{pct(c.v)}%"></i>
          <span class="dans-piste">{i === 0 ? T.surPiste(c.ratio) : T.fois(c.ratio)}</span>
        </div>
        <div class="num valeur">{enMilliers(c.v)}</div>
        <div class="num ratio">{T.fois(c.ratio)}</div>
      </div>
    {/each}
  </div>

  <div class="source">
    <p>{T.note}</p>
    <p>{T.source}</p>
  </div>
</figure>

<style>
  .bloc{max-width:1040px;margin:0 auto;padding:6px var(--marge) 10px;display:flex;flex-direction:column;gap:12px;background:var(--papier)}
  .tete{display:flex;flex-direction:column;gap:6px}
  h1{font-family:var(--titre);font-weight:700;font-size:clamp(21px,3.3vw,28px);line-height:1.16;text-wrap:balance}
  .chapo{font-size:15px;line-height:1.4;color:var(--gris);max-width:70ch}

  .cle{list-style:none;display:flex;flex-wrap:wrap;gap:5px 16px;font-size:12.5px;line-height:1.3;color:#3b3b40}
  .cle li{display:flex;align-items:center;gap:6px;white-space:nowrap}
  .cle svg{flex:none;display:block}

  .ligne{display:grid;grid-template-columns:minmax(150px,210px) 1fr 84px 112px;column-gap:14px;align-items:center;padding:5px 0;border-bottom:1px solid #f0f0f0}
  .entetes{padding:0 0 5px;border-bottom:1px solid var(--filet);font-size:11.5px;line-height:1.2;color:var(--gris)}
  .num{text-align:right;font-variant-numeric:tabular-nums lining-nums;white-space:nowrap}
  .entetes .num{white-space:normal}

  .nom{display:flex;align-items:baseline;gap:7px;min-width:0;line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .nom strong{font-size:14.5px;font-weight:600}
  .pays{font-size:12px;color:var(--gris);overflow:hidden;text-overflow:ellipsis}
  .drapeau{flex:none;align-self:center;width:16px;height:12px;border-radius:1.5px;box-shadow:0 0 0 .5px rgba(0,0,0,.18);object-fit:cover}
  .dans-piste{display:none}

  /* pistes */
  .piste{position:relative;height:10px}
  .repere{position:absolute;left:0;top:0;bottom:0;background:#f1edff;width:0}
  .barre{position:absolute;left:0;top:0;bottom:0;width:0;background:#f34f4e;transition:width 1.2s cubic-bezier(.2,.8,.2,1);transition-delay:var(--d)}
  .visible .barre{width:max(3px,var(--w))}

  /* Vice City : barre pleine jusqu'à la borne basse, hachures jusqu'à la borne haute, trait à l'estimation centrale */
  .vice{padding:10px 0 9px;border-bottom:1px solid var(--filet)}
  .vice .nom strong{font-family:var(--titre);font-weight:700;font-size:19px}
  .etiquette{font-size:10.5px;font-weight:600;letter-spacing:1.6px;text-transform:uppercase;color:#d0569b}
  .vice .piste{height:22px}
  .vice-barre{position:absolute;left:0;top:0;bottom:0;width:0;overflow:hidden;transition:width 1.4s cubic-bezier(.2,.8,.2,1)}
  .visible .vice-barre{width:var(--w);overflow:visible}
  .sur{position:absolute;left:0;top:0;bottom:0;background:#8b68b0}
  .fourche{position:absolute;top:0;height:100%;display:block}
  .centre{position:absolute;top:-4px;bottom:-4px;width:0;border-left:2px solid var(--encre);transform:translateX(-1px)}
  .centre::after{content:'';position:absolute;left:-4px;top:-3px;width:6px;height:6px;border-radius:50%;background:var(--encre)}
  .vice .valeur{font-family:var(--titre);font-weight:700;font-size:19px;color:#6b4c93}
  .fourchette{grid-column:2 / -1;margin-top:4px;font-size:11.5px;color:var(--gris)}

  .valeur{font-size:14px;font-weight:600}
  .ratio{font-size:13px;font-weight:500;color:#6b4c93}

  .source{font-size:12px;line-height:1.45;color:var(--gris);border-top:1px solid var(--filet);padding-top:9px;display:flex;flex-direction:column;gap:5px}

  @media (max-width:600px){
    .bloc{gap:10px}
    .chapo{font-size:14px}
    .cle{gap:4px 12px;font-size:12px}
    .entetes{display:none}
    .ligne{grid-template-columns:1fr auto;grid-template-areas:'nom valeur' 'piste piste';column-gap:10px;row-gap:4px;padding:6px 0}
    .nom{grid-area:nom}
    .piste{grid-area:piste}
    .valeur{grid-area:valeur}
    .ratio{display:none}
    .ville .piste{height:17px}
    .dans-piste{display:block;position:absolute;left:10px;top:50%;transform:translateY(-50%);font-size:11.5px;line-height:1;color:#6b4c93;white-space:nowrap}
    .dans-piste{left:max(10px, calc(var(--w, 0%) + 8px))}
    .vice{grid-template-areas:'nom valeur' 'piste piste' 'f f'}
    .fourchette{grid-area:f;margin-top:2px}
  }
  @media (prefers-reduced-motion:reduce){ .barre,.vice-barre{transition:none} }
</style>
