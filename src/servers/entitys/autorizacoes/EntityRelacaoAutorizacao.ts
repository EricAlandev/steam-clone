// /entity/Usuario.ts
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToMany, ManyToOne, OneToOne} from "typeorm";
import { Autorizacoes } from "./EntityAutorizacao";
import { Usuario } from "../EntityUsers";

@Entity("n_autorizacoes") // nome da tabela no banco
export class RelacaoAutorizacao {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne("Autorizacoes", (auto: any) => auto.relacaoAutorizacao)
    @JoinColumn({name: "autorizacoes_id"})
    autorizacoes !: Autorizacoes;

    @ManyToOne("Usuario", (u: any) => u.relacaoAutorizacaoUser)
    @JoinColumn({name: "usuario_id"})
    usuario !: Usuario;
}
