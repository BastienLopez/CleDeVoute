import terraceOverview from "@/assets/realisations/terrasse-dallage-ensemble.jpg";
import stoneRoom from "@/assets/realisations/salle-pierre-renovee.jpg";
import outdoorStaircase from "@/assets/realisations/escalier-exterieur-fini.jpg";
import stoneWall from "@/assets/realisations/mur-pierre-interieur.jpg";
import terraceDetail from "@/assets/realisations/terrasse-dallage-detail.jpg";
import starPaving from "@/assets/realisations/terrasse-motif-etoile.jpg";
import stonePath from "@/assets/realisations/acces-exterieur-pierre.jpg";
import renovatedRoom from "@/assets/realisations/piece-renovee-pierre.jpg";
import brickVault from "@/assets/realisations/voute-briques-apparentes.jpg";

export type RealizationCategory = "terrasses" | "acces" | "pierre";

export const realizations: Array<{
  id: string;
  category: RealizationCategory;
  title: string;
  titleEn: string;
  image: string;
}> = [
  { id: "terrasse-dallage-ensemble", category: "terrasses", title: "Terrasse et dallage extérieur", titleEn: "Outdoor terrace and paving", image: terraceOverview },
  { id: "salle-pierre-renovee", category: "pierre", title: "Salle en pierre rénovée", titleEn: "Renovated stone room", image: stoneRoom },
  { id: "escalier-exterieur-fini", category: "acces", title: "Escalier extérieur", titleEn: "Outdoor staircase", image: outdoorStaircase },
  { id: "mur-pierre-interieur", category: "pierre", title: "Mur en pierre intérieur", titleEn: "Indoor stone wall", image: stoneWall },
  { id: "terrasse-dallage-detail", category: "terrasses", title: "Détail de dallage extérieur", titleEn: "Outdoor paving detail", image: terraceDetail },
  { id: "terrasse-motif-etoile", category: "terrasses", title: "Motif étoile dans le dallage", titleEn: "Star pattern in paving", image: starPaving },
  { id: "acces-exterieur-pierre", category: "acces", title: "Accès extérieur en pierre", titleEn: "Outdoor stone access", image: stonePath },
  { id: "piece-renovee-pierre", category: "pierre", title: "Pièce rénovée en pierre", titleEn: "Renovated stone interior", image: renovatedRoom },
  { id: "voute-briques-apparentes", category: "pierre", title: "Voûte et briques apparentes", titleEn: "Vault with exposed bricks", image: brickVault },
];
