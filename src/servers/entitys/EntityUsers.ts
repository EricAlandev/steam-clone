// /entity/Usuario.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from "typeorm";
import type { Comentarios } from "./EntityComentarios";

@Entity("usuarios") // nome da tabela no banco
export class Usuario {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: true })
    uid?: string;

    @Column()
    email!: string;

    @Column()
    foto_perfil!: string;

    @OneToMany("Comentarios", (comentario:any) => comentario.usuario)
    comentario!: Comentarios;
}
