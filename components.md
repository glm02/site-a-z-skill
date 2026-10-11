# Composants

Sources autorisées : **Efferd** (blocs de sections, registre shadcn
`@efferd`), **spell-ui** (texte et boutons animés), **ObsidianUI**,
**react-bits** et **Bklit UI** (graphiques uniquement, pour un tableau de bord
ou un admin), plus un composant fourni explicitement par Rafaël (ex. hero-10
de 21st.dev). Rafaël veut que ces composants **se voient** : un site qui n'en
utilise que les primitives est jugé raté. Pour le reste, écrire le
composant soi-même avec les primitives ObsidianUI.

## Récupérer le code

- ObsidianUI (Next 16, React 19, Tailwind v4, shadcn) :
  `git clone --depth 1 https://github.com/Atharvsinh-codez/ObsidianUI.git`
  - Primitives shadcn : `src/components/ui/` (button, input, select, form,
    field, tabs, toggle-group, sheet, drawer, dialog, carousel, breadcrumb,
    pagination, badge, skeleton, spinner, sonner, slider, table, sidebar,
    dropdown-menu, alert, empty…).
  - Blocs : `src/components/block/` (footer, 404, file-input, split-showcase,
    flip-text, draggable-marquee, smooth-scroll, hover-img, v-prism…).
  - Installation unitaire possible : `npx shadcn@latest add "https://www.obsidianui.dev/r/<nom>.json"`.
  - Le dossier `skills/` du dépôt contient des guides utiles (better-typography,
    better-accessibility, better-colors) à consulter pour une question précise.
- react-bits : `git clone --depth 1 https://github.com/DavidHDev/react-bits.git`
  - Prendre **uniquement** `src/ts-tailwind/<Catégorie>/<Nom>/` (TypeScript + Tailwind).
  - Catégories : `Components`, `TextAnimations`, `Animations`, `Backgrounds`, `Micro`.

- Bklit UI : registre shadcn `@bklit`, charger le skill `bklit-ui` avant
  toute installation. Rien à en tirer pour un site sans données chiffrées.
- Efferd : `components.json` → `"registries": { "@efferd": "https://efferd.com/r/{style}/{name}.json" }`.
  Index : `https://efferd.com/r/registry.json` (header, hero, features, cta,
  contact, faqs, team, footer, not-found, image-gallery + utilitaires
  `decor-icon`, `full-width-divider`, `progressive-blur`, `outline-text`,
  `lazy-image`, `portal`). Certains blocs sont payants (JSON vide).
  Les blocs contiennent des icônes génériques converties par la CLI vers la
  bibliothèque de `components.json` : passer par la CLI, dans une **copie vide
  du projet** pour qu'elle n'écrase rien, puis rapatrier les nouveaux fichiers.
- spell-ui : `git clone --depth 1 https://github.com/xxtomm/spell-ui.git`,
  sources dans `registry/spell-ui/` (words-stagger, highlighted-text,
  marquee, signature, flow-button, tilt-card, label-input…).
- @shadcn/lint (`npm i -D @shadcn/lint`) : suivre son SETUP.md, enregistrer
  le plugin sans activer de règle ; le choix des règles revient à Rafaël.

Cloner dans le dossier temporaire de la session, jamais dans le projet.

## Choisir

Un composant est retenu s'il sert une tâche de l'utilisateur et passe la grille
de [`design.md`](design.md) une fois adapté. Candidats sobres déjà repérés :

| Besoin | Composant |
|---|---|
| Formulaire en étapes | react-bits `Components/Stepper` (motion) |
| Titre qui apparaît | react-bits `TextAnimations/BlurText` (motion) |
| Chiffres clés | react-bits `TextAnimations/CountUp` (motion) |
| Galerie en colonnes | react-bits `Components/Masonry` (GSAP) |
| Galerie glissable | ObsidianUI `ui/carousel` (Embla) |
| Envoi de fichiers | ObsidianUI `block/file-input` |
| Pied de page, 404 | ObsidianUI `block/footer`, `block/404` |
| Menu mobile | ObsidianUI `ui/sheet` |

Le reste de react-bits (fonds animés, curseurs, cartes inclinables, effets
verre) sert rarement un site éditorial : le prendre seulement si la marque le
demande et que la grille passe.

Un seul moteur d'animation par projet : **motion** de préférence. Un composant
qui exige GSAP se remplace par un équivalent motion ou CSS, sauf accord explicite.

## Adapter à la copie

Pour chaque fichier copié dans `src/components/ui/` :

1. Remplacer les imports `lucide-react`, `react-icons`, `@hugeicons/*` par un
   module unique `@/components/icons` qui réexporte Phosphor (`/ssr`) en
   graisse `light` sous les noms attendus : une ligne changée par fichier copié.
2. Rayons → `rounded-[2px]` ou `rounded-none` ; supprimer `shadow-*`,
   `backdrop-blur`, dégradés.
3. Couleurs en dur → variables du thème (`bg-background`, `text-primary`…).
4. Survols avec déplacement (`hover:scale`, `hover:-translate`) → changement
   de couleur ou soulignement.
5. Vérifier `prefers-reduced-motion` (`useReducedMotion` avec motion).
6. Remplacer les textes et images de démonstration par le contenu réel.
7. `'use client'` seulement si le composant a de l'état ou des animations ;
   la page qui l'utilise reste un composant serveur.
8. Rien de masqué au premier rendu : un `initial={{ opacity: 0 }}` de motion est
   rendu tel quel par le serveur, le contenu reste invisible jusqu'au
   JavaScript (LCP retardé, page vide sans JS). Apparition au défilement en CSS
   (`animation-timeline: view()` sous `@supports`) ; motion pour les
   interactions seulement.
9. Libellés pour lecteurs d'écran traduits (`Close`, `Next slide`…), zones
   tactiles ≥ 44 px (boutons `h-11`).
10. HTML valide : un séparateur de fil d'Ariane est un `<li>` frère, jamais
    imbriqué ; un composant texte animé placé dans un titre rend des `<span>`.
    Une erreur React n°418 se cherche d'abord dans l'imbrication.
11. Même arbre côté serveur et navigateur : rien ne se rend ou ne disparaît
    selon `useReducedMotion()` ; la préférence se traite en CSS.
12. `styled-jsx` (`<style jsx>`) ne s'affiche qu'après le JavaScript dans
    l'App Router : déplacer ces keyframes dans `globals.css`.
13. Une seule instance Lenis par page : retirer celle des composants qui en
    créent une (ScrollStack) et écouter l'événement `scroll`.
14. Polices fournies en exemple (ex. signature spell-ui) : remplacer par une
    police sous licence OFL (dépôt google/fonts) avec son fichier de licence.

## Intégrer un composant fourni (ex. hero-10)

1. Vérifier la structure shadcn : `components.json`, alias `@/`, `src/lib/utils.ts`.
   Sans elle : `npx shadcn@latest init`. Le dossier `components/ui` est celui
   que la CLI shadcn et tous les composants copiés supposent : le garder.
2. Copier le composant et ses dépendances locales (ex. `hero-10-utils/cta.tsx`
   doit être écrit s'il n'est pas fourni : il rend un `Button` ou un lien
   selon `ctaEnabled`, `text`, `link`, `variant`, `size`).
3. Installer les paquets listés (`motion`, `react-wrap-balancer`,
   `@radix-ui/react-slot`, `class-variance-authority`).
4. Appliquer « Adapter à la copie ».
5. Images : photos réelles du client, optimisées, avec `alt` descriptif ;
   Unsplash seulement en attendant les vraies.
