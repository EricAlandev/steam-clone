
import { TypeAmigos } from "@/app/usuario/[id]/page";
import Link from "next/link";


type valoresPopUpAmigos = {
    idUsuarioAtual : string,
    nomeUsuario: string,
    amigos: TypeAmigos[],
    closePopUp: (close : null) => void;
}

export default function EsqPopUpAmigos(
    {
     idUsuarioAtual,
     nomeUsuario, 
     amigos,
     closePopUp
    } :
    valoresPopUpAmigos){
    
    
    //Verifica qual é o usuário nas duas colunas e define que vai mostrar o outro usuário
    const ArrayConvertida = amigos.map((a) => {

            const usuario = String(a.usuario1.id) === idUsuarioAtual
              ? a.usuario2
              : a.usuario1;

                return(
                <Link key={a.id}
                href={`/usuario/${usuario.id}`}
                 className="flex items-center gap-4"
                >
                    <img
                        src={usuario.foto_perfil}
                        className="h-10 w-10 rounded-md"
                    />
    
                    <p className="text-[20px]">{usuario.nome}</p>
                </Link>
                )
            }
        )
    
    return(
        <>
            {/*Overlay */}
            <div className="fixed inset-0 bg-[black] opacity-70"></div>

            {/*PopUp */}
            <div
             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[40vh] bg-[white] rounded-md"
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
                <p className="mt-[20px] text-[18px] text-center">Amigos do 
                    <span className="ml-1.5 underline">{nomeUsuario}</span>
                </p>

                {/*RENDER THE FRIENDS OR RENDER THE MESSAGE */}
                <div className="w-[60vw] h-[30vh] overflow-y-auto mx-auto mt-5 ">
                    {ArrayConvertida.length > 0 ? ArrayConvertida : (
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        
                        w-[60vw]
                        ">
                            <p> {nomeUsuario} atualmente não tem amigos.</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}