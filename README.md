# site-a-z — livrer un site vitrine Next.js de A à Z

Une **skill** pour agent IA (Claude Code, Codex…) : la méthode que j'applique pour
livrer un site vitrine, de la récupération de l'ancien site jusqu'à la mise en ligne
vérifiée. L'agent la charge seul dès qu'on lui demande une refonte ou un nouveau site.

Un site **éditorial** : il ressemble à une brochure imprimée de la marque, porte ses
vraies photos et ses vrais textes, et se lit d'abord sur téléphone. Chaque étape se
termine sur un critère vérifiable ; on ne passe pas à la suivante avant.

## Les étapes

1. **Scraper l'existant** : toutes les pages, textes, photos d'origine, palette et polices relevées sur le CSS réel.
2. **Plan** : `PLAN.md` (décisions, arborescence, redirections, SEO, questions à trancher) et `AGENTS.md` (règles, journal des erreurs).
3. **Socle** : Next.js, TypeScript, Tailwind v4, structure shadcn/ui.
4. **Direction artistique et composants** : couleurs, typographie, mouvement ; composants récupérés et adaptés plutôt que générés.
5. **Pages publiques**, construites et relues sur téléphone puis sur ordinateur.
6. **Données, formulaires, admin.**
7. **SEO** : métadonnées, JSON-LD, sitemap, redirections depuis l'ancien site.
8. **Lancement** : la checklist, puis la vérification en ligne.

## Contenu

| Fichier | Rôle |
|---|---|
| [`SKILL.md`](SKILL.md) | La procédure, étape par étape, avec le critère « fini quand » de chacune |
| [`design.md`](design.md) | Direction artistique : couleur, typographie, formes, composition, icônes, mouvement |
| [`components.md`](components.md) | Récupérer, choisir et adapter les composants (react-bits, Bklit UI…) |
| [`seo.md`](seo.md) | Chaque page, JSON-LD, fichiers techniques, migration, référencement local, performance |
| [`legal-fr.md`](legal-fr.md) | Obligations légales d'un site professionnel français |
| [`launch-checklist.md`](launch-checklist.md) | Ce qui doit être vrai avant d'annoncer « c'est en ligne » |
| [`parcours.mjs`](parcours.mjs) | Captures Playwright « comme un visiteur » : vrai défilement, animations actives, une capture par étape |

## Installer

Le dossier de la skill doit s'appeler `site-a-z` :

```bash
# Claude Code (tous les projets)
git clone https://github.com/glm02/site-a-z-skill.git ~/.claude/skills/site-a-z

# Codex (tous les projets)
git clone https://github.com/glm02/site-a-z-skill.git ~/.agents/skills/site-a-z
```

Relancer l'agent, puis demander « refais le site de… » ou appeler `/site-a-z`.
Pour l'application Claude (claude.ai) : compresser le dossier `site-a-z` en zip et
l'importer dans les paramètres, rubrique Skills.

Tuto illustré pour tous les agents : [rafaelgmille.site/stack#installer](https://www.rafaelgmille.site/stack#installer).

## Version à jour

Cette skill vit aussi dans [skills-claude-code](https://github.com/glm02/skills-claude-code/tree/main/skills/site-a-z),
avec ses scripts d'extraction et mes 39 autres skills. C'est là qu'elle évolue en premier.

---

Étudiant en BUT GEII, sites et agents IA chez [RGM Dev](https://www.rgm-dev.site) ·
[portfolio](https://www.rafaelgmille.site)
