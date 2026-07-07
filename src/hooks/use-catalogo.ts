import { useState, useEffect } from "react";
import { CatalogoItem } from "../api/productos";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

export function useCatalogo(categoria = "") {
    const [productos, setProductos] = useState<CatalogoItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setProductos([]);

        const url = categoria
            ? `${API_URL}/api/productos/catalogo?categoria=${categoria}`
            : `${API_URL}/api/productos/catalogo`;

        fetch(url)
            .then(r => { if (!r.ok) throw new Error("Error al cargar"); return r.json(); })
            .then(data => setProductos(data.map((item: any) => ({
                ...item,
                atributos: typeof item.atributos === "string"
                    ? JSON.parse(item.atributos)
                    : (item.atributos ?? {}),
            }))))
            .catch(e => setError(e.message))
            .finally(() => setLoading(false));
    }, [categoria]);

    return { productos, loading, error };
}