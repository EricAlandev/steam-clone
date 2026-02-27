import { getDataSource } from "@/lib/db";
import { Categoria } from "../entitys/EntityCategorias";

export async function PuxarCategorias(){

    const AppDataSource = await getDataSource();

    const numeroAleatorio = Math.floor(Math.random() * 2)

    let ordem: "ASC" | "DESC" = "ASC";

    if (numeroAleatorio === 1){
        ordem = "ASC"
    }

    else if(numeroAleatorio === 0){
        ordem = "DESC"
    }

    const puxarCategorias = await AppDataSource.getRepository(Categoria).find({
      order: {
        id: ordem as "ASC" | "DESC"
      },
      take: 6
    });
 
    return puxarCategorias;
}