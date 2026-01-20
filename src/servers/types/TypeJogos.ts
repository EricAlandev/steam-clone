
import { categorias } from "./TypeCategoria"
import { slides } from "./TypeSlides"

export type comentarios = {
    nome: string,
    foto_perfil: string,
    recomenda: boolean,
    data_publicacao: string,
    comentario: string
}
//Type do objeto jogos;
export type jogos = {
    id?: number,
    nome?: string,
    descricao?: string,
    lancamento?: string,
    foto_destaque?: string,
    foto_jogo?: string,
    percentual?: number,
    preco?: number,
    preco_desconto?:number,
    categorias?: categorias[],

    desensolvedor_id?: number,
    nomedesenvolvedor?: string,
    distribuidora_id?: number,
    nome_distribuidora?: string,

    aceitacao_jogo?: string,
    quantidade_comentarios?: number,
    
    slides?: slides[],
    comentarios?: comentarios[]
}

//Type para receber esses objetos em forma de array
export type ObjetoJogos = {
    jogos: jogos[]
}