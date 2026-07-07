import { MessageCircle, Facebook, Instagram } from "lucide-react"
import { Button } from "./ui/button"

const WHATSAPP_NUMBER = "+526143947871"
const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61563028861872"
const INSTAGRAM_URL = "https://instagram.com/dawstore" // Replace with actual URL

export function SocialContact() {
  return (
    <section id="contacto" className="bg-muted py-12 lg:py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-8 text-center lg:mb-12">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
            Contáctanos
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Síguenos en redes sociales o contáctanos directamente por WhatsApp
          </p>
        </div>

        <div className="mx-auto max-w-lg">
          <div className="flex flex-col gap-4">
            {/* WhatsApp - Primary CTA */}
            <Button
              asChild
              className="h-16 rounded-2xl bg-[#25D366] text-lg font-semibold text-white shadow-lg transition-all hover:bg-[#20BD5A] active:scale-[0.98]"
            >
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola, me gustaría hacer una consulta")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3"
              >
                <MessageCircle className="h-6 w-6" />
                Escríbenos por WhatsApp
              </a>
            </Button>

            {/* Social Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                asChild
                variant="outline"
                className="h-14 rounded-2xl border-2 border-[#1877F2] text-[#1877F2] font-semibold transition-all hover:bg-[#1877F2] hover:text-white active:scale-[0.98]"
              >
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <Facebook className="h-5 w-5" />
                  Facebook
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                className="h-14 rounded-2xl border-2 border-[#E4405F] text-[#E4405F] font-semibold transition-all hover:bg-[#E4405F] hover:text-white active:scale-[0.98]"
              >
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <Instagram className="h-5 w-5" />
                  Instagram
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
