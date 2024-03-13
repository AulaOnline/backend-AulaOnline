import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn, ManyToOne} from 'typeorm';
import "reflect-metadata";
import { User } from './userEntitie';
import { Video } from './videoEntitie';
import { Annotation } from './annotationEntitie';

@Entity()
export class Historic extends BaseEntity{
    @PrimaryGeneratedColumn()
    historic_id!: number;

    @Column({ nullable: true })
    watched_time!: number;

    // Assumindo que a relação com User e Video permanece ManyToOne
    @ManyToOne(type => User)
    @JoinColumn({ name: 'user_id' })
    user_id!: number;

    @ManyToOne(() => Video)
    @JoinColumn({ name: 'video_id' })
    video!: Video;

    // Relacionamento OneToOne com Annotation, opcional
    @OneToOne(() => Annotation, { nullable: true })
    @JoinColumn({ name: 'annotation_id' })
    annotation?: Annotation;
}