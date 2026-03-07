import { getDataSource } from '@/lib/db';
import cron from 'node-cron';
import { Usuario } from '../entitys/EntityUsers';
import { Carrinho } from '../entitys/carrinho/EntityCarrinho';
import { UsuarioGames } from '../entitys/jogosUser/EntityUserGames';
import { s } from 'framer-motion/client';

export default async function WorkerLevel(){

    cron.schedule('10 * * * * *', async() => {

        console.log("Worker level");
        const AppDataSource = await getDataSource();

        const usuarios = await AppDataSource.getRepository(Usuario).find();

        if(usuarios.length > 0){
            for(let i = 0; i < usuarios.length; i++){
                const usuario = usuarios[i];
                const idUsuario = usuario?.id;

                const games = await AppDataSource.getRepository(UsuarioGames).find({
                    where: {
                        usuarios: {
                            id: idUsuario
                        }
                    }
                });

                //VERIFY THE ACTUAL LEVEL OF THE USER
                if(games){
                    const tamanhoCarrinho = games.length;
                    let level = 1;

                    if(tamanhoCarrinho > 0 && tamanhoCarrinho <= 2){
                        level = 2;
                    }

                    else if(tamanhoCarrinho > 2 && tamanhoCarrinho <= 5){
                        level = 3;
                    }

                    else if(tamanhoCarrinho > 5 && tamanhoCarrinho <= 10){
                        level = 4;
                    }

                    else if(tamanhoCarrinho > 10 && tamanhoCarrinho <= 15){
                        level = 5;
                    }

                    //if the level its diferente than 0 and the level its diferent of his actual level. Gonna update;
                    if(level != 1 && (usuario?.nivel !== level)){
                        const games = await AppDataSource.getRepository(Usuario).update(
                            {
                                id: idUsuario
                            }, {
                                nivel: level
                            }
                        )

                        if(games.affected === 0){
                            console.log("Erro ao atualizar o user");
                        }
                    }
                }
            }
                
        }
    })
}