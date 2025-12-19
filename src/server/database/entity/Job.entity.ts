// src/database/entity/Job.entity.ts
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { CharacterEntity } from "./Character.entity";

@Entity({ name: "player_jobs" })
export class JobEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => CharacterEntity, (character) => character.jobs)
    @JoinColumn({ name: "character_id" })
    character: CharacterEntity;

    @Column({ type: "int" })
    jobId: number; // ID del job desde Jobs.Class.ts

    @Column({ type: "int", nullable: true })
    rankId: number | null;

    @Column({ type: "numeric", default: 0 })
    salary: number;
}
