const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

export interface CatalogoItem {
    idVariante: number;
    sku: string;
    idProducto: number;
    nombre: string;
    descripcion: string | null;
    tipo: string;
    precioVenta: number;
    stock: number;
    imagenUrl: string | null;
    atributos: Record<string, string>; // ← atributos flexibles
}

export async function fetchCatalogo(): Promise<CatalogoItem[]> {
    const res = await fetch(`${API_URL}/api/productos/catalogo`);
    if (!res.ok) throw new Error("Error al cargar el catálogo");
    const data = await res.json();
    // El backend devuelve atributos como string JSON — parsear
    return data.map((item: any) => ({
        ...item,
        atributos: typeof item.atributos === "string"
            ? JSON.parse(item.atributos)
            : (item.atributos ?? {}),
    }));
}

export interface VarianteCatalogo {
    idVariante: number;
    sku: string;
    atributos: Record<string, string>;
    precioVenta: number;
    stock: number;
    imagenUrl: string | null;
}

export interface ProductoCatalogo {
    idProducto: number;
    nombre: string;
    descripcion: string | null;
    tipo: string;
    precioBase: number;
    imagenUrl: string | null;
    variantes: VarianteCatalogo[];
}

export function agruparCatalogo(items: CatalogoItem[]): ProductoCatalogo[] {
    const mapa = new Map<number, ProductoCatalogo>();

    for (const item of items) {
        if (!mapa.has(item.idProducto)) {
            mapa.set(item.idProducto, {
                idProducto: item.idProducto,
                nombre: item.nombre,
                descripcion: item.descripcion,
                tipo: item.tipo,
                precioBase: item.precioVenta,
                imagenUrl: item.imagenUrl,
                variantes: [],
            });
        }

        const producto = mapa.get(item.idProducto)!;

        producto.variantes.push({
            idVariante: item.idVariante,
            sku: item.sku,
            atributos: item.atributos,
            precioVenta: item.precioVenta,
            stock: item.stock,
            imagenUrl: item.imagenUrl,
        });

        if (item.precioVenta < producto.precioBase)
            producto.precioBase = item.precioVenta;

        if (!producto.imagenUrl && item.imagenUrl)
            producto.imagenUrl = item.imagenUrl;
    }

    return Array.from(mapa.values());
}