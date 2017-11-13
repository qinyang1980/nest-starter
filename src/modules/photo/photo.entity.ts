import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Photo {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ length: 500 })
    public name: string;

    @Column('text')
    public description: string;

    @Column()
    public filename: string;

    @Column('int')
    public views: number;

    @Column()
    public isPublished: boolean;
}
