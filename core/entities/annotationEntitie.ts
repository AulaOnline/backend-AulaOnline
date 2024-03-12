import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany} from 'typeorm';
import "reflect-metadata";
import { Historic } from './historicEntitie';
@Entity()
export class Annotation extends BaseEntity{
    @PrimaryGeneratedColumn()
    annotation_id!: string;

    @Column()
    tittle!: string;

    @Column()
    body!: string;

   
}