import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity
export class ContactModel extends BaseEntity {
    @PrimaryGeneratedColumn() 
    id!: number;

    @Column({length: 100})
    firstName!: string;

    @Column({length: 100})
    lastName!: string;

    @Column({length: 100})
    email!: string;

    @Column({length: 15})
    phone!: string;
}