
import { CalculoPercentual, ConversorPrecos } from "@/lib/functions/ConversorValor";
import { Jogos } from "../entitys/EntityJogos";
import { getDataSource } from "@/lib/db";
import ConversorDate from "@/lib/functions/ConversorDate";
import { Comentarios } from "../entitys/EntityComentarios";
import { ILike } from "typeorm";
import { preco } from "@/componentes/pages/PesquisaPage/HeaderPesquisa";

//types

type id = {
    idNumber: number
}

export type pesquisaRequest = {
    pesquisa: string,
    ordemPreco: string
}

//FILTRA JOGOS
export async function FiltraJogos(body : pesquisaRequest){

    const {pesquisa, ordemPreco} = body;

    //Define o tipo de order
    let colunaParaOrdenar = "preco";

    //Define a ordem da renderização dos propdutos;
    let ordem = "ASC";

    if (!pesquisa){
        throw new Error("Sem nada para pesquisar");
    }

    switch(ordemPreco){
        case "Maior Preço":
            colunaParaOrdenar = "preco";
            ordem = "DESC"
            break;
        
        case "Menor Preço":
            colunaParaOrdenar = "preco";
            ordem = "ASC"
            break;

        case "Nome":
            colunaParaOrdenar = "nome";
            ordem = "ASC"
            break;

        case "Lançamento":
            colunaParaOrdenar = "lancamento";
            ordem = "ASC"
            break;
    }

    const AppDataSource = await getDataSource();

    const puxarJogos = await AppDataSource.getRepository(Jogos).find({
        where: {nome: ILike(`%${pesquisa}%`)},
        relations: {
            categoria: true,
            avaliacoes: true
        },
        order: {
            [colunaParaOrdenar] : ordem as 'ASC' | 'DESC'
        }
    })

    if (puxarJogos.length === 0){
        throw new Error("Não achamos o que pesquisa");
    }   

    const quantidadeJogos = puxarJogos.length;

    //converte os valores

    const ArrayNovo = puxarJogos?.map((jogo) => {
        const valoresConvertidos = {
            id: jogo.id,
            nome : jogo.nome,
            foto_jogo : jogo.foto_jogo,
            preco_desconto : ConversorPrecos(jogo.preco_desconto),
            preco : ConversorPrecos(jogo.preco),
            aceitacao_jogo : jogo.avaliacoes.aceitacao_jogo,
            categorias : jogo.categoria
        }

        return valoresConvertidos
    })

    //retorna os jogos pesquisados;
    return {quantidadeJogos, ArrayNovo}
}

//Puxa Jogos 
export async function PuxarJogos(){

    const AppDataSource = await getDataSource();

    const jogosPuxado = await AppDataSource.getRepository(Jogos).find({
    order: {
        id: "ASC",
    },
    relations: {
        categoria: true
    }
    });

    if (jogosPuxado.length === 0){
        throw new Error("Nenhum jogo encontrado");
    }
    
    //preço do jogos 


    const JogosConvertidos = jogosPuxado.map((jogo) => {

        const jogosPuxado = {
            id: jogo.id,
            nome: jogo.nome,
            descricao: jogo.descricao,
            lancamento: jogo.lancamento,
            foto_destaque: jogo.foto_destaque,
            foto_jogo: jogo.foto_jogo,
            preco: ConversorPrecos(jogo.preco),
            preco_desconto: ConversorPrecos(jogo.preco_desconto),
            percentual: CalculoPercentual(jogo.preco, jogo.preco_desconto),
            categorias: jogo.categoria
        }

        return jogosPuxado
    })

    return JogosConvertidos
    
}

//Puxa Detalhe de Jogos
export async function DetalheJogos({idNumber} : id){

    //verifica se precisa inicializar o pool
    const AppDataSource = await getDataSource();

    //puxa os jogos pelo id
    const DetalheJogos = await AppDataSource.getRepository(Jogos).findOne({
     where : {id: idNumber},
     relations: {
        desenvolvedor: true,
        distribuidora: true,
        categoria: true,
        slides: true,
        comentarios: true,
        avaliacoes: true
     }
    })


    if (!DetalheJogos) {
        throw new Error("Jogo não encontrado");
      }

      console.log(DetalheJogos.avaliacoes); 

      // Retorno formatado
      return {
        id: DetalheJogos.id,
        nome: DetalheJogos.nome,
        descricao: DetalheJogos.descricao,
        lancamento: ConversorDate(DetalheJogos.lancamento),
        foto_destaque: DetalheJogos.foto_destaque,
        foto_jogo: DetalheJogos.foto_jogo,
        preco: ConversorPrecos(DetalheJogos.preco),
        preco_desconto: ConversorPrecos(DetalheJogos.preco_desconto),
        percentual: CalculoPercentual(DetalheJogos.preco, DetalheJogos.preco_desconto),
        desenvolvedor_id: DetalheJogos.desenvolvedor.id,
        nomedesenvolvedor: DetalheJogos.desenvolvedor.nomedesenvolvedor,

        distribuidora_id: DetalheJogos.distribuidora.id,
        nome_distribuidora: DetalheJogos.distribuidora.nome_distribuidora,

        aceitacao_jogo: DetalheJogos.avaliacoes.aceitacao_jogo,
        quantidade_comentarios: DetalheJogos.avaliacoes.quantidade_comentarios,
        
        categorias: DetalheJogos.categoria,
        slides: DetalheJogos.slides,
        comentarios: DetalheJogos.comentarios
      };
}


type body = {
    recomenda?: boolean,
    comentario?: string, 
    idJogo?: number
}

type TypeBody = {
    body: body
}

export default async function AdicionarComentario({body}: TypeBody){

    const {comentario , recomenda, idJogo} = body;

    console.log(comentario , recomenda, idJogo)

    if (!comentario){
        throw new Error("Sem comentário")
    }

    if (recomenda === null){
        throw new Error("Sem recomendação.")
    }

    if (!idJogo){
        throw new Error("Sem jogo especificado")
    }

    const AppDataSource = await getDataSource();

    const agora = new Date();

    const adicionarUsuario = AppDataSource.getRepository(Comentarios).create({
        recomenda,
        comentario, 
        data_publicacao: agora,
        jogos: {id: idJogo}
    })


    await AppDataSource.getRepository(Comentarios).save(adicionarUsuario)
}