
// /entity/Usuario.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import type { Jogos } from "./EntityJogos";

@Entity("comentarios") // nome da tabela no banco
export class Comentarios {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    recomenda!: boolean;

    @Column()
    comentario!: string;

    @Column({type: Date})
    data_publicacao!: Date;

    @ManyToOne("Jogos", (jogo:any) => jogo.comentarios)
    @JoinColumn({name: "jogo_id"})
    jogos!: Jogos;
}
