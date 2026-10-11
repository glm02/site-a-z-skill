/*
  Captures de contrôle avant chaque mise en ligne (AGENTS.md, étape 3).
  Usage : node scripts/captures.mjs <url-de-base> <dossier-de-sortie>
  Pour chaque page, à 390 px (téléphone) et 1440 px (ordinateur) :
  - capture pleine page, animations réduites pour que tout soit visible ;
  - contrôle du débordement horizontal (cause n° 1 des pages cassées sur mobile) ;
  - relevé des erreurs de la console.
  Code de sortie 1 si un contrôle échoue.
*/
import { chromium } from "@playwright/test"
import { mkdirSync } from "node:fs"
import { join } from "node:path"

const base = process.argv[2] ?? "http://localhost:3000"
const sortie = process.argv[3] ?? "captures"
const pages = (process.argv[4] ?? "/,/vente,/locations,/annonces/maison-t4-le-baguier,/annonces/appartement-t3-la-ciotat-clos-des-plages,/estimation,/gestion,/equipe,/contact,/references,/honoraires,/mentions-legales,/page-inexistante").split(",")
const largeurs = [390, 1440]

mkdirSync(sortie, { recursive: true })
const navigateur = await chromium.launch()
let echecs = 0

for (const largeur of largeurs) {
  const contexte = await navigateur.newContext({
    viewport: { width: largeur, height: largeur < 800 ? 844 : 900 },
    // ANIMATIONS=1 : captures avec les animations actives (sinon réduites, tout est visible d’emblée).
    reducedMotion: process.env.ANIMATIONS === "1" ? "no-preference" : "reduce",
    locale: "fr-FR",
  })
  for (const chemin of pages) {
    const page = await contexte.newPage()
    const erreurs = []
    // La page inexistante renvoie volontairement un 404 : ce n’est pas une erreur.
    page.on("console", (m) => m.type() === "error" && !m.text().includes("status of 404") && erreurs.push(m.text()))
    page.on("pageerror", (e) => erreurs.push(e.message))
    await page.goto(base + chemin, { waitUntil: "networkidle" })
    // Défilement complet : next/image ne charge les photos qu'à l'approche de l'écran.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y)
        await new Promise((r) => setTimeout(r, 120))
      }
      window.scrollTo(0, 0)
    })
    await page.waitForLoadState("networkidle")
    const deborde = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    const nom = `${(chemin.replace(/\//g, "_") || "_").replace(/^_/, "") || "accueil"}-${largeur}.png`
    await page.screenshot({ path: join(sortie, nom), fullPage: true })
    const ok = deborde <= 0 && erreurs.length === 0
    if (!ok) echecs++
    console.log(`${ok ? "OK " : "KO "} ${largeur}px ${chemin}${deborde > 0 ? ` déborde de ${deborde}px` : ""}${erreurs.length ? ` erreurs: ${erreurs.join(" | ")}` : ""}`)
    await page.close()
  }
  await contexte.close()
}
await navigateur.close()
process.exit(echecs ? 1 : 0)
