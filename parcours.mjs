/*
  Captures « comme un visiteur » : animations actives, vrai défilement, une
  capture d'écran (pas pleine page) à chaque étape. Complète captures.mjs, dont
  les captures pleine page ne montrent ni les effets liés au défilement ni
  l'empilement des cartes.
  Usage : node scripts/parcours.mjs <url-de-base> <dossier> [largeur]
*/
import { chromium } from "@playwright/test"
import { mkdirSync } from "node:fs"
import { join } from "node:path"

const base = process.argv[2] ?? "http://localhost:3000"
const sortie = process.argv[3] ?? "parcours"
const largeur = Number(process.argv[4] ?? 1440)
mkdirSync(sortie, { recursive: true })

const navigateur = await chromium.launch()
const page = await navigateur.newPage({ viewport: { width: largeur, height: largeur < 800 ? 844 : 900 } })
const erreurs = []
page.on("pageerror", (e) => erreurs.push(e.message))
await page.goto(base + "/", { waitUntil: "networkidle" })
await page.waitForTimeout(1800)
await page.screenshot({ path: join(sortie, `${largeur}-00-hero.png`) })

// Défilement par pas réguliers, capture tous les 2 écrans.
const hauteur = await page.evaluate(() => document.body.scrollHeight)
let n = 1
for (let y = 0; y < hauteur; y += 300) {
  await page.mouse.wheel(0, 300)
  await page.waitForTimeout(140)
  if (y % 1800 === 0 && y > 0) {
    await page.waitForTimeout(700)
    await page.screenshot({ path: join(sortie, `${largeur}-${String(n++).padStart(2, "0")}.png`) })
  }
}
console.log(`${n} captures, ${erreurs.length ? `erreurs : ${erreurs.join(" | ")}` : "aucune erreur"}`)
await navigateur.close()
