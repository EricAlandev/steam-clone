// /entity/Usuario.ts
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, ManyToOne} from "typeorm";
import { Distribuidora } from "../EntityDistribuira";
import { Usuario } from "../EntityUsers";

@Entity("n_seguidores_jogos") // nome da tabela no banco
export class SeguidoresJogos{
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne("Distribuidora", (dist: any) => dist.followers)
    @JoinColumn({name: "distribuidora_id"})
    distribuidora!: Distribuidora;

    @ManyToOne("Usuario", (usuario: any) => usuario.distribuidora)
    @JoinColumn({name: "usuario_id"})
    usuario!: Usuario;

}
