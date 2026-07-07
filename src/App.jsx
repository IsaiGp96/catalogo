import { BrowserRouter, Routes, Route, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { Navbar } from './components/navbar';
import { Hero } from './components/hero';
import { Categories } from './components/categories';
import { FeaturedProducts } from './components/featured-products';
import { SocialContact } from './components/social-contact';
import { Footer } from './components/footer';
import { OrderPanel } from './components/order-panel';
import { StickyBottomBar } from './components/sticky-bottom-bar';
import { OrderProvider } from './contexts/order-context';
import { ProductoPage } from './pages/ProductoPage';
import { CategoriaNav } from './components/categoria-nav';
import { PagoPage } from "./pages/PagoPage";

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoriaActual = searchParams.get("categoria") ?? "";
  const tituloActual = searchParams.get("titulo") ?? "";

  const [drawerAbierto, setDrawerAbierto] = useState(false);

  function handleCategoriaSelect(slug, nombre) {
    if (slug) {
      setSearchParams({ categoria: slug, titulo: nombre });
    } else {
      setSearchParams({});
    }
    setDrawerAbierto(false); // cierra el drawer al seleccionar
    document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Categories />

        <section id="catalogo" className="bg-muted/50 py-12 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8">

            {/* Título + botón categorías móvil */}
            <div className="mb-8 lg:mb-10">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                  {tituloActual || "Nuestros Productos"}
                </h2>

                {/* Botón categorías — solo móvil */}
                <button
                  onClick={() => setDrawerAbierto(true)}
                  className="lg:hidden flex items-center gap-2 px-3 py-2 text-sm
                             font-medium border border-border rounded-xl
                             bg-background hover:bg-muted transition-colors
                             flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M4 6h16M4 12h10M4 18h7" />
                  </svg>
                  {categoriaActual ? tituloActual : "Categorías"}
                </button>
              </div>

              {categoriaActual && (
                <button
                  onClick={() => handleCategoriaSelect("", "")}
                  className="mt-1 text-sm text-muted-foreground
                             hover:text-foreground transition-colors
                             flex items-center gap-1">
                  ← Ver todo el catálogo
                </button>
              )}
            </div>

            <div className="flex gap-8 items-start">

              {/* Panel categorías — desktop */}
              <aside className="hidden lg:block w-52 flex-shrink-0 sticky top-4">
                <CategoriaNav
                  categoriaActual={categoriaActual}
                  onSelect={handleCategoriaSelect}
                />
              </aside>

              {/* Grid de productos */}
              <div className="flex-1 min-w-0">
                <FeaturedProducts
                  categoria={categoriaActual}
                  tituloCategoria={tituloActual || "Todos los productos"}
                />
              </div>
            </div>
          </div>
        </section>

        <OrderPanel />
        <SocialContact />
      </main>
      <Footer />
      <StickyBottomBar />

      {/* ─── Drawer de categorías — solo móvil ─────────────────── */}
      {drawerAbierto && (
        <>
          {/* Overlay */}
          <div
            className="lg:hidden fixed inset-0 z-40 bg-black/40"
            onClick={() => setDrawerAbierto(false)}
          />

          {/* Panel desde abajo */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50
                          bg-background rounded-t-2xl shadow-2xl
                          max-h-[75vh] flex flex-col">

            {/* Handle + header */}
            <div className="flex items-center justify-between px-5 pt-4 pb-3
                            border-b border-border flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-1 rounded-full bg-muted-foreground/20
                                absolute top-3 left-1/2 -translate-x-1/2" />
                <p className="text-sm font-semibold text-foreground">Categorías</p>
              </div>
              <button
                onClick={() => setDrawerAbierto(false)}
                className="p-1.5 text-muted-foreground hover:text-foreground
                           hover:bg-muted rounded-lg transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Contenido con scroll */}
            <div className="overflow-y-auto flex-1 px-5 py-4">
              <CategoriaNav
                categoriaActual={categoriaActual}
                onSelect={handleCategoriaSelect}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <OrderProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/producto/:id" element={<ProductoPage />} />
          <Route path="/pago" element={<PagoPage />} />
        </Routes>
      </OrderProvider>
    </BrowserRouter>
  );
}