import { getDataSource } from "@/lib/db";
import { Usuario } from "../entitys/EntityUsers";
import { Amigos } from "../entitys/amigos/EntityAmigos";


export async function AddFriend(id: number, uid: string){

    const AppDataSource = await getDataSource();

    const usuario = await AppDataSource.getRepository(Usuario).findOne(
        {where: {uid: uid}}
    );

    if(!usuario){
        throw new Error("Usuário não identificado");
    }

    const idUsuario = usuario.id;

    console.log(idUsuario);

    const promiseAdd = await AppDataSource.getRepository(Amigos).create(
        {usuario1: {id: id}, 
        usuario2: {id: idUsuario}}
    )

    const adicionar = await AppDataSource.getRepository(Amigos).save(promiseAdd);

    if (!adicionar){
        throw new Error("Falha ao adicionar amigo");
    }
    
    return(id);
} 


export async function RemoveFriend(id: number, uid: string){

    const AppDataSource = await getDataSource();

    const usuario = await AppDataSource.getRepository(Usuario).findOne(
        {where: {uid: uid}}
    );

    if(!usuario){
        throw new Error("Usuário não identificado");
    }

    const idUsuario = usuario.id;

    const exclude = await AppDataSource.getRepository(Amigos).delete(
        [
            {usuario1: {id: id}, usuario2: {id: idUsuario}},
            {usuario2: {id: idUsuario}, usuario1: {id: id}}
        ]
    )

    if(exclude.affected === 0){
        throw new Error("Error na exclusão da amizade")
    }
} 