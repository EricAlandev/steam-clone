// /entity/Usuario.ts
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, ManyToOne} from "typeorm";
import { Distribuidora } from "../EntityDistribuira";
import { OpcoesTipoPublisher } from "./EntityOpcoesTipos";

@Entity("n_opcoes_tipos_publisher") // nome da tabela no banco
export class PivoOpcoesTiposPublisher{
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne("OpcoesTipoPublisher", (opcao: any) => opcao.asOpcoes)
    @JoinColumn({name: "opcao_id", referencedColumnName: "id"})
    opcoes!: OpcoesTipoPublisher;

    @ManyToOne("Distribuidora", (opcao: any) => opcao.pivoOpcoesPublishers)
    @JoinColumn({name: "publisher_id", referencedColumnName: "id"})
    distribuidora!: Distribuidora;

}
