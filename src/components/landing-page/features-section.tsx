export function FeaturesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <div className="inline-block text-sm font-medium mb-2">Inovador</div>
          <h2 className="text-3xl md:text-4xl font-bold">
            Explore as Funcionalidades Inteligentes do inValve
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-gray-600">
            Experimente a conveniência sem igual com a funcionalidade de
            controle remoto do inValve. Gerencie sua vazão de água com
            facilidade de qualquer lugar usando sua área de controle intuitiva.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="text-center">
            <div className="bg-gray-200 rounded-lg aspect-video mb-6 flex items-center justify-center">
              <img
                src="/placeholder.svg?height=200&width=300"
                alt="Alertas Personalizadas"
                width={300}
                height={200}
                className="mx-auto"
              />
            </div>
            <h3 className="text-xl font-bold mb-2">
              Fique Informado com Alertas Personalizadas
            </h3>
            <p className="text-gray-600">
              Receba notificações personalizadas para suas necessidades.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="text-center">
            <div className="bg-gray-200 rounded-lg aspect-video mb-6 flex items-center justify-center">
              <img
                src="/placeholder.svg?height=200&width=300"
                alt="Análise de Uso da Água"
                width={300}
                height={200}
                className="mx-auto"
              />
            </div>
            <h3 className="text-xl font-bold mb-2">
              Ganhe Insights com a Análise de Uso de Água
            </h3>
            <p className="text-gray-600">
              Acompanhe e analise seu consumo de água para um uso mais
              inteligente.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="text-center">
            <div className="bg-gray-200 rounded-lg aspect-video mb-6 flex items-center justify-center">
              <img
                src="/placeholder.svg?height=200&width=300"
                alt="Controle Remoto da Vazão de Água"
                width={300}
                height={200}
                className="mx-auto"
              />
            </div>
            <h3 className="text-xl font-bold mb-2">
              Controle a Vazão de Água em Qualquer Momento e Lugar
            </h3>
            <p className="text-gray-600">
              Tenha o controle total sobre a gestão de água com facilidade.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
