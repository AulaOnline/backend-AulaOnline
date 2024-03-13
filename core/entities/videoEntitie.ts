import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from 'typeorm';

@Entity()
export class Video extends BaseEntity {
    @PrimaryGeneratedColumn()
    video_id!: string;

    @Column()
    tittle!: string;

    @Column()
    total_time!: number;

    @Column()
    video_link!: string;
}
