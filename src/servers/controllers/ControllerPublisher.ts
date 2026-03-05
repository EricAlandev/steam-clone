import { getDataSource } from "@/lib/db";
import { Distribuidora } from "../entitys/EntityDistribuira";
import { CalculoPercentual, ConversorPrecos } from "@/lib/functions/ConversorValor";
import { Jogos } from "../entitys/EntityJogos";
import { Usuario } from "../entitys/EntityUsers";
import { SeguidoresJogos } from "../entitys/publisher/EntityFollowersDistribuidora";
import { MoreThan } from "typeorm";
import ConversorDate from "@/lib/functions/ConversorDate";


type body = {
    id: number,
    uid?: string
}

export async function PullDataPublisher(body: body){

    const {id, uid} = body;

    const AppDataSource = await getDataSource();

    //variable to know if the user its a follower or not
    let Follower = false;

    const publisherData = await AppDataSource.getRepository(Distribuidora).findOne(
        {
            where: {
                id: id
            },
            relations: {

                pivoOpcoesPublishers: {
                    opcoes: true
                },

   
                followers: {
                    usuario: true
                }
            }
        }
    )


    if(!publisherData){
        throw new Error("Sem dados de publisher")
    }

    console.log(publisherData);

    //IF UID exicsts, thats mean the user did the login; and now gonna find if he is a follow of the publisher;
    if(uid && uid !== ""){
        for(let i = 0; i < publisherData.followers.length; i++){
            const uidSeguidorAtual = publisherData.followers[i].usuario.uid;

            console.log("uid", uidSeguidorAtual, uid);

            if(uid === uidSeguidorAtual){
                Follower = true;
            }
        }
    }
    
    const publisher = {
        nome_distribuidora: publisherData?.nome_distribuidora,
        capa: publisherData?.capa,
        fundo: publisherData?.fundo,
        seguidores: publisherData?.seguidores
    }

    const opcoesPublisher = publisherData.pivoOpcoesPublishers;

    return {publisher: publisher,  follower: Follower, opcoesJogos: opcoesPublisher};
}

export async function PullGamesPublisher(id: number, categoria: string){
    const AppDataSource = await getDataSource();

    let condicao: any = {
        distribuidora: {
            id: id
        },
    }
    
    let coluna = "preco_desconto";
    let ordem: "ASC" | "DESC" = "ASC";

    switch(categoria){
        case("Maiores descontos"):
            condicao.preco_desconto = MoreThan(0)

            coluna = "preco_desconto";
            ordem = "ASC";
            break;

        case("Lançamentos"):
            coluna = "lancamento";
            ordem = "DESC";
            break;
    }
    
    console.log("condicao de search é",condicao);

    const jogos = await AppDataSource.getRepository(Jogos).find({
        where: condicao,
        relations: {
            distribuidora: true,
            avaliacoes: true
        },
        order: {
            [coluna]: ordem 
        }
    })

    if (!jogos){
        throw new Error("jogos da publisher inexistente");
    }
    
    const arrayJogos = jogos.map((j) => {
        const jogoAtual = {
            nome: j?.nome,
            foto_jogo: j?.foto_jogo,
            preco: ConversorPrecos(j?.preco),
            preco_desconto: ConversorPrecos(j?.preco_desconto),
            percentual: CalculoPercentual(j?.preco, j?.preco_desconto),
            lancamento: ConversorDate(j?.lancamento)
        }

        return jogoAtual;
    });

    console.log("array jogos",arrayJogos);


    return arrayJogos;
}

//Call Data Publisher
export async function AddNewFollower(uid: string, id: number){

    const AppDataSource = await getDataSource();

    const usuario = await AppDataSource.getRepository(Usuario).findOne({
        where: {
           uid: uid
        }
    });

    if(!usuario){
        throw new Error("Usuário não logado");
    }

    const idUsuario = usuario?.id;

    const publisherData = await AppDataSource.getRepository(Distribuidora).findOne(
        {
            where: {
                id: id
            }
            ,
            relations: {
                followers: true
            }
        }
    )

    if(!publisherData){
        throw new Error("Sem dados de publisher")
    }

    const idPublisher = Number(publisherData?.id);

    console.log("idPubli", idPublisher, "idUsuario", idUsuario);

    //verify if actually exists the follower line;
    const followerDistribuidora = await AppDataSource.getRepository(SeguidoresJogos).find(
        {
            where: {
                distribuidora: {id: idPublisher},
                usuario: {id: idUsuario}
            }
        }
    )  
    
    console.log("resultado do follower", followerDistribuidora);

    if(followerDistribuidora.length === 0){
        const atualizarPublisherData = await AppDataSource.getRepository(SeguidoresJogos).create({

            distribuidora: {id: idPublisher},
            usuario: {id: idUsuario}
        })
    
        const followerCriado = await AppDataSource.getRepository(SeguidoresJogos).save(atualizarPublisherData);
    
        if(!followerCriado){
                throw new Error("Can't finish the following. So the actual user its not following the publisher");
        }  

        const followsLength = (publisherData.followers.length) + 1;

        const distribuidoraUpdate = await AppDataSource.getRepository(Distribuidora).update(
            {id: idPublisher},
            {seguidores: followsLength}
        )

        if(distribuidoraUpdate.affected === 0){
            throw new Error("Fail in the publisher update");
        }
    }

    return({Mensagem : "atualizou o publisher followers"}); 
}