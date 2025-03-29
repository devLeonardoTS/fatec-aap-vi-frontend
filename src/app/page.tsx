import Image from "next/image";

export default function Home()
{
  return (
    
    <>
      <main className="mx-auto max-w-[1960px] p-4 "> 
        <div className="grid grid-rows-12 grid-cols-12 gap-8 my-5">
          <div className="row-span-1 my-0 col-start-3 col-span-4">
            <Image 
            src={"/landingPage.png"} 
            alt={""}
            width={500}
            height={100}>
              
            </Image>
          </div>
          
          <div className="border rounded-md grid grid-rows-12 grid-cols-12 row-[2_/_span_12] col-[3_/_span_8] my-10 ">
            <div className="border rounded-md grid row-[1_/_span_1] col-[2_/_span_10] grid-cols-4 my-5" id="innerBoxSmall">
              <div className="col-[1_/_span_1] mx-5">Bem vindo, usuário</div>
              <a className="col-[5_/_span_1] mx-5" href="https://www.google.com/">Login/Logout</a>
            </div>

            <div className="row-[2_/_span_1] col-[2_/_span_10]">Navegação</div>
            <div className="border rounded-md grid row-[2_/_span_2] col-[2_/_span_10] grid-cols-4 my-5" id="innerBoxMed">
              <div className="border rounded-md bg-foreground text-background  col-[1_/_span_1] mx-5 my-10" id="innerBoxSmall">Sobre a empresa</div>
              <div className="border rounded-md bg-foreground text-background  col-[2_/_span_1] mx-5 my-10" id="innerBoxSmall">Produtos</div>
              <div className="border rounded-md bg-foreground text-background  col-[3_/_span_1] mx-5 my-10" id="innerBoxSmall">Ajuda</div>
              <div className="border rounded-md bg-foreground text-background  col-[4_/_span_1] mx-5 my-10" id="innerBoxSmall">Usuário</div>
              <div className="border rounded-md bg-foreground text-background  grid col-[5_/_span_1]">
                <Image
                  src={"/logo.png"}
                  alt={""}
                  width={120}
                  height={120}>
                </Image>
              </div>
            </div>

            <div className="row-[3_/_span_1] col-[2_/_span_10] mt-5">Hero</div>
            <div className="border rounded-md grid row-[3_/_span_3] col-[2_/_span_10] my-10" id="innerBoxBig">
              <div className="grid row-[2_/_span_4] grid-cols-2 mx-10 my-5">
                <div className="border mx-5">
                  Marketing
                  <div className="my-10">Texto de Marketing</div>
                  <a
                    className="rounded-md border transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto mx-10"
                    href="https://www.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Compre agora
                  </a></div>
                <div className="border mx-5">SGV</div>
              </div>
            </div>

            <div className="row-[6_/_span_1] col-[2_/_span_10]">Informações</div>
            <div className="border rounded-md grid row-[6_/_span_5] col-[2_/_span_10] my-5" id="innerBoxBig">
              <div className="grid grid-rows-1 grid-cols-3 mx-10 my-10">
                <div className="border mx-5">Empresa</div>
                <div className="border mx-5">Produto</div>
                <div className="border mx-5">Objetivo</div>
              </div>
            </div>

            <div className="row-[9_/_span_1] col-[2_/_span_10] mt-5">Depoimentos</div>
            <div className="border rounded-md grid row-[9_/_span_5] col-[2_/_span_10] my-10" id="innerBoxBig">
              <div className="grid grid-rows-1 grid-cols-3 mx-10 my-10">
                <div className="border mx-5">1</div>
                <div className="border mx-5">2</div>
                <div className="border mx-5">3</div>
              </div>
            </div>
          </div>

        </div>

      <div>
      </div>
      </main>
      
    </>   
  )
}