import { createContext, useContext, useState, ReactNode } from "react"

export interface OrderItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

interface OrderContextType {
  items: OrderItem[]
  addItem: (item: Omit<OrderItem, "quantity">) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearOrder: () => void
  totalItems: number
  totalPrice: number
  generateWhatsAppMessage: () => string
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

export function OrderProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<OrderItem[]>([])

  const addItem = (item: Omit<OrderItem, "quantity">) => {
    setItems((prev) => {
      const existingItem = prev.find((i) => i.id === item.id)
      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
      return
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    )
  }

  const clearOrder = () => {
    setItems([])
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const generateWhatsAppMessage = () => {
    if (items.length === 0) return ""

    const itemsList = items
      .map(
        (item) =>
          `- ${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}`
      )
      .join("\n")

    const message = `Hola, quiero pedir los siguientes productos:\n\n${itemsList}\n\nTotal: $${totalPrice.toFixed(2)}`

    return encodeURIComponent(message)
  }

  return (
    <OrderContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearOrder,
        totalItems,
        totalPrice,
        generateWhatsAppMessage,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

export function useOrder() {
  const context = useContext(OrderContext)
  if (context === undefined) {
    throw new Error("useOrder must be used within an OrderProvider")
  }
  return context
}
