import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOrder } from "../contexts/order-context";

const CLABE = "722969010019544762";

function formatearClabe(clabe: string) {
    return clabe.replace(/(\d{4})(?=\d)/g, "$1 ");
}

function formatearMoneda(n: number) {
    return new Intl.NumberFormat("es-MX", {
        style: "currency", currency: "MXN"
    }).format(n);
}

export function PagoPage() {
    const navigate = useNavigate();
    const { items } = useOrder();
    const [copiado, setCopiado] = useState(false);

    const total = items.reduce((s, i) => s + i.price * (i.quantity ?? 1), 0);

    function copiarClabe() {
        navigator.clipboard.writeText(CLABE).then(() => {
            setCopiado(true);
            setTimeout(() => setCopiado(false), 2500);
        });
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">

            {/* Header */}
            <div className="sticky top-0 z-10 bg-background/95 backdrop-blur
                            border-b border-border px-4 py-3">
                <div className="container mx-auto flex items-center gap-3 max-w-lg">
                    <button onClick={() => navigate(-1)}
                        className="p-2 rounded-xl hover:bg-muted transition-colors">
                        <svg className="w-5 h-5 text-foreground" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <h1 className="font-semibold text-foreground">Datos de pago</h1>
                </div>
            </div>

            <div className="flex-1 container mx-auto max-w-lg px-4 py-8 space-y-6">

                {/* Resumen del pedido */}
                {items.length > 0 && (
                    <div className="bg-muted/50 rounded-2xl p-5 space-y-3">
                        <p className="text-sm font-semibold text-foreground">
                            Resumen de tu pedido
                        </p>
                        <div className="space-y-2">
                            {items.map((item, i) => (
                                <div key={i}
                                    className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">
                                        {item.name}
                                        {(item.quantity ?? 1) > 1 &&
                                            <span className="ml-1">×{item.quantity}</span>}
                                    </span>
                                    <span className="font-medium text-foreground">
                                        {formatearMoneda(item.price * (item.quantity ?? 1))}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between pt-2 border-t border-border">
                            <span className="text-sm font-semibold text-foreground">Total</span>
                            <span className="text-lg font-bold text-foreground">
                                {formatearMoneda(total)}
                            </span>
                        </div>
                    </div>
                )}

                {/* Instrucción */}
                <div>
                    <h2 className="text-xl font-bold text-foreground">
                        Realiza tu transferencia
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        Usa la siguiente CLABE desde tu banco para transferencias SPEI.
                    </p>
                </div>

                {/* Tarjeta CLABE */}
                <div className="bg-background border border-border rounded-2xl overflow-hidden
                                shadow-sm">
                    <div className="px-5 py-4 border-b border-border bg-muted/30">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center
                                            justify-center flex-shrink-0">
                                <svg className="w-5 h-5 text-blue-600" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">Cuenta CLABE</p>
                                <p className="text-xs font-medium text-foreground">
                                    Transferencia SPEI
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="px-5 py-5 flex items-center justify-between gap-4">
                        <div className="min-w-0">
                            <p className="text-xs text-muted-foreground mb-1">CLABE</p>
                            <p className="text-2xl font-bold text-foreground tracking-wider
                                          leading-tight">
                                {formatearClabe(CLABE)}
                            </p>
                        </div>

                        <button onClick={copiarClabe}
                            className={`flex flex-col items-center gap-1.5 px-4 py-3
                                        rounded-xl border transition-all flex-shrink-0
                                        ${copiado
                                    ? "bg-green-50 border-green-200 text-green-600"
                                    : "bg-muted/50 border-border text-foreground hover:bg-muted"
                                }`}>
                            {copiado ? (
                                <>
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-xs font-medium">Copiado</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor" strokeWidth={1.75}>
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                    <span className="text-xs font-medium">Copiar</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Cómo hacerlo */}
                <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-5 space-y-4">
                    <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-blue-600 flex-shrink-0" fill="currentColor"
                            viewBox="0 0 24 24">
                            <path fillRule="evenodd" clipRule="evenodd"
                                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                        </svg>
                        <p className="text-sm font-semibold text-blue-800">¿Cómo hacerlo?</p>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        {[
                            {
                                num: "1",
                                icon: (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor" strokeWidth={1.75}>
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                                    </svg>
                                ),
                                texto: "Ingresa a la app o sitio de tu banco"
                            },
                            {
                                num: "2",
                                icon: (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor" strokeWidth={1.75}>
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                    </svg>
                                ),
                                texto: "Selecciona Transferir o SPEI"
                            },
                            {
                                num: "3",
                                icon: (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor" strokeWidth={1.75}>
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                ),
                                texto: "Ingresa la CLABE y el monto"
                            },
                        ].map(paso => (
                            <div key={paso.num} className="flex flex-col items-center gap-2
                                                           text-center">
                                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center
                                                justify-center text-blue-600">
                                    {paso.icon}
                                </div>
                                <p className="text-xs text-blue-700 leading-tight">{paso.texto}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Nota de seguridad */}
                <div className="flex items-start gap-3 px-4 py-3 bg-muted/30
                                border border-border rounded-xl">
                    <svg className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                        Tu transferencia se recibe de forma segura. Una vez confirmado el pago
                        nos pondremos en contacto contigo para coordinar la entrega.
                    </p>
                </div>

                {/* Botón volver */}
                <button onClick={() => navigate(-1)}
                    className="w-full py-3 border border-border rounded-xl text-sm
                               font-medium text-foreground hover:bg-muted transition-colors">
                    Volver al catálogo
                </button>
            </div>
        </div>
    );
}