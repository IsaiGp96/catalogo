import { useState } from "react";
import { ProductCard } from "./product-card";
import { useCatalogo } from "../hooks/use-catalogo";
import { agruparCatalogo, ProductoCatalogo } from "../api/productos";

interface Props {
  categoria?: string;
  tituloCategoria?: string;
}

function filtrarProductos(productos: ProductoCatalogo[], busqueda: string): ProductoCatalogo[] {
  if (!busqueda.trim()) return productos;
  const q = busqueda.toLowerCase();
  return productos.filter(p =>
    p.nombre.toLowerCase().includes(q) ||
    (p.descripcion?.toLowerCase().includes(q) ?? false) ||
    p.variantes.some(v =>
      Object.values(v.atributos ?? {}).join(" ").toLowerCase().includes(q)
    )
  );
}

export function FeaturedProducts({ categoria = "", tituloCategoria }: Props) {
  const { productos, loading, error } = useCatalogo(categoria);
  const [busqueda, setBusqueda] = useState("");

  const productosAgrupados = agruparCatalogo(productos);
  const productosFiltrados  = filtrarProductos(productosAgrupados, busqueda);

  if (loading) return (
    <div className="flex justify-center py-20">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent
                      rounded-full animate-spin" />
    </div>
  );

  if (error) return (
    <div className="text-center py-20">
      <p className="text-muted-foreground">No se pudo cargar el catálogo.</p>
    </div>
  );

  return (
    <div className="space-y-6">

      {/* Buscador */}
      <div className="relative">
        <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4
                        text-muted-foreground pointer-events-none"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
          placeholder="Buscar por nombre, color, talla..."
          className="w-full pl-10 pr-10 py-2.5 text-sm bg-background border
                     border-border rounded-xl focus:outline-none focus:ring-2
                     focus:ring-foreground/20 transition-all"
        />
        {busqueda && (
          <button
            onClick={() => setBusqueda("")}
            className="absolute right-3 top-1/2 -translate-y-1/2
                       text-muted-foreground hover:text-foreground transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Resultado */}
      {productosFiltrados.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-sm">
            {busqueda
              ? `Sin resultados para "${busqueda}"`
              : "No hay productos disponibles en esta categoría."}
          </p>
          {busqueda && (
            <button onClick={() => setBusqueda("")}
              className="mt-2 text-sm text-foreground underline underline-offset-2
                         hover:opacity-70 transition-opacity">
              Limpiar búsqueda
            </button>
          )}
        </div>
      ) : (
        <>
          {busqueda && (
            <p className="text-xs text-muted-foreground">
              {productosFiltrados.length} resultado{productosFiltrados.length !== 1 ? "s" : ""}
              {" "}para "{busqueda}"
            </p>
          )}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {productosFiltrados.map(product => (
              <ProductCard key={product.idProducto} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}