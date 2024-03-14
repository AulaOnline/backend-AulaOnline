import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, JoinColumn, OneToOne, ManyToOne} from 'typeorm';
import { Historic } from './historicEntitie';

@Entity()
export class Video extends BaseEntity {
    @PrimaryGeneratedColumn()
    video_id!: string;

    @Column()
    tittle!: string; 

    @Column()
    total_time!: number;

    @Column({ nullable: true })
    watched_time!: number;

    @Column()
    video_link!: string;

    @ManyToOne(() => Historic)
    @JoinColumn({ name: 'historic_id' })
    historic_id!: number;
}
