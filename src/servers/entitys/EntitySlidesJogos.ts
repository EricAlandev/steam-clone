// /entity/Usuario.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import { Jogos } from "./EntityJogos";


@Entity("slidesjogos") // nome da tabela no banco
export class SlidesJogos {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    slide_url!: string

    @ManyToOne(() => Jogos, jogo => jogo.slides)
    @JoinColumn({ name: "jogos_id" })
    jogos!: Jogos;
}
