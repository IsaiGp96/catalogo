import { ShoppingBag, MessageCircle } from "lucide-react"
import { Button } from "./ui/button"
import { useOrder } from "../contexts/order-context"
import { useNavigate } from "react-router-dom"

const WHATSAPP_NUMBER = "1234567890" // Replace with actual number

export function StickyBottomBar() {
  const { totalItems, totalPrice, generateWhatsAppMessage } = useOrder()

  const handleQuickWhatsApp = () => {
    const message = generateWhatsAppMessage()
    if (message) {
      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`,
        "_blank"
      )
    } else {
      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola, me gustaría hacer una consulta")}`,
        "_blank"
      )
    }
  }

  const navigate = useNavigate();
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 lg:hidden">
      <div className="container mx-auto flex items-center justify-between gap-3 px-4 py-3">
        
        {/* View Order Button */}
        <Button
          asChild
          variant="outline"
          className="flex-1 h-12 rounded-xl border-2 border-foreground font-semibold text-foreground transition-all hover:bg-foreground hover:text-background active:scale-[0.98]"
        >
          <a href="#pedido" className="flex items-center justify-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            <span>Ver Pedido</span>
            {totalItems > 0 && (
              <span className="ml-1 flex h-6 min-w-6 items-center justify-center rounded-full bg-primary px-2 text-xs font-bold text-primary-foreground">
                {totalItems}
              </span>
            )}
          </a>
        </Button>

        {/* Pago por transferencia — solo si hay items */}
        {totalItems > 0 && (
          <Button
            onClick={() => navigate("/pago")}
            variant="outline"
            className="h-12 px-4 rounded-xl border-2 border-foreground
                               font-semibold text-foreground transition-all
                               hover:bg-foreground hover:text-background active:scale-[0.98]">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" strokeWidth={1.75}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
            </svg>
            <span className="sr-only">Pagar por transferencia</span>
          </Button>
        )}

        {/* WhatsApp Quick Action */}
        <Button
          onClick={handleQuickWhatsApp}
          className="h-12 w-12 rounded-xl bg-[#25D366] text-white shadow-lg transition-all hover:bg-[#20BD5A] active:scale-[0.98]"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="sr-only">WhatsApp</span>
        </Button>
      </div>
    </div>
  )
}
