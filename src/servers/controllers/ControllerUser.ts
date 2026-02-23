

//entitys
import { Usuario } from "../entitys/EntityUsers";

//pool
import { getDataSource } from "@/lib/db";

import { Dado } from "@/componentes/pages/authentication/cadastro/CadastroForm";
import { LoginIdentificador } from "@/app/login/page";
import { Pesquisa } from "@/componentes/pages/PesquisaUsuariosPage/HeaderPesquisaUser";
import { ILike } from "typeorm";
import { TypeUsuario } from "../types/TypeUsuario";
import { ComentariosUser } from "../entitys/comentarios/EntityComentarioUser";
import { Amigos } from "../entitys/amigos/EntityAmigos";

//types
type dadosComentario = {
    uid?: string, 
    idUserTeraComentario?: number,
    comentario: string
}

type proUpdateUser = {
    foto_perfil?: string,
    nome? : string,
    descricao?: string,
    pais?: string, 

}



export async function CadastrarUsuario(dados: Dado){

    const {uid, email} = dados;

    //verifica/inicializa o pool
    const AppDataSource = await getDataSource();

    //cadastra usuário

    const User = AppDataSource.getRepository(Usuario).create({
        uid: uid,
        email: email,
        foto_perfil: "/jogos/distribuidora/wallpaper/WallpaperPadrao.png"
    })

    const criarUser = await AppDataSource.getRepository(Usuario).save(User);

    const mensagem = "usuário cadastrado"

    return mensagem;
}

export async function LoginUsuario(dados: LoginIdentificador){

    const {uid} = dados;

    //verifica/inicializa o pool
    const AppDataSource = await getDataSource();

    //login usuário
    const User = await AppDataSource.getRepository(Usuario).findOneBy(
        {uid: uid}
    )

    if (!User){
        throw new Error("Usuário não existente no database");
    }

    return User;
}


//Pesquisa usuários
export async function PesquisaUsuarios(pesquisa: Pesquisa, uid: string){
    const AppDataSource = await getDataSource();
    
    const PuxarUsuarios = await AppDataSource.getRepository(Usuario).find({
        where : {nome: ILike(`%${pesquisa.pesquisa}%`)},
        relations: {
            amigo1: {
                usuario1: true,
                usuario2: true
            },
            amigo2: {
                usuario1: true,
                usuario2: true
            },
        }
    })

    //verifica se teve algum retorno
    if (PuxarUsuarios.length === 0){
        throw new Error("Usuário(os) não encontrado");
    }

    //usuário
    const usuario = await AppDataSource.getRepository(Usuario).findOne({
        where: {uid: uid}
    })

    if(!usuario){
        throw new Error("Usuário inexistente");
    }

    const idUsuario = usuario?.id;

    //Verify if they actually are friends;
    const amigoOuNao = PuxarUsuarios.map((u) => {

        let estadoAmizade = "Não Amigos";

        const todasRelacoes = [...(u.amigo1 || []), ...(u.amigo2 || [])];

        //Verify if in the result of search, result you.
        if(u.id === idUsuario){
            estadoAmizade = "Você"
        } 

        if(estadoAmizade !== "Você"){
            //Verify if the user who send the search and the user result of the search are actually friends;
            for (let i = 0; i < todasRelacoes.length; i++) {
                const relacao = todasRelacoes[i];

                let amigo1 = relacao.usuario1.id;
                let amigo2 = relacao.usuario2.id;

                if (Number(amigo1) === Number(idUsuario) || Number(amigo2) === Number(idUsuario)){
                    estadoAmizade = "Amigos";
                    break;
                }
            }
        }

        return{
            id: u.id,
            foto_perfil: u.foto_perfil,
            nome: u.nome,
            pais: u.pais,
            descricao: u.descricao,
            nivel: u.nivel,
            amigos: u.amigo2,
            estadoAmizade: estadoAmizade
        }

    })

    return(amigoOuNao)
}

//Puxa Dados dos usuários
export async function DadosUsuarios(idConvertido : number){

    console.log(idConvertido);

    const AppDataSource = await getDataSource();

    const puxarDadosUsuariosBack = await AppDataSource.getRepository(Usuario).findOne({
        where: {id : idConvertido},
        relations: {
            usuario_que_recebeu: {
                usuario_enviou: true
            },
            amigo1: {
                usuario1: true,
                usuario2: true
            },
            amigo2 : {
                usuario1: true,
                usuario2: true
            }
        }
    })

    console.log(puxarDadosUsuariosBack);

    if (!puxarDadosUsuariosBack){
        throw new Error("Usuário não encontrado");
    }
    
    return(
        puxarDadosUsuariosBack
    )
}

//Alterar dados de usuários
export async function AlterarDadosUsers(bodyFormado: TypeUsuario){

    const {uid, nome, foto_perfil, descricao, pais} = bodyFormado;

    const AppDataSource = await getDataSource();

    const valores: Partial<proUpdateUser> = {};

    if(nome && nome !== ""){
        valores.nome = nome;
    }

    if(foto_perfil && foto_perfil !== ""){
        valores.foto_perfil = foto_perfil;
    }

    if(descricao && descricao !== ""){
        valores.descricao = descricao;
        
    }

    if(pais && pais !== ""){
        valores.pais = pais;
    }

    if(Object.keys(valores).length === 0){
        const atualizarDados = AppDataSource.getRepository(Usuario).update(
            uid!, valores
        )
    
        console.log(atualizarDados);
    
        if ((await atualizarDados).affected === 0){
            throw new Error("Falha na atualização dos dados");
        }

        const mensagem = "Dados atualizados com sucesso"

        return(mensagem);
    }
    return null;
}

export async function adicionarComentarioNoPerfil({idUserTeraComentario, comentario, uid} : dadosComentario){
    
    console.log(idUserTeraComentario);

    const AppDataSource = await getDataSource();

    //push the user who gain the coment
    const usuario = await AppDataSource.getRepository(Usuario).findOne({where: {id: idUserTeraComentario}});

    //push the user who type the coment
    const usuarioComent = await AppDataSource.getRepository(Usuario).findOne({where: {uid: uid}});


    if (!usuario || !usuarioComent){
        throw new Error("Sem usuário aqui");
    }

    console.log(usuario);

    const usuarioIdReceiveComent = usuario.id;
    const usuarioIdDidComent = usuarioComent.id;


    console.log("antes do create");

    //actual date
    const horaAtual = new Date();

    const oComentario = await AppDataSource.getRepository(ComentariosUser).create({
        comentario, 
        usuario_enviou: {id: usuarioIdDidComent},
        usuario_recebeu: {id: usuarioIdReceiveComent},
        data_publicacao: horaAtual
    });

    console.log("depois do create");

    const comentarioAdicionado = await AppDataSource.getRepository(ComentariosUser).save(oComentario);

    console.log("o comentário adicionado foi: ", comentarioAdicionado);

    if (!comentarioAdicionado){
        throw new Error("Comentário não adicionado");
    }

    return null;
}

export async function deletarComentarioPerfil(idConvertido : number){   
    console.log(idConvertido);
    const AppDataSource = await getDataSource();

    console.log("dentro de deletarComentarioPerfil");
    const deleteComentario = await AppDataSource.getRepository(ComentariosUser).delete({
        id: idConvertido
    });

    if (deleteComentario.affected === 0){
        throw new Error("Falha no delete");
    }

    console.log("passou do delete");


    return null;
}


