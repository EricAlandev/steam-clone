import { ParamValue } from "next/dist/server/request/params"


type TypeAmigos = {
    amigo1: TypeUsuario[],
    amigo2: TypeUsuario[]
}

export type TypeUsuario = {
    uid?: string,
    foto_perfil? : string,
    nome? : string,
    email? : string,
    pais? : string,
    descricao? : string
    nivel? : number,

    idPage?: number, //para verificar se o id da page é igual ao do usuário
    id?: string, //Pra mandar o id do usuário
    idUsuario?: string,
    amigos?: TypeAmigos[]
}