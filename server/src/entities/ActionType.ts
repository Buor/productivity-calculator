import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Action} from "./Action";
import {ActionRule} from "./ActionRule";

@Entity()
export class ActionType {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    name: string

    @Column()
    icon?: string

    @Column()
    color: string

    @Column()
    defaultNature: string

    @Column()
    parent?: string

    @OneToMany(() => Action, action => action.actionType)
    actions: Action[]

    @OneToMany(() => ActionRule, actionRule => actionRule.actionType)
    actionsRules: ActionRule[]
}