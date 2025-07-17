import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import MainLayout from "./components/layout/MainLayout";

const HomePage = lazy(() => import("./pages/HomePage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const GalleryPage = lazy(() => import("./pages/GalleryPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const ColorPalettePage = lazy(() => import("./pages/ColorPalettePage"));

// Component to handle scroll to top on route change
const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });
    });
  }, [location.pathname]);

  return null; // This component doesn't render anything
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <MainLayout>
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div></div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/colors" element={<ColorPalettePage />} />
          </Routes>
        </Suspense>
      </MainLayout>
    </Router>
  );
}

export default App;
