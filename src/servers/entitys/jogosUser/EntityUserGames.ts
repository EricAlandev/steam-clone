// /entity/Usuario.ts
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToMany, ManyToOne, OneToOne} from "typeorm";
import { Jogos } from "../EntityJogos";
import { Usuario } from "../EntityUsers";

@Entity("usuario_jogos") // nome da tabela no banco
export class UsuarioGames {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne("Jogos", (user: any) => user.usuarioGames)
    @JoinColumn({name: "jogos_id"})
    jogos!: Jogos;

    @ManyToOne("Usuario", (user: any) => user.usuarioJogos)
    @JoinColumn({name: "usuario_id"}) 
    usuarios!: Usuario
}
