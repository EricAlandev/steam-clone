// /entity/Usuario.ts
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToMany, ManyToOne, OneToOne} from "typeorm";
import { Jogos } from "./EntityJogos";

@Entity("avaliacoes") // nome da tabela no banco
export class Avaliacoes {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    aceitacao_jogo!: string

    @Column()
    quantidade_comentarios!: number

    @OneToOne(() => Jogos, jogo => jogo.categoria)
    @JoinColumn({name: "jogo_id"})
    jogos!: Jogos

}
