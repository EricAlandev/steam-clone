
import { getDataSource } from "@/lib/db";
import { Carrinho } from "../entitys/carrinho/EntityCarrinho";
import { Usuario } from "../entitys/EntityUsers";
import ConversorDate from "@/lib/functions/ConversorDate";
import { ConversorPrecos } from "@/lib/functions/ConversorValor";
import { UsuarioGames } from "../entitys/jogosUser/EntityUserGames";
import { Jogos } from "../entitys/EntityJogos";

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

    const game = await AppDataSource.getRepository(Carrinho).findOne({
        where: {
            jogos: {id: idJogo},
            usuarios: {id: idUsuario}
        },

        relations: {
            jogos: true
        }
    });

    if(!game){
        throw new Error("Dosn't exists this game in the cart of t he actual user");
    }

    const idGame = game?.id;

    const deletar = await AppDataSource.getRepository(Carrinho).delete({
        id: idGame
    })

    if(deletar.affected === 0){
        throw new Error("Não foi possível remover do carrinho");
    }
}

//PAY FOR THE GAMES

export const PayForGames = async(uid: string) => {

    const AppDataSource = await getDataSource();

    const usuario = await AppDataSource.getRepository(Usuario).findOne({
        where: {
            uid: uid
        }
    })

    if(!usuario){
        throw new Error("User dosn't exists");
    }

    const idUsuario = usuario?.id;

    const cartGames = await AppDataSource.getRepository(Jogos).find({
        where: {
            carrinho: {
                usuarios: {
                    id: idUsuario
                }
            }
        },
        relations: {
            carrinho: true
        }
    });

    if(cartGames.length === 0){
        throw new Error("Was not found games in the user cart");
    }

    if(cartGames.length > 0) {
        
        //Gonna iterate the array to add all of the games to the user;
        const jogos = cartGames.forEach(async (c) => {
            console.log("entered in the forEach");
            const games = await AppDataSource.getRepository(UsuarioGames).create({
                jogos: {id: c.id},
                usuarios: {id: idUsuario}
            })

            const saveGame = await AppDataSource.getRepository(UsuarioGames).save(games);

            console.log(saveGame)
        });

        const removeFromCart = await AppDataSource.getRepository(Carrinho).delete({
                usuarios: {id: idUsuario}
        });
    }

    return ({mensagem : "All of the games are added in the library of the user"})

}