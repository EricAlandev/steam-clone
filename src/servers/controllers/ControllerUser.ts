

//entitys
import { Usuario } from "../entitys/EntityUsers";

//pool
import { getDataSource } from "@/lib/db";

//types

import { Dado } from "@/componentes/pages/authentication/cadastro/CadastroForm";
import { LoginIdentificador } from "@/app/login/page";
import { Pesquisa } from "@/componentes/pages/PesquisaUsuariosPage/HeaderPesquisaUser";
import { ILike } from "typeorm";
import { TypeUsuario } from "../types/TypeUsuario";


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
export async function PesquisaUsuarios(pesquisa: Pesquisa){

    const AppDataSource = await getDataSource();

    const PuxarUsuarios = await AppDataSource.getRepository(Usuario).find({
        where : {nome: ILike(`%${pesquisa.pesquisa}%`)}
    })

    console.log(PuxarUsuarios)

    if (PuxarUsuarios.length === 0){
        throw new Error("Usuário(os) não encontrado");
    }

    return(
        PuxarUsuarios
    )
}

//Puxa Dados dos usuários
export async function DadosUsuarios(idConvertido : number){

    console.log(idConvertido);

    const AppDataSource = await getDataSource();

    const puxarDadosUsuariosBack = await AppDataSource.getRepository(Usuario).findOne({
        where: {id : idConvertido}
    })

    console.log(puxarDadosUsuariosBack);

    if (!puxarDadosUsuariosBack){
        throw new Error("Usuário não encontrado");
    }

    return(
        puxarDadosUsuariosBack
    )
}

type proUpdateUser = {
    foto_perfil?: string,
    nome? : string,
    descricao?: string,
    pais?: string, 

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
    console.log(valores);

    const atualizarDados = AppDataSource.getRepository(Usuario).update(
        uid!, valores
    )

    console.log(atualizarDados);

    if ((await atualizarDados).affected === 0){
        throw new Error("Falha na atualização dos dados");
    }

    console.log("Gerou mensagem");

    const mensagem = "Dados atualizados com sucesso"

    return(mensagem);
}

