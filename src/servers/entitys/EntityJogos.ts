// /entity/Usuario.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne,ManyToMany, OneToOne , JoinTable ,JoinColumn, OneToMany, type Relation} from "typeorm";
import  { Desenvolvedor } from "./EntityDev";
import  { Distribuidora } from "./EntityDistribuira";
import  { Categoria } from "./EntityCategorias";
import type { SlidesJogos } from "./EntitySlidesJogos";
import type { Comentarios } from "./EntityComentarios";
import type { Avaliacoes } from "./EntityAvaliacoes";


@Entity("jogos") // nome da tabela no banco
export class Jogos {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nome!: string;

    @Column()
    descricao!: string;

    @Column({type: 'date'})
    lancamento!: string;

    @Column()
    foto_jogo!: string;

    @Column()
    foto_destaque!: string;

    @Column()
    preco!: number;

    @Column()
    preco_desconto!: number;

    @ManyToOne(() => Desenvolvedor, dev => dev.jogos)
    @JoinColumn({name: "desenvolvedor_id"})
    desenvolvedor!: Desenvolvedor

    @ManyToOne(() => Distribuidora, distri => distri.jogos)
    @JoinColumn({ name: "distribuidora_id" })
    distribuidora!: Distribuidora

    //Relação n pra N - Muitos jogos para muitas categorias
    @ManyToMany(() => Categoria, dev => dev.jogos)
    @JoinTable({
        name: "n_categorias",
        joinColumn: {name: "jogos_id"},
        inverseJoinColumn: {name: "categoria_id"}
    })
    categoria!: Categoria[]

    //SlideJogos
    @OneToMany("SlidesJogos", (slide: any) => slide.jogos)
    slides!: Relation< SlidesJogos[]>; // Type Relation, define que o ORM ele entende que existe, mas ele entende que só deve puxar quando um request for feito. Ao puxar via request já renderizou o entity e não há problema.

    @OneToMany("comentarios", (coment : any) => coment.jogos)
    comentarios!: Comentarios[]

    @OneToOne("avaliacoes", (avali : any) => avali.jogos)
    avaliacoes!: Avaliacoes
}
