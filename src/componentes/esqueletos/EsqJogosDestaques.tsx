
'use client'

import { useState } from "react"

import { categorias } from "@/servers/types/TypeCategoria";
import Link from "next/link";

//types
type Jogo ={
    nome_jogo?: string,
    foto_destaque?: string,
    foto?: string,
    percentual?: number,
    preco?: number,
    precoDesconto?: number,
    categorias?: categorias[]
    idJogo?: number
}


export default function EsqJogosDestaques({
    idJogo,
    nome_jogo,
    foto_destaque,
    foto,  
    percentual ,
    preco, 
    precoDesconto,
    categorias
}: Jogo){

    const [hover, setHover] = useState(false);

    const fotoJogo = foto_destaque || foto

    return(
        <>
            <Link
            href={`/jogos/${idJogo}`}
            className={`relative  h-[40vh] md:h-[49.5vh] md:w-[20vw] md:min-w-[350px]`}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
              {/*Hover - se tiver ele aparece o nome na tela do jogo */}
              {hover ? (
                <>
                    
                    {/*Com Hover */}
                    <div className="z-10 h-[40vh] md:h-[49.5vh] bg-gradient-to-r from-[#102D56] to-[#105169] ">
                        <img
                            src={foto}
                            className=""
                        />

                        {/*Nome Jogo + Categorias */}
                        <div className="">
                            {/*Nome */}
                            <p className="nomeJogo">
                                {nome_jogo}
                            </p>

                            {/*Categorias */}
                            <div className="grid grid-cols-2 gap-2 mt-2 ml-2 mr-2 md:grid-cols-3">
                                {categorias?.map((categoria) => (
                                    <>
                                        <p className="categoriasJogo">{categoria.nome_categoria}</p>
                                    </>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                                    {/*Verifica se existe ou não o desconto*/}
                <div className="absolute z-10 bottom-0 right-0 
                  min-w-[150px] flex
                bg-[#1A1D24]  md:hover:bg-[#071631]
                "
                >
                    <p className="percentual ">
                        {percentual}%
                    </p>

                    {precoDesconto ? (
                        <div className="flex items-center justify-center gap-2.5  pt-1 pl-2 pb-1 pr-2">
                            <p className="preco_desconto">
                                {preco}
                            </p>    

                            <p className="preco">
                                {precoDesconto}
                            </p>
                        </div>
                        
                    ) : (
                        <p className="preco">
                        {preco}
                        </p>
                    )}
                </div>    
                    
                
                </>
               ) : (
                <>
                <img
                    src={fotoJogo}
                    className="h-[40vh] md:h-[49.5vh] "
                />


                {/*Verifica se existe ou não o desconto*/}
                <div className="absolute z-10 bottom-0 right-0 
                  min-w-[150px] flex
                bg-[#1A1D24]  md:hover:bg-[#071631]
                "
                >
                    <p className="percentual ">
                        {percentual}%
                    </p>

                    {precoDesconto ? (
                        <div className="flex items-center justify-center gap-2.5  pt-1 pl-2 pb-1 pr-2">
                            <p className="preco_desconto">
                                {preco}
                            </p>    

                            <p className="preco">
                                {precoDesconto}
                            </p>
                        </div>
                        
                    ) : (
                        <p className="preco">
                        {preco}
                        </p>
                    )}
                </div>    
                </>
              )}

                
            </Link>
        </>
    )
}