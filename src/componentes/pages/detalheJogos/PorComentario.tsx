
'use client'

import { useState } from "react"

type TipoComentario = {
    comentario : string,
    gostou: boolean,
}

type foto_perfil = {
    foto_perfil?: string;
    dados: (comentario : TipoComentario) => void;
}

export default function PorComentario({foto_perfil, dados} : foto_perfil){
    
    //todos os values
    const [comentario, setComentario] = useState<TipoComentario>({comentario : "", gostou: false});

    const PegaValues =  (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setComentario((coment) => 
        ({...coment , [name] : value})
        )
    }


    //valor de click
    const [clicado, setClicado] = useState<string>("");
    return(
        <div className=" ml-4 mr-4 ">

            {/*Adicionar comentário */}
            <div className="flex flex-col items-center pt-4 p-2 gap-2 bg-[#4D5C6A] ">

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
                            dados(comentario) ;
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

                {/*Gostou ou não */}
                <div className="flex items-center gap-2 mt-2 mb-2">
                        {/*Gostou */}
                        <img
                            
                            src={"/gerais/like.png"}
                            className={`min-w-[20px] max-w-[40px]  border-[2px] border-[#45ACFF] rounded-[50%]
                                
                            ${clicado === "gostei" ? 
                                    "bg-[#000000] border-[gray] duration-300" 
                                    : 
                                    "bg-[#30353F]"
                            }
                            `}
                            onClick={() => 
                                {
                                    setClicado("gostei");
                                    setComentario((coment) => (
                                    {
                                        ...coment, gostou : true
                                    }
                                ))
                                }}
                        />

                        {/*Não Gostou */}
                        <img
                            src={"/gerais/like.png"}
                            className={`min-w-[20px] max-w-[40px] rotate-180 border-[2px] border-[#45ACFF] rounded-[50%]
                                
                                ${clicado === "não gostei" ? 
                                    "bg-[#000000] border-[gray] duration-300" 
                                    : 
                                    "bg-[#30353F]"
                                }
                                `}
                            onClick={() => 
                                {
                                    setClicado("não gostei");
                                    setComentario((coment) => (
                                        {...coment, gostou : false}
                                    ))
                                }    
                            }
                        />
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