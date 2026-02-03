import { ParamValue } from "next/dist/server/request/params"


export type TypeUsuario = {
    uid?: string,
    foto_perfil? : string,
    nome? : string,
    email? : string,
    pais? : string,
    descricao? : string
    nivel? : number,

    idPage?: ParamValue, //para verificar se o id da page é igual ao do usuário
    id?: string, //Pra mandar o id do usuário
    idUsuario?: string
}