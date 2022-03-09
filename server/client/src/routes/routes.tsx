import React from "react"
import {TimeAnalyzer} from "../components/individual/TimeAnalyzer/TimeAnalyzer"
import {Main} from '../components/individual/Main';
import {CalendarPage} from "../components/individual/CalendarPage/CalendarPage";

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
    },
    {
        link: '/calendar',
        name: 'Calendar',
        component: <CalendarPage/>
    }
]