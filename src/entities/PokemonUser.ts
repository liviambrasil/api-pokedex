import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";

@Entity("pokemon_user")
export default class Pokemon_User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    pokemonId: number;

    @Column()
    userId: number;
}