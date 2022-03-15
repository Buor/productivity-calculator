import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ActionType} from "./ActionType";

@Entity()
export class ActionRule {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    rule: number;

    @ManyToOne(() => ActionType, actionType => actionType.actionsRules)
    actionType: ActionType
}