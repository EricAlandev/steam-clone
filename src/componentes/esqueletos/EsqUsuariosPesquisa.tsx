

type UsuariosPesquisa = {
    nome?: string,
    foto?: string
}

export default function EsqUsuariosPesquisa({nome, foto} : UsuariosPesquisa){

    return(
        <div className="flex justify-between items-center w-[85vw] mx-auto px-2.5 py-2.5 bg-[#000000] rounded-md">  
                {/*Usuário + Perfil */}
                <div className="flex items-center gap-4">
                    <img
                        src={foto}
                        className="min-w-[20px] max-w-[60px] min-h-[20px] min-h-[60px] rounded-md"
                    />

                    <p className="max-w-[150px] truncate text-[white]">{nome}</p>
                </div>

                {/*Adicionar aos amigos */}
                <div>
                    <button
                     className=" p-2.5  text-[white] bg-[#2A475E] rounded-md"
                    >
                       Adicionar
                    </button>
                </div>
        </div> 
    )
}