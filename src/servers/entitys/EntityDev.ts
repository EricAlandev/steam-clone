// /entity/Usuario.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Jogos } from "./EntityJogos";

@Entity("desenvolvedor") // nome da tabela no banco
export class Desenvolvedor {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nomedesenvolvedor!: string;

    @OneToMany(() => Jogos, jogo => jogo.desenvolvedor)
    jogos!: Jogos[];

}
