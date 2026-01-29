import Link from "next/link";
import { Linkedin, Facebook, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link
              href={"/"}
              className="text-xl font-bold tracking-tight font-display"
            >
              <span className="text-primary-foreground">Nexus</span>
              <span className="text-muted">.</span>
            </Link>
            <p className="mt-4 text-muted max-w-sm">
              Transformamos ideas en experiencias digitales excepcionales.
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href="#"
                className="p-2 rounded-full bg-background/10 hover:bg-background/20 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-background/10 hover:bg-background/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-background/10 hover:bg-background/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Enlaces</h4>
            <ul className="space-y-2 text-muted">
              <li>
                <a
                  href="#hero"
                  className="hover:text-background transition-colors"
                >
                  Inicio
                </a>
              </li>
              <li>
                <a
                  href="#team"
                  className="hover:text-background transition-colors"
                >
                  Equipo
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  className="hover:text-background transition-colors"
                >
                  Testimonios
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-background transition-colors"
                >
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          <div className="mt-12 pt-8 border-t border-background/10 text-center text-muted text-sm">
            <p>
              &copy; {new Date().getFullYear()} Nexus Consulting. Todos los
              derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
