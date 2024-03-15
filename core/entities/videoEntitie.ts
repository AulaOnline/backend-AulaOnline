import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn} from 'typeorm';
import { User } from './userEntitie';
import { Annotation } from "./AnnotationEntitie";

@Entity()
export class Video extends BaseEntity {
    @PrimaryGeneratedColumn()
    video_id!: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @Column()
    title!: string;

    @Column()
    total_time!: number;

    @Column({ nullable: true })
    watched_time!: number;

    @Column()
    video_link!: string;
}
