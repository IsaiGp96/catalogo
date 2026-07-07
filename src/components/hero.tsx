import { Button } from "./ui/button"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-muted">
      <div className="container mx-auto px-4 py-12 lg:px-8 lg:py-24">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-12">
          {/* Image - First on mobile */}
          <div className="order-1 w-full lg:order-2 lg:w-1/2">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary/20 lg:aspect-[3/4]">
              <img
                src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80"
                alt="Tienda de ropa con variedad de productos"
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-4 left-4 rounded-xl bg-background/90 px-4 py-2 backdrop-blur">
                <p className="text-sm font-medium text-foreground">Nueva Colección</p>
                <p className="text-xs text-muted-foreground">Temporada 2024</p>
              </div>
            </div>
          </div>

          {/* Content - Second on mobile */}
          <div className="order-2 flex w-full flex-col items-center text-center lg:order-1 lg:w-1/2 lg:items-start lg:text-left">
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              Catálogo en línea
            </span>
            <h1 className="mb-6 text-balance text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Encuentra lo que{" "}
              <span className="text-secondary">necesitas</span>
            </h1>
            <p className="mb-8 max-w-lg text-pretty text-lg text-muted-foreground">
              Explora nuestro catálogo y realiza tu pedido fácilmente. 
              Enviamos tu pedido directamente por WhatsApp.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-14 min-w-[180px] rounded-2xl bg-primary px-8 text-base font-semibold text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.98]"
              >
                <a href="#catalogo">
                  Ver productos
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-14 min-w-[180px] rounded-2xl border-2 border-foreground px-8 text-base font-semibold text-foreground transition-all hover:bg-foreground hover:text-background active:scale-[0.98]"
              >
                <a href="#contacto">Contáctanos</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
