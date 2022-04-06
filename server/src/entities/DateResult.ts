import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {DateE} from "./DateE";

@Entity()
export class DateResult {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    positiveActionsPercentage: number
    @Column()
    negativeActionsPercentage: number
    @Column()
    neutralActionsPercentage: number

    @Column()
    positiveActionsTime: number
    @Column()
    negativeActionsTime: number
    @Column()
    neutralActionsTime: number

    @Column()
    productivity: number

    @Column()
    advicesLinks: string

    @OneToOne(() => DateE, dateE => dateE.dateResult)
    dateE: DateE
}