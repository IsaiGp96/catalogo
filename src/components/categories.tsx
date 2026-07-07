import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "./ui/button"

const categories = [
  {
    name: "Hombre",
    image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=400&q=80",
    count: 85,
  },
  {
    name: "Mujer",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=80",
    count: 124,
  },
  {
    name: "Accesorios",
    image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=400&q=80",
    count: 67,
  },
  {
    name: "Ofertas",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&q=80",
    count: 45,
  },
]

export function Categories() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 280
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="bg-background py-12 lg:py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Categorías
            </h2>
            <p className="mt-2 text-muted-foreground">
              Explora por categoría
            </p>
          </div>
          {/* Scroll buttons - Hidden on mobile, visible on desktop */}
          <div className="hidden gap-2 sm:flex">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("left")}
              className="h-10 w-10 rounded-full border-border"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Desplazar izquierda</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("right")}
              className="h-10 w-10 rounded-full border-border"
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Desplazar derecha</span>
            </Button>
          </div>
        </div>

        {/* Mobile: Horizontal scroll / Desktop: Grid */}
        <div
          ref={scrollRef}
          className="scrollbar-hide -mx-4 flex gap-4 overflow-x-auto px-4 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:px-0"
        >
          {categories.map((category) => (
            <a
              key={category.name}
              href="#catalogo"
              className="group relative flex-shrink-0"
            >
              <div className="relative aspect-[3/4] w-[160px] overflow-hidden rounded-2xl bg-muted sm:w-[200px] lg:w-full">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-lg font-semibold text-background">
                    {category.name}
                  </h3>
                  <p className="text-sm text-background/80">
                    {category.count} productos
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
