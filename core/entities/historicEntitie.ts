import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn, ManyToOne, ManyToMany} from 'typeorm';
import "reflect-metadata";
import { User } from './userEntitie';
import { Video } from './videoEntitie';
import { Annotation } from './annotationEntitie';

@Entity()
export class Historic extends BaseEntity {
    @PrimaryGeneratedColumn()
    historic_id!: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user_id!: User;

    @OneToOne(() => Annotation, { nullable: true })
    @JoinColumn({ name: 'annotation_id' })
    annotation?: Annotation;
}