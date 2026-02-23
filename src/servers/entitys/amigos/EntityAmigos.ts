
import { Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne, JoinColumn} from "typeorm";
import type { Usuario } from "../EntityUsers";


@Entity("amigos") // nome da tabela no banco
export class Amigos {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne("Usuario", (usuario : any) => usuario.amigo1)
    @JoinColumn({name: "usuario1"})
    usuario1!: Usuario

    @ManyToOne("Usuario", (usuario : any) => usuario.amigo2)
    @JoinColumn({name: "usuario2"})
    usuario2!: Usuario

}
