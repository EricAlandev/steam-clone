
import { getDataSource } from "@/lib/db";
import { Carrinho } from "../entitys/carrinho/EntityCarrinho";
import { Usuario } from "../entitys/EntityUsers";
import ConversorDate from "@/lib/functions/ConversorDate";
import { ConversorPrecos } from "@/lib/functions/ConversorValor";

type IdsParaCarrinhos = {
    idJogo: number,
    uidUsuario: string
}

type IdsParaTirarCarrinho = {
    uid: string,
    idJogo: number
}

export async function PuxarCarrinho(uid: string){
    
    const AppDataSource = await getDataSource();

    //procura o usuário primeiro
    const usuario = await AppDataSource.getRepository(Usuario).findOne({
        where: {uid: uid}
    })

    if (!usuario){
        throw new Error("Usuário não existente");
    }

    const idUsuario = usuario.id;

    const jogosNoCarrinho = await AppDataSource.getRepository(Carrinho).find({
        where: {usuarios: {id: idUsuario}},
        relations: {
            jogos: true,
            usuarios: true
        }
    })
    
    if(jogosNoCarrinho.length === 0){
        return null
    }

    //conta o valor dos jogos
    let valorEstimado = jogosNoCarrinho.reduce((objeto : any, valorAtual) => {
        
        if (!valorAtual.jogos.preco_desconto && valorAtual.jogos.preco){
            return objeto + valorAtual.jogos.preco
        }

        else if(valorAtual.jogos.preco_desconto && valorAtual.jogos.preco){
            return objeto + valorAtual.jogos.preco_desconto
        }
    }, 0);

    valorEstimado = ConversorPrecos(valorEstimado);

    //percorre a array e decodifica
    const jogosCarrinhos = jogosNoCarrinho.map((jogo) => (
        {
        id: jogo.jogos.id,
        nome: jogo.jogos.nome,
        foto_jogo: jogo.jogos.foto_jogo,
        preco: ConversorPrecos(jogo.jogos.preco),
        preco_desconto: ConversorPrecos(jogo.jogos.preco_desconto),
        descricao: jogo.jogos.descricao,
        lancamento: ConversorDate(jogo.jogos.lancamento),
        }
    ))

    return{jogosCarrinhos, valorEstimado}
}

export async function adicionarAoCarrinho(bodyNovo : IdsParaCarrinhos){
    const {idJogo, uidUsuario} = bodyNovo;

    console.log(bodyNovo);
    console.log("Entrou no Adicionar Carrinho")

    const AppDataSource = await getDataSource();

    //verifica se já existe o usuário
    const usuario = await AppDataSource.getRepository(Usuario).findOne({
        where: {uid: uidUsuario}
    })

    if (!usuario){
        throw new Error("Usuário não identiificado");
    }

    const idUsuario = usuario.id;

    //adiciona o item ao carrinho
    const AdicionarAoCarrinho = await AppDataSource.getRepository(Carrinho).create({
            usuarios: {id: idUsuario},
            jogos: {id: idJogo}
        })

    const adicionadoAoCarrinho = await AppDataSource.getRepository(Carrinho).save(AdicionarAoCarrinho);

    if (!adicionadoAoCarrinho || adicionadoAoCarrinho.id === null){
            throw new Error("Falha ao adicionar no carrinho")
    }

    const mensagemRetorno = "Adicionado com sucesso o jogo"

    return mensagemRetorno;
}


export async function deletar({uid, idJogo} : IdsParaTirarCarrinho){

    const AppDataSource = await getDataSource();

    const usuario = await AppDataSource.getRepository(Usuario).findOne({
        where: {uid: uid}
    })

    if (!usuario){
        throw new Error("Sem usuário existente");
    }

    const idUsuario = usuario?.id;

    const deletar = await AppDataSource.getRepository(Carrinho).delete({
        jogos: {id: idJogo},
        usuarios: {id: idUsuario}
    })

    if(deletar.affected === 0){
        throw new Error("Não foi possível remover do carrinho");
    }


}