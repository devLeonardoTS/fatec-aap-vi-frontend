export default function AboutUs() {
  return (
    <div className="flex flex-col max-w-6xl mx-auto my-8">
      <h1 className="text-4xl font-bold text-zinc-800 mb-4 text-center">
        inValve: Hidrocontrolador
      </h1>
      <p className="text-zinc-700 text-lg max-w-3xl mx-auto mb-8">
        Nossa tecnologia inovadora promove o uso consciente da água, garantindo
        que você economize recursos e dinheiro. Conheça nossos valores, visão e
        missão.
      </p>

      <div className="grid grid-cols-2 grid-rows-2 gap-8 mb-8 items-start">
        {/* Grid configuration for "A" */}
        <div className="bg-stone-100 p-6 rounded-lg row-span-2 h-full">
          <h2 className="text-2xl font-bold text-zinc-800 mb-4 flex items-center">
            <span className="bg-red-600 w-2 h-8 mr-3 inline-block"></span>
            Nossos Valores
          </h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="bg-zinc-800 text-white p-1 rounded-full mr-3 mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-zinc-800">Sustentabilidade</h3>
                <p className="text-zinc-700">
                  Alinhar todos os processos e produtos à preservação do meio
                  ambiente, priorizando ações que minimizem impactos ambientais.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-zinc-800 text-white p-1 rounded-full mr-3 mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-zinc-800">Inovação</h3>
                <p className="text-zinc-700">
                  Buscar continuamente novas tecnologias e ideias que tornem a
                  gestão hídrica mais eficiente e acessível.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-zinc-800 text-white p-1 rounded-full mr-3 mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-zinc-800">
                  Ética e Transparência
                </h3>
                <p className="text-zinc-700">
                  Conduzir todas as atividades da empresa com integridade,
                  estabelecendo relações de confiança com clientes, parceiros e
                  colaboradores.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-zinc-800 text-white p-1 rounded-full mr-3 mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-zinc-800">
                  Responsabilidade Ambiental
                </h3>
                <p className="text-zinc-700">
                  Assumir um papel ativo na conservação dos recursos naturais,
                  promovendo práticas que respeitam o meio ambiente.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-zinc-800 text-white p-1 rounded-full mr-3 mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-zinc-800">Qualidade</h3>
                <p className="text-zinc-700">
                  Garantir excelência em cada detalhe dos produtos e serviços
                  oferecidos, superando as expectativas dos clientes.
                </p>
              </div>
            </li>
          </ul>
        </div>

        {/* Grid configuration for "B" */}
        <div className="bg-stone-100 p-6 rounded-lg h-full">
          <h2 className="text-2xl font-bold text-zinc-800 mb-4 flex items-center">
            <span className="bg-red-600 w-2 h-8 mr-3 inline-block"></span>
            Nossa Visão
          </h2>
          <p className="text-zinc-700">
            A visão da InValve é se tornar uma referência global em soluções de
            gestão hídrica, demonstrando que a inovação pode transformar a
            maneira como utilizamos os recursos naturais. Ao promover hábitos
            responsáveis e educar a sociedade sobre a importância da água como
            recurso indispensável à vida, a InValve aspira criar um impacto
            positivo duradouro, estabelecendo um legado de inovação, eficiência
            e sustentabilidade.
          </p>
        </div>

        {/* Grid configuration for "C" */}
        <div className="bg-stone-100 p-6 rounded-lg h-full">
          <h2 className="text-2xl font-bold text-zinc-800 mb-4 flex items-center">
            <span className="bg-red-600 w-2 h-8 mr-3 inline-block"></span>
            Nossa Missão
          </h2>
          <p className="text-zinc-700">
            A missão da InValve vai além de oferecer produtos e serviços. A
            empresa se compromete em liderar um movimento em prol da
            sustentabilidade, conscientizando seus clientes e parceiros sobre o
            uso eficiente de recursos hídricos. Por meio de sua tecnologia
            inovadora, a InValve possibilita ter um controle hídrico
            inteligente, contribuindo para um futuro mais sustentável e
            responsável.
          </p>
        </div>
      </div>

      {/* Grid configuration for "D" */}
      <div className="bg-stone-100 p-6 rounded-lg mb-4">
        <h2 className="text-2xl font-bold text-zinc-800 mb-4 flex items-center">
          <span className="bg-red-600 w-2 h-8 mr-3 inline-block"></span>
          Sobre Nós
        </h2>
        <p className="text-zinc-700">
          A inValve é uma empresa especializada em soluções inteligentes de
          controle hídrico, com foco em sustentabilidade, inovação e eficiência.
          Desenvolvemos sistemas de monitoramento e automação para válvulas,
          permitindo um uso mais consciente da água e redução de desperdícios.
          Com tecnologia de ponta e compromisso ambiental, buscamos transformar
          o setor hídrico por meio de soluções acessíveis, escaláveis e
          ecologicamente responsáveis.
        </p>
      </div>

      {/* Grid configuration for "E" */}
      <div className="flex flex-col md:flex-row items-center justify-between bg-stone-100 p-6 rounded-lg">
        <div className="mb-4 md:mb-0">
          <h2 className="text-xl font-bold text-zinc-800">
            Junte-se à nossa missão de economizar água
          </h2>
          <p className="text-zinc-700">
            Descubra como o inValve pode transformar sua relação com o consumo
            de água.
          </p>
        </div>
        <div className="flex gap-4">
          <a
            href="#"
            className="px-6 py-3 border border-zinc-800 rounded text-zinc-800 hover:bg-zinc-100 transition-colors"
          >
            Saiba mais
          </a>
          <a
            href="#"
            className="px-6 py-3 bg-zinc-800 text-white rounded hover:bg-zinc-700 transition-colors flex items-center gap-2"
          >
            Quero comprar
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
