import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Summary extends BaseEntity {
    @PrimaryColumn()
    video_link!: string;

    @Column('text')
    summary!: string;
}
