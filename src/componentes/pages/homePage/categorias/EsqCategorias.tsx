type nomeCategoria = {
    nomeCategoria: string
}


export default function EsqCategorias({nomeCategoria}: nomeCategoria){

    //Define the background of the category
    let backgroundTheme = "/login/imagemFundo.webp"

    switch(nomeCategoria){
        case "Terror":
            backgroundTheme = "/categoriasJogos/Terror.webp"
            break;

        case "Acao":
            backgroundTheme = "/categoriasJogos/Acao.webp"
            break;

        default:
            break
    }

    return( 
        <>
            <div 
                className="relative min-w-[50px] max-w-[200px] h-[12.5vh] border-[white] border-[2px] rounded-sm"
            > 

                {/*Layout */}
                <div className="fixed inset-0 bg-[black] opacity-50"></div>

                {/*Background image */}
                <img 
                    src={backgroundTheme}
                    className=""
                />

                <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  text-[white] z-10">{nomeCategoria}</p>
            </div> 
        </>   
    )
}