

//entitys
import { Usuario } from "../entitys/EntityUsers";

//pool
import { getDataSource } from "@/lib/db";

//types

import { Dado } from "@/componentes/pages/authentication/cadastro/CadastroForm";
import { LoginIdentificador } from "@/app/login/page";


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