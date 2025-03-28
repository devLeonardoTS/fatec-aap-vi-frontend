import { ArrowRightCircle } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="py-4 md:py-6">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 items-center">
          <div className="space-y-6 relative">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              inValve: Hidrocontrolador
            </h1>
            <p className="text-gray-700 md:text-lg">
              Nossa tecnologia inovadora promove o uso consciente da água,
              garantindo que você economize recursos e dinheiro. Com o inValve,
              você monitora a vazão de água do seu imóvel e se previne contra
              vazamentos.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Não ao desperdício
                </h3>
                <p className="text-gray-600">
                  Reduza o seu consumo de água e contribua para um futuro
                  sustentável.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Economize Dinheiro
                </h3>
                <p className="text-gray-600">
                  Reduza suas contas monitorando possíveis vazamentos.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href=""
                className="inline-flex h-10 items-center justify-center rounded-md border border-gray-800 px-8 text-sm font-medium transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
              >
                Saiba mais
              </Link>
              <Link
                href=""
                className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-white transition duration-150 ease-in-out hover:bg-gray-700 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
              >
                Quero comprar{" "}
                <span className="ml-1">
                  <ArrowRightCircle size={16} />
                </span>
              </Link>
            </div>
          </div>
          <div className="bg-gray-200 rounded-lg aspect-square md:aspect-[4/3] flex items-center justify-center">
            <div className="text-gray-400">
              <img
                src="/placeholder.svg?height=400&width=400"
                alt="Water Management System"
                width={400}
                height={400}
                className="mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
