# Checklist de lancement

Chaque point se coche avec sa **preuve** (URL, capture, score, sortie de
commande) notée dans `PLAN.md`.

| # | Point | Comment, en Next.js sur Vercel | Preuve |
|---|---|---|---|
| 1 | Politique de confidentialité | Page `/confidentialite` : responsable, finalités, durées, droits, contact, sous-traitants (Vercel, Supabase, Resend) | URL |
| 2 | CGU | Page `/cgu` | URL |
| 3 | Aucun secret côté client | `grep -rE "service_role\|sk_live\|SECRET" .next/static` vide ; seules les `NEXT_PUBLIC_*` publiques côté client | Sortie vide |
| 4 | HTTPS forcé | Domaine Vercel + `Strict-Transport-Security` dans `next.config.ts` `headers()` ; `http://` redirige | `curl -I http://…` → 308 |
| 5 | Bandeau cookies | Seulement si des traceurs non exemptés (Google Maps, YouTube, pixels). Boutons « Accepter » et « Refuser » de même poids ; rien chargé avant accord | Capture |
| 6 | Titres et descriptions | `generateMetadata` sur chaque page, uniques | Liste des titres |
| 7 | Image de partage | `opengraph-image.tsx` (1200×630) global et par fiche | Aperçu dans un débogueur OG |
| 8 | Favicon | `app/icon.png`, `app/apple-icon.png` | Capture de l'onglet |
| 9 | Sitemap et robots | `app/sitemap.ts`, `app/robots.ts` (bloque `/admin`) | URL |
| 10 | Texte alt des images | `alt` obligatoire dans l'admin ; décoratives `alt=""` | Audit Lighthouse |
| 11 | Compression des images | `next/image`, WebP/AVIF, `sizes` renseigné, originaux ≤ 2000 px | Poids des pages |
| 12 | Vitesse | Lighthouse mobile ≥ 95, LCP < 2,5 s | Rapport |
| 13 | Contraste | Texte ≥ 4,5:1, gros texte ≥ 3:1 | Calcul ou audit |
| 14 | Mobile | Captures 360, 390 et 768 px, aucun défilement horizontal, zones tactiles ≥ 44 px | Captures |
| 15 | Page 404 | `app/not-found.tsx` avec liens utiles | URL inexistante |
| 16 | Liens cassés | Crawl du site en production (ex. `npx linkinator https://…`) | Sortie sans erreur |
| 17 | Validation des formulaires | Schéma zod partagé client/serveur, messages en français | Test d'envoi invalide |
| 18 | Anti-spam | Honeypot + Turnstile vérifié côté serveur + limite de débit | Test d'envoi sans jeton refusé |
| 19 | Mesure d'audience | Vercel Analytics (sans cookie) | Tableau de bord |
| 20 | Un CTA principal par page | Relecture page par page | Liste page → CTA |
