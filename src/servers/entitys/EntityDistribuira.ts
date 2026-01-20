// /entity/Usuario.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Jogos } from "./EntityJogos";

@Entity("distribuidora") // nome da tabela no banco
export class Distribuidora {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nome_distribuidora!: string;

    @Column()
    capa!: string;

    @Column()
    fundo!: string;

    @Column()
    seguidores!: number;

    @OneToMany(() => Jogos, jogo => jogo.distribuidora)
    jogos!: Jogos[]

}
