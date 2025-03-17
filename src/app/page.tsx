import Image from "next/image";

export default function Home()
{
  return (
    
    <>
      <main className="mx-auto max-w-[1960px] p-4 "> 
        <div className="grid grid-rows-12 grid-cols-12 gap-8 my-5">
          <div className="border rounded-md row-span-1 my-0 col-start-3 col-span-4">
            Landing page
          </div>
          <div className="border rounded-md grid grid-rows-12 grid-cols-12 row-[2_/_span_12] col-[3_/_span_8] my-10 ">
            <div className="border rounded-md grid row-[1_/_span_1] col-[2_/_span_10] my-5">
            Bem vindo, usuário
            </div>
            <div className="border rounded-md grid row-[2_/_span_2] col-[2_/_span_10] my-5">
              Header/NavBar
              <div className="border rounded-md grid row-[1_/_span_3] col-[5_/_span_1] my-5">
              Logomarca
              </div>
            </div>
            <div className="border rounded-md grid row-[4_/_span_5] col-[2_/_span_10] my-5">
            Seção 'Hero'
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
            <div className="border rounded-md grid row-[9_/_span_5] col-[2_/_span_10] my-5">
            Seção de informações
              <div className="grid grid-rows-1 grid-cols-3 mx-10 my-10">
                <div className="border mx-5">Empresa</div>
                <div className="border mx-5">Produto</div>
                <div className="border mx-5">Objetivo</div>
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

/*
          <h1 className="col-span-4 col-start-2 mx-10 text-[20px]">
            Título
          </h1>

                    <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
*/