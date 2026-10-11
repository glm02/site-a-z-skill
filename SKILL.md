---
name: site-a-z
description: Méthode complète pour livrer un site vitrine React (Next.js) de A à Z, avec espace admin, SEO et checklist de lancement. À charger pour une refonte ou un nouveau site client, le scraping d'un site existant, le choix ou l'adaptation de composants ObsidianUI / react-bits, une relecture visuelle avant mise en ligne, ou la vérification de lancement.
---

# Site vitrine de A à Z

Un site **éditorial** : il ressemble à une brochure imprimée de la marque, porte
ses vraies photos et ses vrais textes, et se lit d'abord sur téléphone. Chaque
étape se termine sur un critère vérifiable ; on ne passe pas à la suivante avant.

Le projet garde sa mémoire dans deux fichiers à la racine :

- `PLAN.md` : décisions, architecture, phases, questions ouvertes.
- `AGENTS.md` : boucle de travail, règles du projet, état, **journal des erreurs**.

Créer les deux dès l'étape 2 ; les relire au début de chaque session.

## Étapes

### 1. Scraper l'existant

Récupérer l'intégralité du site actuel dans `scrape/` :

- Lister toutes les URLs (sitemap, `robots.txt`, menus).
- Archiver le HTML de chaque URL ; sur WordPress, interroger aussi
  `/wp-json/wp/v2/pages` et `/wp-json/wp/v2/media?per_page=100`.
- Extraire textes, métadonnées et photos d'origine (sans suffixe `-300x200`) :
  partir de [`scripts/extract.py`](scripts/extract.py).
- Relever l'identité visuelle sur le **CSS calculé** des éléments visibles,
  pondéré par la surface, puis la confronter au logo. Les couleurs les plus
  fréquentes du HTML sont souvent celles du thème, pas de la marque.
- Noter les défauts : SEO absent, mentions légales incomplètes, contenus vides.

**Fini quand** : chaque page a son texte dans `scrape/content/`, chaque photo
est téléchargée, la palette et les polices sont écrites avec leur contraste.

### 2. Plan et points à garder

Écrire `PLAN.md` : inventaire de l'existant, points à garder (cases à cocher),
stack, direction artistique, composants, arborescence, redirections 301, SEO,
obligations légales, admin, phases, questions ouvertes. Écrire `AGENTS.md`.

**Fini quand** : le client ou Rafaël a tranché chaque **[À VALIDER]**.

### 3. Socle

Next.js (App Router) + React + TypeScript + Tailwind v4 + structure shadcn
(`src/components/ui`, alias `@/`, `src/lib/utils.ts` avec `cn`). Couleurs et
polices en variables CSS dans `globals.css`, polices via `next/font`.
Déployer tout de suite sur Vercel.

**Fini quand** : une page vide avec en-tête, pied de page et 404 est en ligne,
capturée à 390 px et 1440 px.

### 4. Direction artistique et composants

Appliquer [`references/design.md`](references/design.md) (cibles + grille de
relecture). Choisir les composants dans [`references/components.md`](references/components.md)
et les adapter à la copie.

**Fini quand** : chaque composant copié passe la grille de relecture.

### 5. Pages publiques

Une page à la fois, contenu réel issu de `scrape/content/`, réécrit pour le web.
Mobile d'abord : écrire les classes pour 390 px, puis élargir avec `sm:`/`md:`/`lg:`.

Chaque affirmation (gratuité, délai, chiffre, avis) vient du contenu scrapé
ou du client. Chaque texte alternatif s'écrit en regardant le fichier final.

**Fini quand** : la page est en ligne, capturée à 390 px et 1440 px, sans
défilement horizontal ni erreur console, Lighthouse mobile ≥ 95. Les captures
sont **regardées** : le contrôle automatique ne voit ni une mauvaise photo de
couverture ni un nombre coupé en fin de ligne.

### 6. Données, formulaires, admin

Suivre [`references/admin.md`](references/admin.md) : Supabase (schéma dédié,
RLS), formulaires validés par zod côté client et serveur, anti-spam,
notifications, espace admin utilisable au téléphone.

**Fini quand** : une demande test arrive en base et par email, et une annonce
créée depuis un téléphone apparaît sur le site.

### 7. SEO

Appliquer [`references/seo.md`](references/seo.md) : métadonnées par page,
JSON-LD, sitemap, robots, images de partage, pages locales, redirections 301.

**Fini quand** : chaque URL de l'ancien site répond en 301 vers sa nouvelle
page, et le test des résultats enrichis Google valide le JSON-LD.

### 8. Lancement

Cocher les 20 points de [`references/launch-checklist.md`](references/launch-checklist.md)
et les mentions de [`references/legal-fr.md`](references/legal-fr.md), puis
relire chaque page avec la grille de [`references/design.md`](references/design.md).

**Fini quand** : tous les points sont cochés avec leur preuve (capture, URL,
score), le domaine pointe vers Vercel et la Search Console a reçu le sitemap.

## Boucle de chaque modification

Lire `git status` et le journal de `AGENTS.md` → modifier → lint, typecheck,
build verts → captures 390 px et 1440 px pour une interface → commit en français
→ **push sur `main`** → vérifier la version en ligne → mettre à jour l'état et,
après une erreur corrigée, le journal.
