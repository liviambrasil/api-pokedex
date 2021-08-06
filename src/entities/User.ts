import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import Pokemon from "./Pokemon";

@Entity("user")
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({unique:true})
  password: string;

  @ManyToMany(()=> Pokemon, pokemon => pokemon.user)
  @JoinTable({name: "pokemon_user"})
  pokemon: Pokemon[] 
}
