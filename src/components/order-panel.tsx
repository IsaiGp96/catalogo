import { Trash2, Plus, Minus, MessageCircle } from "lucide-react"
import { Button } from "./ui/button"
import { useOrder } from "../contexts/order-context"
import { useNavigate } from "react-router-dom"

const WHATSAPP_NUMBER = "+526143947871"
export function OrderPanel() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearOrder,
    totalItems,
    totalPrice,
    generateWhatsAppMessage,
  } = useOrder()

  const handleSendWhatsApp = () => {
    const message = generateWhatsAppMessage()
    if (message) {
      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`,
        "_blank"
      )
    }
  }

  const navigate = useNavigate();
  return (
    <section id="pedido" className="bg-background py-12 lg:py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-8 text-center lg:mb-12">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
            Tu Pedido
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Revisa los productos seleccionados y envía tu pedido por WhatsApp
          </p>
        </div>

        <div className="mx-auto max-w-2xl">
          {items.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card p-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <MessageCircle className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                Tu pedido está vacío
              </h3>
              <p className="text-muted-foreground">
                Explora el catálogo y agrega productos a tu pedido
              </p>
              <Button
                asChild
                className="mt-6 h-12 rounded-xl bg-primary px-6 font-semibold text-primary-foreground hover:bg-primary/90"
              >
                <a href="#catalogo">Ver productos</a>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Order Items */}
              <div className="rounded-2xl border border-border bg-card overflow-hidden">
                {items.map((item, index) => (
                  <div
                    key={item.id}
                    className={`flex items-center gap-4 p-4 ${index !== items.length - 1 ? "border-b border-border" : ""
                      }`}
                  >
                    {/* Product Image */}
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-muted">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground line-clamp-1">
                        {item.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        ${item.price.toFixed(2)} c/u
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="h-8 w-8 rounded-lg"
                      >
                        <Minus className="h-4 w-4" />
                        <span className="sr-only">Reducir cantidad</span>
                      </Button>
                      <span className="w-8 text-center font-medium text-foreground">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-8 w-8 rounded-lg"
                      >
                        <Plus className="h-4 w-4" />
                        <span className="sr-only">Aumentar cantidad</span>
                      </Button>
                    </div>

                    {/* Remove Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Eliminar producto</span>
                    </Button>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-muted-foreground">
                    Productos ({totalItems})
                  </span>
                  <span className="font-medium text-foreground">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                  <span className="text-lg font-semibold text-foreground">
                    Total
                  </span>
                  <span className="text-xl font-bold text-foreground">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>

                <Button
                  onClick={handleSendWhatsApp}
                  className="h-14 w-full rounded-xl bg-[#25D366] text-base font-semibold text-white shadow-lg transition-all hover:bg-[#20BD5A] active:scale-[0.98]"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Enviar pedido por WhatsApp
                </Button>

                <Button
                  onClick={() => navigate("/pago")}
                  variant="outline"
                  className="h-12 w-full rounded-xl border-border font-semibold
               text-foreground hover:bg-muted transition-all mt-2">
                  <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                  Pagar por transferencia
                </Button>

                <Button
                  variant="ghost"
                  onClick={clearOrder}
                  className="mt-3 h-10 w-full text-muted-foreground hover:text-destructive"
                >
                  Vaciar pedido
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
