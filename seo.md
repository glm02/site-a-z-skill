# SEO

## Sur chaque page

- `generateMetadata` : titre unique `<Sujet précis>, <Ville> | <Marque>`
  (≤ 60 caractères), description 140 à 160 caractères avec lieu et action,
  `alternates.canonical`.
- Un seul `h1`, hiérarchie `h2`/`h3` sans saut.
- Fil d'Ariane visible + JSON-LD `BreadcrumbList`.
- Liens internes vers les pages proches (annonce → secteur → agence).

## Données structurées (JSON-LD)

Rendre un `<script type="application/ld+json">` depuis un composant serveur.

- Accueil et contact : `LocalBusiness` (ou sous-type métier, ex.
  `RealEstateAgent`) avec nom, adresse, géo, téléphone, horaires, `sameAs`
  (Google, réseaux), `aggregateRating` **uniquement** calculé sur les avis réels affichés.
- Fiches produit ou bien : type adapté + `Offer` (prix, devise, disponibilité).
- Pages avec questions/réponses : `FAQPage`.

Valider chaque type avec le test des résultats enrichis de Google.

## Fichiers techniques

- `app/sitemap.ts` : pages statiques + contenus publiés depuis la base, `lastModified` réel.
- `app/robots.ts` : autorise tout sauf `/admin` et `/api`, pointe vers le sitemap.
- `opengraph-image.tsx` par type de page (photo + titre + info clé).

## Migration depuis un ancien site

- Lister toutes les anciennes URLs (étape 1 du skill) et écrire une redirection
  **301** pour chacune dans `next.config.ts` (`redirects()`), y compris les
  pages de taxonomie et le blog.
- Après bascule : soumettre le sitemap dans la Search Console, surveiller les
  erreurs 404 pendant un mois.

## Référencement local

- Une page par ville ou quartier servi, avec un texte réel (marché, quartiers,
  atouts) et les contenus filtrés sur cette ville. Une page par ville seulement
  si elle a un contenu propre.
- Nom, adresse, téléphone identiques au caractère près sur le site, la fiche
  Google Business Profile et les annuaires.
- Afficher les avis réels de la fiche Google avec lien vers la source.

## Performance (critère de classement)

- Pages statiques ou ISR (`revalidate`) dès que possible.
- Image principale avec `priority`, polices `next/font` avec `display: swap`.
- JavaScript client minimal : composants serveur par défaut.
