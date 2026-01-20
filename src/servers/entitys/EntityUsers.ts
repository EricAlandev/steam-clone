// /entity/Usuario.ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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
}
