import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn} from 'typeorm';
import "reflect-metadata";



@Entity()
export class Video extends BaseEntity{
    @PrimaryGeneratedColumn()
    video_id!:number;

    @Column()
    tittle!: string;

    @Column()
    total_time!: number;

    @Column()
    video_link!: string;

    @Column()
    transcript!: string; 


}