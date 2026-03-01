// /entity/Usuario.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany} from "typeorm";
import type { Jogos } from "../EntityJogos";

@Entity("opcoes_tipo_jogos") // nome da tabela no banco
export class OpcoesTiposJogos {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    opcao!: string

    @ManyToMany("Jogos", (jogos: any) => jogos.tipos)
    jogos!: Jogos[]
}
