// /lib/db.ts
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Jogos } from "@/servers/entitys/EntityJogos";
import { Usuario } from "@/servers/entitys/EntityUsers";
import { Distribuidora } from "@/servers/entitys/EntityDistribuira";
import { Desenvolvedor } from "@/servers/entitys/EntityDev";
import { Categoria } from "@/servers/entitys/EntityCategorias";
import { SlidesJogos } from "@/servers/entitys/EntitySlidesJogos";
import { Comentarios } from "@/servers/entitys/EntityComentarios";
import { Avaliacoes } from "@/servers/entitys/EntityAvaliacoes";
import WorkerAvaliacao from "@/servers/Workers/WorkerAvaliacao";
import { Carrinho } from "@/servers/entitys/carrinho/EntityCarrinho";
import { ComentariosUser } from "@/servers/entitys/comentarios/EntityComentarioUser";
import { Amigos } from "@/servers/entitys/amigos/EntityAmigos";
import { OpcoesTiposJogos } from "@/servers/entitys/opcoes/OpcoesTipoJogos";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.NEXT_PUBLIC_DATABASE_URL,
  synchronize: false,
  logging: false,
  entities: [Usuario, Jogos, Distribuidora, Desenvolvedor, Categoria, SlidesJogos, Comentarios, Avaliacoes, Carrinho, ComentariosUser, Amigos, OpcoesTiposJogos],
  migrations: [],
  subscribers: [] 
});

export async function getDataSource() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
    WorkerAvaliacao();
    console.log("TypeORM inicializado");
  }
  return AppDataSource;
}
