import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from 'typeorm';
import "reflect-metadata";
@Entity()
export class Annotation extends BaseEntity{
    @PrimaryGeneratedColumn()
    annotation_id!: number;

    @Column()
    tittle!: string;

    @Column()
    body!: string;
}