import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn} from 'typeorm';
import "reflect-metadata";
import { User } from './userEntitie';
import { Video } from './videoEntitie';
import { Annotation } from './AnnotationEntitie';


@Entity()
export class Historic extends BaseEntity{
    @PrimaryGeneratedColumn()
    historic_id!: number;

    @Column()
    watched_time!: number;

    //Aqui estou fazendo um relacionamento muitos p um pegando o id do usuario que foi criado em outra entidade(User) e utilizando a chave nesta entidade
    @ManyToOne(type => User)
    @JoinColumn({ name: 'user_id' })
    user_id!: User;

    @ManyToOne(type => Video)
    @JoinColumn({ name: 'link', referencedColumnName: 'video_link' })
    video!: Video;

    @ManyToOne(type => Annotation)
    @JoinColumn({name: 'annotation', referencedColumnName: 'tittle'})
    annotation!: Annotation;
}