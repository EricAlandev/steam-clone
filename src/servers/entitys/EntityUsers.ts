// /entity/Usuario.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToMany } from "typeorm";
import type { Comentarios } from "./EntityComentarios";
import type { Carrinho } from "./carrinho/EntityCarrinho";
import type{ ComentariosUser } from "./comentarios/EntityComentarioUser";
import type {Amigos}  from "./amigos/EntityAmigos";

@Entity("usuarios") // nome da tabela no banco
export class Usuario {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: true })
    uid?: string;

    @Column()
    nome!: string;

    @Column()
    pais!: string;

    @Column()
    descricao!: string;

    @Column()
    email!: string;

    @Column()
    foto_perfil!: string;

    @Column()
    nivel!: number;

    @OneToMany("Comentarios", (comentario:any) => comentario.usuario)
    comentario!: Comentarios;

    @OneToMany("Carrinho", (usuarios:any) => usuarios.jogos)
    carrinho!: Carrinho[];

    @OneToMany("ComentariosUser", (comentario:any) => comentario.usuario_enviou)
    usuario_que_enviou!: ComentariosUser[];

    @OneToMany("ComentariosUser", (comentario:any) => comentario.usuario_recebeu)
    usuario_que_recebeu!: ComentariosUser[];

    @OneToMany("Amigos", (amigo :any) => amigo.usuario1)
    amigo1!: Amigos[];

    @OneToMany("Amigos", (amigo:any) => amigo.usuario2)
    amigo2!: Amigos[];


}
