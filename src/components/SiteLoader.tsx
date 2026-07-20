import { useEffect, useState } from "react";
import heroImage from "@/assets/hero-premium.jpg";
import { googleMapsEmbedUrl } from "@/data/map";
import { realizations } from "@/data/realizations";

type SiteLoaderProps = {
  onReady: () => void;
};

const SiteLoader = ({ onReady }: SiteLoaderProps) => {
  const [imagesReady, setImagesReady] = useState(false);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    const imageSources = [heroImage, ...realizations.map((realization) => realization.image)];
    const preloadImages = imageSources.map((source) => new Promise<void>((resolve) => {
      const image = new Image();
      image.onload = () => resolve();
      image.onerror = () => resolve();
      image.src = source;
    }));

    Promise.all(preloadImages).then(() => setImagesReady(true));
  }, []);

  useEffect(() => {
    if (!imagesReady || !mapReady) return;
    const revealTimer = window.setTimeout(onReady, 250);
    return () => window.clearTimeout(revealTimer);
  }, [imagesReady, mapReady, onReady]);

  useEffect(() => {
    const fallbackTimer = window.setTimeout(onReady, 6000);
    return () => window.clearTimeout(fallbackTimer);
  }, [onReady]);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-primary-dark px-6 text-center text-white">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold/60">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-gold" />
      </div>
      <p className="font-display text-3xl font-bold">La clé de voûte</p>
      <p className="mt-3 text-sm text-white/70">Préparation de votre visite…</p>
      <iframe
        title="Préchargement de la carte"
        src={googleMapsEmbedUrl}
        onLoad={() => setMapReady(true)}
        className="pointer-events-none absolute -left-px -top-px h-px w-px opacity-0"
        loading="eager"
        tabIndex={-1}
      />
    </div>
  );
};

export default SiteLoader;
