// /entity/Usuario.ts
import { Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity("opcoes_tipo_jogos") // nome da tabela no banco
export class OpcoesTiposJogos {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    opcao!: string
}
