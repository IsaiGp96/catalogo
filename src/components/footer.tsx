import { useState } from "react"
import { ChevronDown, Instagram, Facebook, MessageCircle } from "lucide-react"

const WHATSAPP_NUMBER = "1234567890"
const FACEBOOK_URL = "https://facebook.com/dawstore"
const INSTAGRAM_URL = "https://instagram.com/dawstore"

const footerLinks = [
  {
    title: "Tienda",
    links: [
      { name: "Hombre", href: "#catalogo" },
      { name: "Mujer", href: "#catalogo" },
      { name: "Accesorios", href: "#catalogo" },
      { name: "Ofertas", href: "#catalogo" },
    ],
  },
  {
    title: "Ayuda",
    links: [
      { name: "Cómo comprar", href: "#" },
      { name: "Envíos", href: "#" },
      { name: "Devoluciones", href: "#" },
      { name: "Contacto", href: "#contacto" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { name: "Sobre nosotros", href: "#" },
      { name: "Trabaja con nosotros", href: "#" },
      { name: "Términos", href: "#" },
      { name: "Privacidad", href: "#" },
    ],
  },
]

function FooterSection({
  title,
  links,
}: {
  title: string
  links: { name: string; href: string }[]
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-border py-4 lg:border-0 lg:py-0">
      {/* Mobile: Accordion */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between lg:cursor-default"
      >
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
        <ChevronDown
          className={`h-5 w-5 text-muted-foreground transition-transform lg:hidden ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Links */}
      <ul
        className={`mt-4 space-y-3 overflow-hidden transition-all lg:mt-4 lg:max-h-none lg:opacity-100 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 lg:opacity-100"
        }`}
      >
        {links.map((link) => (
          <li key={link.name}>
            <a
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="bg-background border-t border-border pb-24 lg:pb-0">
      <div className="container mx-auto px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-5 lg:gap-12">
          {/* Brand & Description */}
          <div className="lg:col-span-2">
            <a href="/" className="inline-block">
              <span className="text-2xl font-bold text-foreground">DAW Store</span>
            </a>
            <p className="mt-4 text-sm text-muted-foreground">
              Tu tienda de confianza para encontrar la mejor ropa y accesorios. 
              Realiza tu pedido fácilmente por WhatsApp.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex gap-4">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white transition-colors hover:bg-[#20BD5A]"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-foreground transition-colors hover:bg-[#1877F2] hover:text-white"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-foreground transition-colors hover:bg-[#E4405F] hover:text-white"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <FooterSection
              key={section.title}
              title={section.title}
              links={section.links}
            />
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-center lg:flex-row lg:text-left">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} DAW Store. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Política de Privacidad
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Términos de Servicio
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
