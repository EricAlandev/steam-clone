
'use client'

import { useState } from "react"

type TipoComentarioU = {
    comentario : string
}

type foto_perfil = {
    foto_perfil?: string;
    dados: (comentario : string) => void;
}

export default function PorComentariosU({foto_perfil, dados} : foto_perfil){
    
    //todos os values
    const [comentario, setComentario] = useState<TipoComentarioU>({comentario : ""});

    const PegaValues =  (e : React.ChangeEvent<HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setComentario((coment) => 
        ({...coment , [name] : value})
        )
    }

    return(
        <div className="w-[95vw] mx-auto">

            {/*Adicionar comentário */}
            <div className="flex flex-col items-center mt-10 pt-4 p-2 gap-2 bg-[#4D5C6A] rounded-md ">

                {/*Comentário */}
                <div className="flex items-center gap-2">
                    <img
                        src={foto_perfil}
                        className="min-w-[11vw] max-w-[11vw]                
                            min-h-[11vw] max-h-[11vw] rounded-md
                        "
                    />

                    <form
                        id="envio"
                        action={"/enviar"}
                        onSubmit={(e) => {
                            e.preventDefault();
                            dados(comentario.comentario) ;
                        }}
                    >
                        <textarea
                            name="comentario"
                            value={comentario.comentario}
                            onChange={PegaValues}
                            placeholder="Comentar"
                            className="min-w-[75vw] p-2

                            border-[1px] border-[gray]
                            placeholder:italic placeholder:text-[gray] rounded-md"
                        />
                    </form>
                </div>

                <button 
                type="submit" 
                form="envio"
                className="login_button"
                >
                    Comentar
                </button>
            </div>

        </div>
    )
}