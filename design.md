# Direction artistique

Deux parties : les **cibles** guident la conception ; la **grille de relecture**
sert uniquement à contrôler une page terminée.

Le but est un site **qui coupe le souffle** tout en restant honnête : photos
réelles en plein écran, composants Efferd / spell-ui / ObsidianUI / react-bits
bien visibles, typographie très grande, mouvement qui accompagne la lecture.
La sobriété n'est pas un objectif en soi : une première version trop sage a
été refusée par Rafaël.

## Cibles

**Couleur**

- Fond cassé tiré de la marque (papier, crème, sable), jamais `#FFFFFF`.
- Un seul accent, pris dans le logo, réservé aux actions (boutons, liens).
- Neutres chauds pour le texte et les filets. Contraste texte ≥ 4,5:1, à
  vérifier par calcul et noter dans `PLAN.md`.
- Aplats uniquement ; un voile sombre uniforme sur une photo si un texte s'y pose.
- La couleur vive vient des photos, pas de l'interface.

**Typographie**

- Polices de la marque, ou un couple choisi pour son caractère (une serif de
  titrage + une sans de lecture), chargé par `next/font`.
- Titres avec `text-balance`, paragraphes ≤ 70 caractères par ligne.
- Ponctuation de la langue du site. En français : guillemets « », espace
  insécable avant `: ; ! ?`, virgule ou deux-points là où l'anglais mettrait
  un tiret cadratin.

**Formes et surfaces**

- Rayon `0` à `2px`. Séparations par filets de 1 px et par l'espace ; la
  grille Efferd (filets verticaux, croix d'angle, séparateurs pleine largeur)
  donne une structure « plan d'architecte ».
- Surfaces opaques ; la profondeur vient des photos, des voiles sombres sur
  photo et de l'empilement (ScrollStack), pas d'ombres décoratives.

**Composition**

- Mise en page éditoriale : colonnes asymétriques, alternance texte/photo,
  listes numérotées, sommaires. Une liste de services se lit comme une table
  des matières.
- Une page = un CTA principal clairement identifié.
- Photos réelles du client en grand format ; démonstration du vrai produit.

**Icônes**

- Phosphor Icons, graisse `light`, uniquement quand une icône aide à agir
  (téléphone, menu, fermer, filtres). Sinon, un mot.

**Mouvement**

- Hero : titre mot par mot, surlignage, défilement fluide (Lenis).
- Défilement : apparition en CSS (`animation-timeline: view()`), cartes qui
  s'empilent, bandeau qui défile, signature qui s'écrit.
- Survol : zoom lent de la photo, vignette qui suit la souris, soulignement
  qui se dessine.
- Tout se coupe avec `prefers-reduced-motion` ; le contenu reste lisible sans
  JavaScript (sauf le titre du hero).
- Chargement : `Skeleton` à la forme exacte du contenu attendu.

**Rédaction**

- Phrases affirmatives et concrètes : un fait, un chiffre, un lieu.
- Avis clients réels, avec auteur, date, source et lien ; sinon pas de section avis.

## Grille de relecture

Avant chaque mise en ligne, parcourir chaque page et cocher l'absence de
chacun de ces 30 signaux de site « vibe-codé ». Un signal présent = corriger
avec la cible correspondante ci-dessus. Un choix explicite de Rafaël ou du
client (ex. une police de la liste) prime sur la grille : il est noté comme
exception dans `PLAN.md` et n'est plus signalé.

1. Dégradés criards
2. Icônes Lucide
3. Fond blanc pur
4. Couleurs arc-en-ciel
5. Ombres portées
6. Trois cartes de fonctionnalités alignées
7. Emojis
8. Effet verre liquide (glassmorphism)
9. Tirets cadratins
10. Inter, Geist ou Space Grotesk
11. Bande colorée à gauche d'un bloc
12. Faux témoignages
13. Grilles bento
14. Fenêtre de terminal décorative
15. Formule « ce n'est pas X, c'est Y »
16. Puces en coche
17. Trois formules tarifaires
18. Aucune démonstration réelle du produit
19. Coins très arrondis
20. Violet et noir
21. Pas de squelettes de chargement
22. Orbes radiales floues
23. Grilles de points en fond
24. Icônes étincelles
25. Flèches animées
26. Pas de CGU
27. Pas de politique de confidentialité
28. Animations au survol
29. Couleurs néon
30. Pastels basiques
