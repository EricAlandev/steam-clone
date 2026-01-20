import Layout from "@/componentes/layout/Layout";
import JogosDestaques from "@/componentes/pages/homePage/destaques/JogosDestaque";


export  default async function Home() {


  
    let jogosDestaques;

     //puxar os jogos em destaque
    try{
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/jogos/api`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      jogosDestaques = await response.json();

      console.log("PUXOU TUDO ")
      console.log(jogosDestaques)
    }

    catch(error){
      console.log(error)
    }


  return (
    <>
      <div className="flex flex-col min-h-screen bg-[#212429]">
        <Layout/>
        
        {/*HomePage */}
        <div className="flex-1  mt-16">
          {/*Jogos em Destaque */}
          <div className="pt-10 ">
            <JogosDestaques
              jogos={jogosDestaques}
            />
          </div>
        </div>
      </div>
    </>
  );
}
