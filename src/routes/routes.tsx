import React from "react"
import {TimeAnalyzer} from "../components/TimeAnalyzer"

export interface IRoute {
    link: string
    name: string
    component: JSX.Element
}

export const routes: IRoute[] = [
    {
        link: '/timeAnalyzer',
        name: 'Time Analyzer',
        component: <TimeAnalyzer/>
    }
]