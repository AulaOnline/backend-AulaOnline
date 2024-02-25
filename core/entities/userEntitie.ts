import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from 'typeorm';
import "reflect-metadata";
@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    username!: string;

    @Column()
    password!: string;
}