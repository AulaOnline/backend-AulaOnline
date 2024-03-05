import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn} from 'typeorm';
import "reflect-metadata";
import { User } from './userEntitie';


@Entity()
export class Historic extends BaseEntity{
    @PrimaryGeneratedColumn()
    historic_id!: number;

    @Column()
    watched_time!: number ;

    @Column()
    video_link!: string;//Video;

    @Column()
    annotation!: string; //Annotation;

    //Aqui estou fazendo um relacionamento muitos p um pegando o id do usuario que foi criado em outra entidade(User) e utilizando a chave nesta entidade
    @ManyToOne(type => User)
    @JoinColumn({ name: 'user_id' })
    user_id!: User;

}