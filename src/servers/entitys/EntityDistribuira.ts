
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import type { Jogos } from "./EntityJogos";
import type { Usuario } from "./EntityUsers";
import { SeguidoresJogos } from "./publisher/EntityFollowersDistribuidora";
import { PivoOpcoesTiposPublisher } from "./publisher/EntityOpcoesTiposPublisher";

@Entity("distribuidora") // nome da tabela no banco
export class Distribuidora {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nome_distribuidora!: string;

    @Column()
    capa!: string;

    @Column()
    fundo!: string;

    @Column()
    seguidores!: number;

    @OneToMany("Jogos", (jogos: any) => jogos.distribuidora)
    jogos!: Jogos[]

    @OneToMany("SeguidoresJogos", (segJ: any) => segJ.distribuidora)
    followers!: SeguidoresJogos[];

    @OneToMany("PivoOpcoesTiposPublisher", (pivo: any) => pivo.distribuidora)
    pivoOpcoesPublishers!: PivoOpcoesTiposPublisher[];
}
