
import { TypeUsuario } from "@/servers/types/TypeUsuario"
import Link from "next/link"

export default function HeaderUsuario({
    foto_perfil,
    nome,
    email,
    pais,
    descricao,
    nivel,

    idPage,
    idUsuario
} : TypeUsuario){

    //Atribui a bandeira do país da pessoa
    let bandeiraPais;

    switch(pais){
        case "Brasil":
         bandeiraPais = "/usuarios/bandeiras/brasil.png"
    }
    
    //Serve para converter em string e poder comparar com idUsuário que tb é string;
    const idPageConvertido = idPage?.toString();
    console.log(typeof(idPageConvertido), "pageConvertido")

    return(
        <>  
            {/*Dados do usuário */}
            <div className="flex items-center w-[95vw] h-[20vh] mx-auto gap-4 p-2  rounded-md">
            {/* */}
                <img
                    src={foto_perfil}
                    className=" w-[100px] h-[100px] ml-2 border-[2px] border-[gray] rounded-md"
                />

                {/*Dados Usuário */}
                <div className="flex flex-col gap-2">
                    <p className="text-[16.5px] text-[white]">
                        {nome} 
                    </p>

                    <p className="w-max pb-1 text-[13px] text-[white] border-b-[1.5px]">    
                        {descricao}
                    </p>

                    {/*País de origem */}
                    <div className="flex items-center gap-2">
                        <img
                            src={bandeiraPais}
                            className="block w-7.5 h-7.5"
                        />

                        <p className="text-[14.5px] text-[white]">
                            {pais}
                        </p>
                    </div>
                </div>
            </div>

            {/*nível usuário */}
            <div className="flex items-center w-[86vw] gap-3 mx-auto">
                <p className="text-[20px] text-[white]">
                    Nível 
                </p>

                <span 
                  className="px-3 py-1 text-[white] bg-[#A1A1A1]
                  rounded-[50%]
                  "
                >  {nivel}
                </span>
            </div>

                <div className="w-[86.5vw] mx-auto mt-8">
                    {/*Editar */}
                    <Link href="/usuario/Edicao"
                     className="block max-w-[110px] p-2.5 text-[16px] text-[#A0A0A0] text-center bg-[#35414F] rounded-md "
                    >
                        Editar Perfil
                    </Link>
                </div>
            
            {/*id usuário pra verificar se a conta é sua. */}
            {idUsuario === idPageConvertido && (
                <></>
            )}
        </>
    )
}