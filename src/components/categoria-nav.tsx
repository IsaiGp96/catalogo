import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

interface Categoria {
    id: number;
    nombre: string;
    slug: string;
    nivel: number;
    hijos?: Categoria[];
}

interface Props {
    categoriaActual: string;
    onSelect: (slug: string, nombre: string) => void;
}

export function CategoriaNav({ categoriaActual, onSelect }: Props) {
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [expandidos, setExpandidos] = useState<Set<number>>(new Set());

    useEffect(() => {
        fetch(`${API_URL}/api/productos/categorias`)
            .then(r => r.json())
            .then((data: Categoria[]) => {
                setCategorias(data);
                // Expandir nivel 1 por default
                setExpandidos(new Set(data.map(c => c.id)));
            })
            .catch(() => { });
    }, []);

    function toggle(id: number) {
        setExpandidos(prev => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    }

    function renderCategoria(cat: Categoria, depth = 0): React.ReactNode {
        const tieneHijos = (cat.hijos?.length ?? 0) > 0;
        const expandido = expandidos.has(cat.id);
        const activo = categoriaActual === cat.slug;

        return (
            <div key={cat.id}>
                <button
                    onClick={() => {
                        if (tieneHijos) toggle(cat.id);
                        onSelect(activo ? "" : cat.slug, cat.nombre);
                    }}
                    style={{ paddingLeft: depth * 12 + 8 }}
                    className={`w-full flex items-center justify-between text-left
                                py-1.5 pr-2 rounded-lg text-sm transition-colors ${activo
                            ? "bg-foreground text-background font-medium"
                            : depth === 0
                                ? "text-foreground font-semibold hover:bg-muted"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        }`}>
                    <span>{cat.nombre}</span>
                    {tieneHijos && (
                        <svg className="w-3.5 h-3.5 flex-shrink-0 transition-transform"
                            style={{ transform: expandido ? "rotate(90deg)" : "" }}
                            fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M9 5l7 7-7 7" />
                        </svg>
                    )}
                </button>

                {tieneHijos && expandido && (
                    <div>
                        {cat.hijos!.map(h => renderCategoria(h, depth + 1))}
                    </div>
                )}
            </div>
        );
    }

    return (
        <nav className="space-y-0.5">
            {/* Todo el catálogo */}
            <button
                onClick={() => onSelect("", "")}
                className={`w-full text-left py-1.5 px-2 rounded-lg text-sm
                            font-semibold transition-colors mb-2 ${!categoriaActual
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}>
                Todo el catálogo
            </button>

            <div className="border-t border-border mb-2" />

            {categorias.map(cat => renderCategoria(cat))}
        </nav>
    );
}