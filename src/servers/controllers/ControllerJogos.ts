
import { CalculoPercentual, ConversorPrecos } from "@/lib/functions/ConversorValor";
import { Jogos } from "../entitys/EntityJogos";
import { getDataSource } from "@/lib/db";
import ConversorDate from "@/lib/functions/ConversorDate";
import { Comentarios } from "../entitys/EntityComentarios";
import { ILike, LessThan } from "typeorm";
import { OpcoesTiposJogos } from "../entitys/opcoes/OpcoesTipoJogos";


//types

type id = {
    idNumber: number
}

export type pesquisaRequest = {
    pesquisa: string,
    pesquisaCategoria: string,
    ordemPreco: string
}


type body = {
    recomenda?: boolean,
    comentario?: string, 
    idJogo?: number,
    idUsuario?: string
}

type TypeBody = {
    body: body
}


//FILTRA JOGOS
export async function FiltraJogos(body : pesquisaRequest){

    const {pesquisa, pesquisaCategoria, ordemPreco} = body;

    if(!pesquisa && !pesquisaCategoria){
        throw new Error("Nenhum dado de pesquisa preenchido");
    }
    
    //pool
    const AppDataSource = await getDataSource();

    //array type
    let valueReturn: Jogos[] = [];
    let quantityGames = null;

    console.log(pesquisa, pesquisaCategoria);

    //TYPE SEARCH
    if(pesquisa){
         //Define o tipo de order
        let colunaParaOrdenar = "preco";

        //Define a ordem da renderização dos propdutos;
        let ordem = "ASC";
        
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
                ordem = "DESC"
                break;
        }

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

    
        quantityGames = quantidadeJogos;
        valueReturn = puxarJogos;
    }

    //TYPE CATEGORY SEARCH
    else if(pesquisaCategoria){

        console.log("Entrou pesquisaCategoria");

        const puxarJogos = await AppDataSource.getRepository(Jogos).find(
            {
                where: {
                    categoria: {nome_categoria: pesquisaCategoria}
                },
                relations: {
                    categoria: true,
                    avaliacoes: true
                }
            }
        )

        if(puxarJogos.length === 0){
            throw new Error("Nenhum jogo encontrado");
        }

        console.log(puxarJogos);

        const quantidadeJogos = puxarJogos.length;

        quantityGames = quantidadeJogos;
        valueReturn = puxarJogos;
    }

    if(valueReturn.length > 0){
        //converte os valores
        const ArrayNovo = valueReturn?.map((jogo) => {
            const valoresConvertidos = {
                id: jogo.id,
                nome : jogo.nome,
                foto_jogo : jogo.foto_jogo,
                preco_desconto : ConversorPrecos(jogo.preco_desconto),
                preco : ConversorPrecos(jogo.preco),
                aceitacao_jogo : jogo.avaliacoes.aceitacao_jogo,
                categorias : jogo.categoria
            }

            return(valoresConvertidos);
        })

        return {ArrayNovo, quantityGames};
    }
}

//Puxa Jogos 
export async function PuxarJogosDestaques(){

    const AppDataSource = await getDataSource();

    const jogosPuxado = await AppDataSource.getRepository(Jogos).find({
    where: {
        categoria: {
            nome_categoria: "Destaque"
        }
    },
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

export async function PuxarJogosAteCertoValor(valor: string){

    if(valor === undefined){
        throw new Error("Nenhum valor definido pra puxar");
    }

    
    //convert the number and multiply with 100, to become possible to pull;
    const convertedValue = Number(valor) * 100;

    const AppDataSource = await getDataSource();

    const jogosPuxado = await AppDataSource.getRepository(Jogos).find({
    where: [
        {preco:  LessThan(convertedValue)},
        {preco_desconto:  LessThan(convertedValue)},
    ],
    order: {
        id: "ASC"
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
        comentarios: {
            usuario: true
        },
        avaliacoes: true,
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
        comentarios: DetalheJogos.comentarios,
      };
}

export default async function AdicionarComentario({body}: TypeBody){

    const {comentario , recomenda, idJogo, idUsuario} = body;

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

    if (!idUsuario){
        throw new Error("Usuário não logado")
    }

    const AppDataSource = await getDataSource();

    const agora = new Date();

    const adicionarUsuario = AppDataSource.getRepository(Comentarios).create({
        recomenda,
        comentario, 
        data_publicacao: agora,
        jogos: {id: idJogo},
        usuario: {id: idUsuario}
    })


    await AppDataSource.getRepository(Comentarios).save(adicionarUsuario)
}



//PULL THE OPTIONS OF THE GAMES
export async function PuxarTipoJogos(tipoJogo: string){
    console.log(tipoJogo);

    const AppDataSource = await getDataSource();

    //pull the chooses of the user;
    const tipos = await AppDataSource.getRepository(OpcoesTiposJogos).find();

    if(tipos.length === 0){
        throw new Error("Nenhum tipo");
    }

    //pull the games of the type;
    const games = await AppDataSource.getRepository(Jogos).find(
        {
            where: {
                categoria: {
                    nome_categoria: tipoJogo
                }
            },
            relations: {
                categoria: true,
                
            }
        }
    )

    console.log("games", tipos ,"tipos",tipoJogo);
    
    if(games.length === 0){
        throw new Error("Nenhum jogo puxado");
    }

    //preço do jogos 
    const JogosConvertidos = games.map((jogo) => {

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

    return {jogos: JogosConvertidos, tipos};
}