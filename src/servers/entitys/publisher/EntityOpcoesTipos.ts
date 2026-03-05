// /entity/Usuario.ts
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, ManyToOne, OneToMany} from "typeorm";
import { PivoOpcoesTiposPublisher } from "./EntityOpcoesTiposPublisher";

@Entity("opcoes_tipos_publisher") // nome da tabela no banco
export class OpcoesTipoPublisher{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    opcao!: string;


    @OneToMany("PivoOpcoesTiposPublisher", (pivo: any) => pivo.opcoes)
    asOpcoes!: PivoOpcoesTiposPublisher[]
}
