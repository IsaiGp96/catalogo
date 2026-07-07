import { useNavigate } from "react-router-dom";
import { ProductoCatalogo } from "../api/productos";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";
const PLACEHOLDER = "https://placehold.co/400x533?text=Sin+imagen";

interface ProductCardProps {
  product: ProductoCatalogo;
}

export function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();

  const imagen = product.imagenUrl
    ? `${API_URL}${product.imagenUrl}`
    : PLACEHOLDER;

  const totalVariantes = product.variantes.length;
  const enStock = product.variantes.filter(v => v.stock > 0).length;

  return (
    <div
      onClick={() => navigate(`/producto/${product.idProducto}`)}
      className="group cursor-pointer">

      {/* Imagen */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-muted">
        <img
          src={imagen}
          alt={product.nombre}
          className="h-full w-full object-cover transition-transform
                     duration-300 group-hover:scale-105"
        />
        {/* Badge stock */}
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${enStock > 0
              ? "bg-white/90 text-foreground"
              : "bg-destructive/90 text-white"
            }`}>
            {enStock > 0 ? `${enStock} variantes` : "Agotado"}
          </span>
        </div>

        {/* Overlay hover */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5
                        transition-colors duration-300 rounded-2xl
                        flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity
                           bg-white text-foreground text-sm font-semibold
                           px-4 py-2 rounded-xl shadow-lg">
            Ver opciones →
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="mt-3 space-y-1">
        <h3 className="font-semibold text-foreground line-clamp-1 group-hover:underline
                       underline-offset-2 transition-all">
          {product.nombre}
        </h3>
        {product.descripcion && (
          <p className="text-xs text-muted-foreground line-clamp-1">
            {product.descripcion}
          </p>
        )}
        <p className="text-base font-bold text-foreground">
          Desde ${product.precioBase.toFixed(2)}
        </p>
      </div>
    </div>
  );
}