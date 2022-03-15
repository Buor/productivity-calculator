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

    @Column('date')
    startTime: Date

    @Column('date')
    endTime: Date

    @ManyToOne(() => ActionType, actionType => actionType.actions)
    actionType: ActionType

    @ManyToOne(() => DateE, dateE => dateE.actions)
    date: DateE
}