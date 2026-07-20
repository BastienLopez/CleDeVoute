import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MentionsLegales from "./pages/MentionsLegales";
import NotFound from "./pages/NotFound";
import { LanguageProvider } from "@/lib/language";
import SiteLoader from "@/components/SiteLoader";
import { useState } from "react";

const queryClient = new QueryClient();

const App = () => {
  const [isReady, setIsReady] = useState(false);

  return (
    <LanguageProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {isReady ? (
            <BrowserRouter basename={import.meta.env.BASE_URL}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/mentions-legales" element={<MentionsLegales />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          ) : (
            <SiteLoader onReady={() => setIsReady(true)} />
          )}
        </TooltipProvider>
      </QueryClientProvider>
    </LanguageProvider>
  );
};

export default App;
