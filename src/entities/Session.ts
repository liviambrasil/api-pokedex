import { Entity, PrimaryGeneratedColumn, Column  } from "typeorm";

@Entity("session")
export default class Session {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    token: string;

    @Column()
    userId: number;
}