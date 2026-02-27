import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import type { Jogos } from "./EntityJogos";
import type { Usuario } from "./EntityUsers";

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

    @ManyToOne("Usuario", (usuario:any) => usuario.comentario)
    @JoinColumn({name: "id_user"})
    usuario!: Usuario;
}
