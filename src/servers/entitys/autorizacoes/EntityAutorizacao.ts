// /entity/Usuario.ts
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToMany, ManyToOne, OneToOne} from "typeorm";
import { RelacaoAutorizacao } from "./EntityRelacaoAutorizacao";

@Entity("autorizacoes") // nome da tabela no banco
export class Autorizacoes {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    autorizacao!: string;

    @OneToMany("RelacaoAutorizacao", (RN : any) => RN.autorizacoes)
    relacaoAutorizacao !: RelacaoAutorizacao[];
}
