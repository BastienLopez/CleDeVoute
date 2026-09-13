import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MentionsLegales from "./pages/MentionsLegales";
import NotFound from "./pages/NotFound";
import { LanguageProvider } from "@/lib/language";

const App = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <LanguageProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </LanguageProvider>
    </BrowserRouter>
  );
};

export default App;
