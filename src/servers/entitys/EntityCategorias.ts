// /entity/Usuario.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany} from "typeorm";
import { Jogos } from "./EntityJogos";

@Entity("categoria") // nome da tabela no banco
export class Categoria {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nome_categoria!: string

    @ManyToMany(() => Jogos, jogo => jogo.categoria)
    jogos!: Jogos[]

}
