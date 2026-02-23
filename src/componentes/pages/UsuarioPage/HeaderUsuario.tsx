
import { TypeAmigos } from "@/app/usuario/[id]/page";
import { TypeUsuario } from "@/servers/types/TypeUsuario"
import Link from "next/link"

type HeaderUsuario = TypeUsuario & {
    amigos: TypeAmigos[],
    tipoPopUp: (tipo: string) => void,
    adicionarAmigo: (id: number) => void,
    deletarAmigo: (id: number) => void
}

export default function HeaderUsuario({
    foto_perfil,
    nome,
    pais,
    descricao,
    nivel,

    //Verificar se a page é do próprio usuário ou não.
    idPage,
    idUsuario,

    amigos,

    adicionarAmigo,
    deletarAmigo,

    tipoPopUp
} : HeaderUsuario){

    //Verify the country of the user and them, put the image of his country;
    let bandeiraPais;

    switch(pais){
        case "Brasil":
         bandeiraPais = "/usuarios/bandeiras/brasil.png"
    }

    //Iterate all the friends to know if its a friend or not;
    const quantidadeAmigos = amigos?.length;

    let estadoAmizade = "Não amigos";

    if(idPage === idUsuario){
        estadoAmizade = "Você";
    }

    //Verify if the the user logged its actually friend of the user of the page
    if(estadoAmizade && estadoAmizade !== "Você"){
        for(let i = 0; i < quantidadeAmigos; i++){
            const amigo1 = amigos[i].usuario1.id;
            const amigo2 = amigos[i].usuario2.id;

            console.log(amigo1,amigo2)

            if(Number(amigo1) === Number(idUsuario) ||
               Number(amigo2) === Number(idUsuario)
            ){
                estadoAmizade = "amigos";
                break;

            } 
        }
    }

    console.log(amigos,estadoAmizade);

    
    
    return(
        <>  
            {/*Data of the user; */}
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

            {/*Amigos*/}
            <div className="flex items-center w-[86vw] gap-3 mx-auto">
                <p className="text-[20px] text-[white] hover:underline"
                onClick={() => tipoPopUp("Amigos")}
                >
                    Amigos
                </p>

                <span className="px-3 py-1 text-[white] bg-[#A1A1A1]
                  rounded-[50%]
                  ">
                    {quantidadeAmigos || 0}
                </span>

                {/*Imagens do amigos */}
                {amigos?.map((a) => (
                    <img
                        key={a.id}
                        src={a.foto_perfil}
                    />
                ))}
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

                
            {/*YOU - EDIT PROFILE */}
            {estadoAmizade === "Você" && (
                <>
                    <div className="w-[86.5vw] mx-auto mt-8">
                        {/*Editar */}
                            <Link href="/usuario/Edicao"
                            className="block max-w-[110px] p-2.5 text-[16px] text-[#A0A0A0] text-center bg-[#35414F] rounded-md "
                            >
                                Editar Perfil
                            </Link>
                    </div>
                </>
            )}

            {/*FRIENDS - RENDER UNFRIEND BUTTON */}
            {estadoAmizade === "amigos" && (
                <>
                    <div className="w-[86.5vw] mx-auto mt-8">
                        {/*Editar */}
                            <div
                            className="block max-w-[110px] p-2.5 text-[16px] text-[#A0A0A0] text-center bg-[#35414F] rounded-md "
                            onClick={() => deletarAmigo(Number(idPage))}
                            >
                                Amigos
                            </div>
                    </div>
                </>
            )}

            {/*NOT FRIENDS - RENDER ADD button */}
            {estadoAmizade === "Não amigos" && (
                <>
                    <div className="w-[86.5vw] mx-auto mt-8">
                        {/*Editar */}
                            <div
                            className="block max-w-[110px] p-2.5 text-[16px] text-[#A0A0A0] text-center bg-[#35414F] rounded-md "
                            onClick={() => adicionarAmigo(Number(idPage))}
                            >
                                Adicionar
                            </div>
                    </div>
                </>
            )}
        </>
    )
}