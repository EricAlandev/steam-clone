import ConversorDate from "@/lib/functions/ConversorDate"
import { comentarios } from "@/servers/types/TypeJogos"


type TypeComentarioUser = comentarios & {
    PagePertenceAoUser: boolean,

    deletarComentario?: () => void
}


export default function EsqComentUser({
    usuario,
    data_publicacao,
    comentario,
    PagePertenceAoUser,

    deletarComentario
} : TypeComentarioUser){


    const data = ConversorDate(data_publicacao)

    let pageEdoUser = null;
    if (PagePertenceAoUser === true){
         pageEdoUser = true;
    }

    return(
        <div className="w-[95vw] min-h-[10vh] mx-auto bg-[#16202D] ">

            <div className="relative flex pt-4 pl-3 pr-3  gap-4 text-[14px] ">

                {/*Lado Esquerdo Comentário */}
                <div>
                    {/*Foto perfil */}
                    <img
                    src={usuario?.foto_perfil}
                    alt=""
                    className="min-w-[12vw] max-w-[12vw]                
                                min-h-[12vw] max-h-[12vw] rounded-md
                            "
                    /> 
                </div>  

                {/*Lado Direito */}
                <div>
                    {/*Nome */}
                    <div className="flex gap-2">
                        <p className=" text-[white] uppercase">{usuario?.email}</p>
                    
                        {/*Data de publicação */}
                        <p className=" text-[gray]  uppercase">
                            {data}
                        </p>

                        
                        {pageEdoUser && (
                            <>
                                {/*Lixeira */}
                                <img
                                    src={"/gerais/trash.png"}
                                    className="absolute right-1.5 p-1 cursor-pointer"
                                    onClick={deletarComentario}
                                />
                            </>
                        )}
                    </div>

                    <div className=" min-h-[50px]  pl-2 pr-2 ">
                        <p className="max-h-[50px] mt-2 pl-1.5 pb-2 text-[white] overflow-y-auto">
                            {comentario}
                        </p>
                    </div>
                </div>
            </div>  
        </div>
    )
}