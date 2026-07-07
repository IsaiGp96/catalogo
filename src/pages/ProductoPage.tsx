import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Check, ShoppingBag } from "lucide-react";
import { Button } from "../components/ui/button";
import { useOrder } from "../contexts/order-context";
import { fetchCatalogo, agruparCatalogo, ProductoCatalogo, VarianteCatalogo } from "../api/productos";

const API_URL = import.meta.env.VITE_API_URL = "http://localhost:8080";
const PLACEHOLDER = "https://placehold.co/400x533?text=Sin+imagen";

export function ProductoPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addItem, items } = useOrder();

    const [producto, setProducto] = useState<ProductoCatalogo | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [varianteSeleccionada, setVarianteSeleccionada] = useState<VarianteCatalogo | null>(null);
    const [justAdded, setJustAdded] = useState(false);
    const [errorAdd, setErrorAdd] = useState("");

    useEffect(() => {
        fetchCatalogo()
            .then(items => {
                const agrupados = agruparCatalogo(items);
                const found = agrupados.find(p => p.idProducto === Number(id));
                if (!found) { setError("Producto no encontrado"); return; }
                setProducto(found);
                // Pre-seleccionar primera variante con stock
                const primera = found.variantes.find(v => v.stock > 0);
                if (primera) setVarianteSeleccionada(primera);
            })
            .catch(e => setError(e.message))
            .finally(() => setLoading(false));
    }, [id]);

    function handleAgregar() {
        if (!varianteSeleccionada || !producto) return;
        if (varianteSeleccionada.stock === 0) {
            setErrorAdd("Sin stock disponible");
            return;
        }

        const attrsLabel = Object.entries(varianteSeleccionada.atributos)
            .map(([, v]) => v).join(" / ");

        addItem({
            id: varianteSeleccionada.idVariante,
            name: `${producto.nombre} — ${attrsLabel}`,
            price: varianteSeleccionada.precioVenta,
            image: varianteSeleccionada.imagenUrl
                ? `${API_URL}${varianteSeleccionada.imagenUrl}`
                : (producto.imagenUrl ? `${API_URL}${producto.imagenUrl}` : PLACEHOLDER),
            sku: varianteSeleccionada.sku,
        });

        setJustAdded(true);
        setErrorAdd("");
        setTimeout(() => setJustAdded(false), 1500);
    }

    const isInOrder = varianteSeleccionada
        ? items.some(i => i.id === varianteSeleccionada.idVariante)
        : false;

    if (loading) return (
        <div className="flex justify-center py-32">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent
                      rounded-full animate-spin" />
        </div>
    );

    if (error || !producto) return (
        <div className="flex flex-col items-center py-32 gap-4">
            <p className="text-muted-foreground">{error || "Producto no encontrado"}</p>
            <Button variant="outline" onClick={() => navigate("/")}>
                Volver al catálogo
            </Button>
        </div>
    );

    const imagen = varianteSeleccionada?.imagenUrl
        ? `${API_URL}${varianteSeleccionada.imagenUrl}`
        : producto.imagenUrl
            ? `${API_URL}${producto.imagenUrl}`
            : PLACEHOLDER;

    return (
        <div className="min-h-screen bg-background">

            {/* Header */}
            <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b
                      border-border px-4 py-3">
                <div className="container mx-auto flex items-center gap-3">
                    <button onClick={() => navigate(-1)}
                        className="p-2 rounded-xl hover:bg-muted transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground">{producto.tipo}</p>
                        <h1 className="font-semibold text-foreground truncate">
                            {producto.nombre}
                        </h1>
                    </div>
                    {items.length > 0 && (
                        <button onClick={() => navigate("/#pedido")}
                            className="relative p-2 rounded-xl hover:bg-muted transition-colors">
                            <ShoppingBag className="w-5 h-5" />
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary
                               text-primary-foreground text-xs font-bold rounded-full
                               flex items-center justify-center">
                                {items.length}
                            </span>
                        </button>
                    )}
                </div>
            </div>

            <div className="container mx-auto px-4 py-6 lg:py-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

                    {/* Imagen */}
                    <div className="aspect-[3/4] max-h-[500px] lg:max-h-none overflow-hidden
                          rounded-2xl bg-muted">
                        <img src={imagen} alt={producto.nombre}
                            className="w-full h-full object-cover" />
                    </div>

                    {/* Info + selección */}
                    <div className="space-y-6">
                        <div>
                            <p className="text-sm text-muted-foreground mb-1">{producto.tipo}</p>
                            <h1 className="text-2xl font-bold text-foreground">{producto.nombre}</h1>
                            {producto.descripcion && (
                                <p className="text-muted-foreground mt-2">{producto.descripcion}</p>
                            )}
                        </div>

                        {/* Precio */}
                        <p className="text-3xl font-bold text-foreground">
                            ${(varianteSeleccionada?.precioVenta ?? producto.precioBase).toFixed(2)}
                        </p>

                        {/* Selector de variantes */}
                        <div className="space-y-3">
                            <p className="text-sm font-medium text-foreground">
                                Selecciona una opción
                                {varianteSeleccionada && (
                                    <span className="ml-2 text-muted-foreground font-normal">
                                        — {Object.entries(varianteSeleccionada.atributos)
                                            .map(([, v]) => v).join(" / ")}
                                    </span>
                                )}
                            </p>

                            <div className="grid grid-cols-1 gap-2">
                                {producto.variantes.map(v => {
                                    const attrsLabel = Object.entries(v.atributos)
                                        .map(([nombre, valor]) => `${nombre}: ${valor}`)
                                        .join(" · ");
                                    const seleccionada = varianteSeleccionada?.idVariante === v.idVariante;
                                    const sinStock = v.stock === 0;
                                    console.log(v.atributos)
                                    return (
                                        <button
                                            key={v.idVariante}
                                            onClick={() => {
                                                if (!sinStock) {
                                                    setVarianteSeleccionada(v);
                                                    setErrorAdd("");
                                                }
                                            }}
                                            disabled={sinStock}
                                            className={`flex items-center justify-between px-4 py-3
                                  rounded-xl border text-sm transition-all text-left
                                  ${seleccionada
                                                    ? "border-foreground bg-foreground text-background"
                                                    : sinStock
                                                        ? "border-border text-muted-foreground opacity-50 cursor-not-allowed"
                                                        : "border-border text-foreground hover:border-foreground/50"
                                                }`}>
                                            <div>
                                                <span className="font-medium">
                                                    {Object.values(v.atributos).join(" / ") || v.sku}
                                                </span>
                                                <span className={`ml-2 text-xs ${seleccionada ? "text-background/70" : "text-muted-foreground"
                                                    }`}>
                                                    {v.sku}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 flex-shrink-0">
                                                <span className={`text-xs px-2 py-0.5 rounded-full ${sinStock
                                                    ? "bg-destructive/10 text-destructive"
                                                    : seleccionada
                                                        ? "bg-background/20 text-background"
                                                        : "bg-muted text-muted-foreground"
                                                    }`}>
                                                    {sinStock ? "Agotado" : `${v.stock} disp.`}
                                                </span>
                                                <span className="font-semibold">
                                                    ${v.precioVenta.toFixed(2)}
                                                </span>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Error */}
                        {errorAdd && (
                            <p className="text-sm text-destructive">{errorAdd}</p>
                        )}

                        {/* Botón agregar */}
                        <Button
                            onClick={handleAgregar}
                            disabled={!varianteSeleccionada || varianteSeleccionada.stock === 0}
                            className="w-full h-14 text-base font-semibold rounded-xl"
                            size="lg">
                            {justAdded ? (
                                <><Check className="mr-2 h-5 w-5" />Agregado al pedido</>
                            ) : isInOrder ? (
                                <><Plus className="mr-2 h-5 w-5" />Agregar otro</>
                            ) : (
                                <><ShoppingBag className="mr-2 h-5 w-5" />Agregar al pedido</>
                            )}
                        </Button>

                        {/* Info de stock total */}
                        <p className="text-xs text-center text-muted-foreground">
                            {producto.variantes.filter(v => v.stock > 0).length} de{" "}
                            {producto.variantes.length} opciones disponibles
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}