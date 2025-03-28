export function NewsletterSection() {
  return (
    <section className="py-8 bg-neutral-light text-neutral-800">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <div className="">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Fique por Dentro das Novidades
          </h2>
          <p className="mb-6">
            Inscreva-se em nossa newsletter para receber dicas de especialistas
            e as últimas atualizações sobre técnicas de economia de água e
            nossos produtos.
          </p>

          <form className="space-y-4 max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Digite seu email aqui"
                className="flex-1 h-10 px-3 py-2 bg-transparent border border-red-800 placeholder:text-red-800"
                required
              />
              <button
                type="submit"
                className="h-10 px-6 bg-transparent text-red-800 font-medium border border-red-800"
              >
                Quero me inscrever!
              </button>
            </div>
            <p className="text-xs text-neutral-700">
              Ao clicar em "Quero me inscrever!" você concorda com nossos Termos
              e Condições.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
