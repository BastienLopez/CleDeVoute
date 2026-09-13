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

type LocalizedText = {
  fr: string;
  en: string;
};

export type RealizationDetails = {
  summary: LocalizedText;
  visibleWork: LocalizedText;
  duration?: LocalizedText;
  cost?: LocalizedText;
  satisfaction?: number;
};

export const realizations: Array<{
  id: string;
  category: RealizationCategory;
  title: string;
  titleEn: string;
  image: string;
  width: number;
  height: number;
  details: RealizationDetails;
}> = [
  {
    id: "terrasse-dallage-ensemble",
    category: "terrasses",
    title: "Terrasse et dallage extérieur",
    titleEn: "Outdoor terrace and paving",
    image: terraceOverview,
    width: 800,
    height: 600,
    details: {
      summary: { fr: "Une composition de dallage extérieur avec un motif central visible.", en: "An outdoor paving composition with a visible central pattern." },
      visibleWork: { fr: "Dallage extérieur", en: "Outdoor paving" },
    },
  },
  {
    id: "salle-pierre-renovee",
    category: "pierre",
    title: "Salle en pierre rénovée",
    titleEn: "Renovated stone room",
    image: stoneRoom,
    width: 800,
    height: 600,
    details: {
      summary: { fr: "Une pièce intérieure rénovée autour de murs en pierre apparente.", en: "An interior room renovated around exposed stone walls." },
      visibleWork: { fr: "Pierre apparente intérieure", en: "Exposed interior stone" },
    },
  },
  {
    id: "escalier-exterieur-fini",
    category: "acces",
    title: "Escalier extérieur",
    titleEn: "Outdoor staircase",
    image: outdoorStaircase,
    width: 800,
    height: 600,
    details: {
      summary: { fr: "Un escalier et des paliers en pierre pour structurer un accès extérieur.", en: "A stone staircase and landings structuring an outdoor access." },
      visibleWork: { fr: "Escalier et accès extérieur en pierre", en: "Stone staircase and outdoor access" },
    },
  },
  {
    id: "mur-pierre-interieur",
    category: "pierre",
    title: "Mur en pierre intérieur",
    titleEn: "Indoor stone wall",
    image: stoneWall,
    width: 800,
    height: 600,
    details: {
      summary: { fr: "Un mur intérieur en pierre apparente intégré à une pièce rénovée.", en: "An exposed interior stone wall integrated into a renovated room." },
      visibleWork: { fr: "Mur intérieur en pierre", en: "Interior stone wall" },
    },
  },
  {
    id: "terrasse-dallage-detail",
    category: "terrasses",
    title: "Détail de dallage extérieur",
    titleEn: "Outdoor paving detail",
    image: terraceDetail,
    width: 800,
    height: 600,
    details: {
      summary: { fr: "Un détail de pose qui montre les lignes et les formats du dallage extérieur.", en: "A close-up showing the lines and formats of the outdoor paving." },
      visibleWork: { fr: "Détail de pose du dallage", en: "Paving installation detail" },
    },
  },
  {
    id: "terrasse-motif-etoile",
    category: "terrasses",
    title: "Motif étoile dans le dallage",
    titleEn: "Star pattern in paving",
    image: starPaving,
    width: 800,
    height: 600,
    details: {
      summary: { fr: "Un motif en étoile intégré au dallage extérieur.", en: "A star pattern integrated into the outdoor paving." },
      visibleWork: { fr: "Motif décoratif dans le dallage", en: "Decorative paving pattern" },
    },
  },
  {
    id: "acces-exterieur-pierre",
    category: "acces",
    title: "Accès extérieur en pierre",
    titleEn: "Outdoor stone access",
    image: stonePath,
    width: 800,
    height: 600,
    details: {
      summary: { fr: "Un cheminement extérieur en pierre entre l’entrée et le jardin.", en: "A stone outdoor path connecting the entrance and the garden." },
      visibleWork: { fr: "Cheminement extérieur en pierre", en: "Outdoor stone path" },
    },
  },
  {
    id: "piece-renovee-pierre",
    category: "pierre",
    title: "Pièce rénovée en pierre",
    titleEn: "Renovated stone interior",
    image: renovatedRoom,
    width: 800,
    height: 600,
    details: {
      summary: { fr: "Une pièce intérieure où la pierre apparente donne son caractère au volume.", en: "An interior room where exposed stone gives the space its character." },
      visibleWork: { fr: "Rénovation intérieure en pierre", en: "Interior stone renovation" },
    },
  },
  {
    id: "voute-briques-apparentes",
    category: "pierre",
    title: "Voûte et briques apparentes",
    titleEn: "Vault with exposed bricks",
    image: brickVault,
    width: 576,
    height: 768,
    details: {
      summary: { fr: "Une voûte intérieure avec briques apparentes et maçonnerie décorative.", en: "An interior vault with exposed bricks and decorative masonry." },
      visibleWork: { fr: "Voûte et briques apparentes", en: "Vault and exposed bricks" },
    },
  },
];
