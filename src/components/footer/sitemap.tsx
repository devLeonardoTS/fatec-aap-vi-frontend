import { SiInstagram } from "@icons-pack/react-simple-icons";
import { LuLinkedin } from "react-icons/lu";

export function Sitemap() {
  return (
    <div className="container mx-auto p-4 pb-0">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white text-center">
        {/* Logo and Contact */}
        <div className="space-y-6">
          <div className="text-2xl font-bold italic">Logo inValve</div>

          <div className="space-y-2">
            <p className="font-medium">Endereço:</p>
            <p className="">
              Rua Paraíso Dourado, 002 - Centro, São Paulo - SP, 01001-000
            </p>
          </div>

          <div className="space-y-2">
            <p className="font-medium">Contato:</p>
            <a href="tel:+5511912341234" className="hover:underline">
              +55 11 91234-1234
            </a>
            <a
              href="mailto:invalvehidrocontroles@suporte.invalve.com"
              className="block hover:underline break-all"
            >
              invalvehidrocontroles@suporte.invalve.com
            </a>
          </div>

          <div className="flex justify-center space-x-4">
            <a href="#" className="hover:text-white/80">
              <SiInstagram size={20} />
            </a>
            <a href="#" className="hover:text-white/80">
              <LuLinkedin size={20} />
            </a>
          </div>
        </div>

        {/* Links - First Column */}
        <div>
          <ul className="space-y-3">
            <li>
              <a href="#" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Sobre nós
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Produto
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Ajuda
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Comprar
              </a>
            </li>
          </ul>
        </div>

        {/* Links - Second Column */}
        <div>
          <ul className="space-y-3">
            <li>
              <a href="#" className="hover:underline">
                Missão, Visão, Valor
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Trabalhe Conosco
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Política de Privacidade
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Termos de Serviço
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Configurações de Cookies
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
