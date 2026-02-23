// /entity/Usuario.ts
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne} from "typeorm";
import type{ Usuario } from "../EntityUsers";

@Entity("comentarios_usuario") // nome da tabela no banco
export class ComentariosUser {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    comentario!: string;

    @Column({type: 'timestamp'})
    data_publicacao!: Date;

    @ManyToOne(("Usuario"), (usuario_enviou: any) => usuario_enviou.usuario_que_enviou)
    @JoinColumn({name: "id_usuario_enviou"})
    usuario_enviou!: Usuario;

    @ManyToOne(("Usuario"), (usuario_recebido: any) => usuario_recebido.usuario_que_recebeu)
    @JoinColumn({name: "id_usuario_recebido"})
    usuario_recebeu!: Usuario;

    

}
