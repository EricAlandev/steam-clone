
import { Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne, JoinColumn} from "typeorm";
import type { Usuario } from "../EntityUsers";
import { Jogos } from "../EntityJogos";


@Entity("carrinho") // nome da tabela no banco
export class Carrinho {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne("Usuario", (usuarios : any) => usuarios.carrinho)
    @JoinColumn({name: "usuarios_id"})
    usuarios!: Usuario

    @ManyToOne("Jogos", (jogos : any) => jogos.carrinho)
    @JoinColumn({name: "jogos_id"})
    jogos!: Jogos

}
