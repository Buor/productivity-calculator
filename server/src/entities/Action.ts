import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ActionType} from "./ActionType";
import {DateE} from "./DateE";

@Entity()
export class Action {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    nature: string

    @Column()
    description?: string

    @Column()
    duration: number

    @Column()
    startTime: string

    @Column()
    endTime: string

    @ManyToOne(() => ActionType, actionType => actionType.actions)
    actionType: ActionType

    @ManyToOne(() => DateE, dateE => dateE.actions, {
        onDelete: "CASCADE"
    })
    date: DateE
}