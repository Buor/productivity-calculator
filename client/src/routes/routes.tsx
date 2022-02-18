import React from "react"
import {TimeAnalyzer} from "../components/individual/TimeAnalyzer/TimeAnalyzer"
import {Main} from '../components/individual/Main';

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
    },
    {
        link: '/',
        name: 'Main',
        component: <Main/>
    }
]