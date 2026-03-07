
import { jogos } from "@/servers/types/TypeJogos";
import Link from "next/link";

type usuarioJogos = {
    id: number,
    jogos: jogos
}

type valoresPopUpAmigos = {
    nomeUsuario: string,
    usuarioJogos: usuarioJogos[],
    closePopUp: (close : null) => void;
}

export default function EsqPopUpGames(
    {
     nomeUsuario,
     usuarioJogos,
     closePopUp
    } :
    valoresPopUpAmigos){

    console.log("jogos do usuario", usuarioJogos)
    
    return(
        <>
            {/*Overlay */}
            <div className="fixed inset-0 bg-[black] opacity-70"></div>

            {/*PopUp */}
            <div
             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[40vh] bg-[#212429] rounded-md"
            >
                
                {/*CLOSE THE popUp */}
                <div>
                    <img
                        src={"/gerais/close.png"}
                        className="absolute top-4 right-2  p-2 bg-[#A0A0A0] rounded-[50%]"
                        onClick={() => closePopUp(null)}
                    />
                </div>

                {/*TITTLE, FRIENDS OF {NAME} */}
                <p className="mt-[20px] text-[18px] text-center text-center text-[white]">
                    Jogos de 
                    <span className="ml-1.5 underline">
                        {nomeUsuario}
                    </span>
                </p>

                {/*RENDER THE FRIENDS OR RENDER THE MESSAGE */}
                <div className="flex flex-col gap-4 w-[72vw] h-[30vh] overflow-y-auto mx-auto mt-5 ">

                    {usuarioJogos?.map((j) => {
                        return(
                            <Link key={j.id}
                        href={`/jogos/${j.id}`}
                         className="flex items-center gap-4"
                        >
                            <img
                                src={j.jogos?.foto_jogo}
                                className="w-[30vw] h-auto"
                            />
            
                            <p className=" text-[15px] text-[white] font-medium">
                                {j?.jogos.nome}
                            </p>
                        </Link>
                        )
                    })}
                </div>
            </div>
        </>
    )
}