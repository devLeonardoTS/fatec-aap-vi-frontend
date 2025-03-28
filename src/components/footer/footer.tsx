import Link from "next/link";
import { Sitemap } from "./sitemap";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex flex-col gap-4 justify-between">
      <Sitemap />
      <hr className="border-white/30" />
      <div className="flex flex-col mb-4 md:flex-row justify-between items-center">
        <p className="text-sm">
          &copy; {currentYear} inValve: Hidrocontroles. Todos os direitos
          reservados.
        </p>
        <div className="flex gap-2 text-sm md:mt-0">
          <Link href="#" className="text-sm hover:underline">
            Políticas de Privacidade
          </Link>
          <Link href="#" className="text-sm hover:underline">
            Termos de Serviço
          </Link>
          <Link href="#" className="text-sm hover:underline">
            Configuração de Cookies
          </Link>
        </div>
      </div>
    </footer>
  );
}
