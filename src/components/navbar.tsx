import { useState } from "react"
import { Menu, X, ShoppingBag } from "lucide-react"
import { Button } from "./ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "./ui/sheet"
import { useOrder } from "../contexts/order-context"

const navLinks = [
  { name: "Inicio", href: "#" },
  { name: "Catálogo", href: "#catalogo" },
  { name: "Pedidos", href: "#pedido" },
  { name: "Contacto", href: "#contacto" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { totalItems } = useOrder()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        {/* Mobile Menu */}
        <div className="flex lg:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] bg-background p-0">
              <SheetTitle className="sr-only">Menú de Navegación</SheetTitle>
              <div className="flex h-16 items-center justify-between border-b border-border px-4">
                <span className="text-xl font-bold text-foreground">DAW Store</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-10 w-10"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <div className="flex flex-col py-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="px-6 py-4 text-lg font-medium text-foreground transition-colors hover:bg-muted active:bg-muted"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo */}
        <a href="/" className="flex items-center">
          <span className="text-2xl font-bold tracking-tight text-foreground">
            DAW Store
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-foreground transition-colors hover:text-secondary"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Order Icon */}
        <div className="flex items-center">
          <a href="#pedido">
            <Button variant="ghost" size="icon" className="relative h-10 w-10">
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                  {totalItems}
                </span>
              )}
              <span className="sr-only">Ver pedido</span>
            </Button>
          </a>
        </div>
      </nav>
    </header>
  )
}
