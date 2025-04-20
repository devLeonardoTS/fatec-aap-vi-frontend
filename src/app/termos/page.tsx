
import React from 'react'
export default function TermsOfUse() {
  return (
    <div className="max-w-4xl mx-auto py-12">           
    {/* Header */}
          <div className="max-w-4xl mx-auto px-4">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-zinc-800 mb-4">
              Termos de Uso
            </h1>
            <div className="h-1 w-20 bg-red-600 mb-6"></div>
            <p className="text-zinc-700">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </div>
          </div>
          
          <div className="flex-justify-center grid grind-cols-1 md:grid-cols-1 grid-rows-1 gap-8 mb-8 items-start">
          {/* Introduction */}
          <div className="flex-justify-center mb-8">
            <p className="text-zinc-700 mb-4">
              Bem-vindo aos Termos de Uso da inValve. Este documento é um contrato legal entre você e a inValve que rege o seu uso de nossos produtos, serviços e plataforma online. Ao acessar ou usar nossos serviços, você concorda com estes termos.
            </p>
            <p className="text-zinc-700">
              Por favor, leia atentamente estes termos antes de utilizar nossos serviços. Se você não concordar com estes termos, não utilize nossos serviços.
            </p>
          </div>

          {/* Terms Sections */}
          <div className="space-y-10">
            {/* Section 1 */}
            <div className="bg-stone-100 p-6 rounded-lg">
              <h2 className="text-xl font-bold text-zinc-800 mb-4">
                1. Aceitação dos Termos
              </h2>
              <div className="space-y-3 text-zinc-700">
                <p>
                  1.1. Ao acessar ou utilizar o sistema inValve, você confirma que leu, entendeu e concorda com estes Termos de Uso.
                </p>
                <p>
                  1.2. Se você estiver utilizando nossos serviços em nome de uma empresa ou outra entidade legal, você declara que tem autoridade para vincular essa entidade a estes termos.
                </p>
                <p>
                  1.3. Reservamo-nos o direito de modificar estes termos a qualquer momento. As modificações entrarão em vigor imediatamente após a publicação dos termos atualizados.
                </p>
              </div>
            </div>
            </div>

            {/* Section 2 */}
            <div className="bg-stone-100 p-6 rounded-lg">
              <h2 className="text-xl font-bold text-zinc-800 mb-4">
                2. Uso do Serviço
              </h2>
              <div className="space-y-3 text-zinc-700">
                <p>
                  2.1. O inValve é um sistema de monitoramento e controle de consumo de água que permite aos usuários acompanhar e gerenciar o uso de água em suas propriedades.
                </p>
                <p>
                  2.2. Você concorda em utilizar nossos serviços apenas para fins legais e de acordo com estes termos.
                </p>
                <p>2.3. Você não deve:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Utilizar nossos serviços de maneira que possa danificar, desabilitar ou sobrecarregar nossos sistemas;
                  </li>
                  <li>Tentar acessar áreas restritas de nossos serviços sem autorização;</li>
                  <li>Interferir no uso e aproveitamento de nossos serviços por outros usuários;</li>
                  <li>
                    Modificar, adaptar ou hackear nossos serviços ou modificar outro site para falsamente implicar que está associado aos nossos serviços.
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 3 */}
            <div className="bg-stone-100 p-6 rounded-lg">
              <h2 className="text-xl font-bold text-zinc-800 mb-4">
                3. Contas de Usuário
              </h2>
              <div className="space-y-3 text-zinc-700">
                <p>
                  3.1. Para utilizar determinadas funcionalidades de nossos serviços, você pode precisar criar uma conta.
                </p>
                <p>
                  3.2. Você é responsável por manter a confidencialidade de suas credenciais de login e por todas as atividades que ocorrem em sua conta.
                </p>
                <p>
                  3.3. Você concorda em notificar-nos imediatamente sobre qualquer uso não autorizado de sua conta ou qualquer outra violação de segurança.
                </p>
                <p>3.4. Reservamo-nos o direito de encerrar contas inativas por um período prolongado.</p>
              </div>
            </div>

            {/* Section 4 */}
            <div className="bg-stone-100 p-6 rounded-lg">
              <h2 className="text-xl font-bold text-zinc-800 mb-4">
                4. Privacidade
              </h2>
              <div className="space-y-3 text-zinc-700">
                <p>
                  4.1. Nossa Política de Privacidade descreve como coletamos, usamos e compartilhamos suas informações pessoais.
                </p>
                <p>4.2. Ao utilizar nossos serviços, você concorda com nossa Política de Privacidade.</p>
                <p>
                  4.3. Você entende que, ao utilizar nossos serviços, concorda com a coleta e uso de suas informações conforme estabelecido em nossa Política de Privacidade.
                </p>
              </div>
            </div>

            {/* Section 5 */}
            <div className="bg-stone-100 p-6 rounded-lg">
              <h2 className="text-xl font-bold text-zinc-800 mb-4">
                5. Propriedade Intelectual
              </h2>
              <div className="space-y-3 text-zinc-700">
                <p>
                  5.1. Todos os direitos, títulos e interesses em nossos serviços, incluindo todo o conteúdo, recursos e funcionalidades, são e permanecerão propriedade exclusiva da inValve e de seus licenciadores.
                </p>
                <p>
                  5.2. Nossos serviços são protegidos por direitos autorais, marcas registradas e outras leis de propriedade intelectual do Brasil e de outros países.
                </p>
                <p>
                  5.3. Você não está autorizado a copiar, modificar, distribuir, vender ou alugar qualquer parte de nossos serviços sem nossa permissão expressa por escrito.
                </p>
              </div>
            </div>

            {/* Section 6 */}
            <div className="bg-stone-100 p-6 rounded-lg">
              <h2 className="text-xl font-bold text-zinc-800 mb-4">
                6. Limitação de Responsabilidade
              </h2>
              <div className="space-y-3 text-zinc-700">
                <p>
                  6.1. Na extensão máxima permitida pela lei aplicável, a inValve não será responsável por quaisquer danos indiretos, incidentais, especiais, consequenciais ou punitivos, ou qualquer perda de lucros ou receitas.
                </p>
                <p>
                  6.2. Nossa responsabilidade total decorrente ou relacionada ao uso de nossos serviços não excederá o valor que você pagou à inValve pelos serviços nos últimos 12 meses.
                </p>
                <p>
                  6.3. Algumas jurisdições não permitem a exclusão ou limitação de responsabilidade por danos consequenciais ou incidentais, portanto, as limitações acima podem não se aplicar a você.
                </p>
              </div>
            </div> 

            {/* Section 7 */}
            <div className="bg-stone-100 p-6 rounded-lg">
              <h2 className="text-xl font-bold text-zinc-800 mb-4">7. Lei Aplicável</h2>
              <p className="text-zinc-700">
                7.1. Estes termos serão regidos e interpretados de acordo com as leis do Brasil, sem considerar suas disposições sobre conflitos de leis.
              </p>
              <p className="text-zinc-700">
                7.2. Qualquer disputa decorrente ou relacionada a estes termos será submetida à jurisdição exclusiva dos tribunais localizados no Brasil.
              </p>
            </div>

            {/* Section 8 */}
            <div className="bg-stone-100 p-6 rounded-lg">
              <h2 className="text-xl font-bold text-zinc-800 mb-4">8. Alterações nos Termos</h2>
              <p className="text-zinc-700">
                8.1. Reservamo-nos o direito de modificar estes termos a qualquer momento, a nosso critério exclusivo.
              </p>
              <p className="text-zinc-700">
                8.2. Se fizermos alterações materiais a estes termos, notificaremos você por meio de um aviso em nosso site ou por e-mail.
              </p>
              <p className="text-zinc-700">
                8.3. Seu uso continuado de nossos serviços após a publicação de termos atualizados constitui sua aceitação desses termos.
              </p>
            </div>

            {/* Section 9 */}
            <div className="bg-stone-100 p-6 rounded-lg">
              <h2 className="text-xl font-bold text-zinc-800 mb-4">9. Contato</h2>
              <p className="text-zinc-700">
                9.1. Se você tiver alguma dúvida sobre estes Termos de Uso, entre em contato conosco:
              </p>
              <address className="bg-white p-4 rounded-lg">
                <p className="font-medium">inValve Tecnologia Ltda.</p>
                <p>Endereço: Av. Exemplo, 1234 - São Paulo, SP</p>
                <p>Email: <a href="mailto:contato@invalve.com.br">contato@invalve.com.br</a></p>
                <p>Telefone: <a href="tel:+551112345678">(11) 1234-5678</a></p>
              </address>
            </div>
          </div>
      </div>
  )
        }
    