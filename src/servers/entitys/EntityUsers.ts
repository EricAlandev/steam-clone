// /entity/Usuario.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToMany } from "typeorm";
import type { Comentarios } from "./EntityComentarios";
import type { Carrinho } from "./carrinho/EntityCarrinho";

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
}
