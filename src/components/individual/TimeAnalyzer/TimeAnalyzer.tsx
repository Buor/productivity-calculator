import React, {useState} from 'react'
import {EnterActions} from './EnterActions';
import {analyzeTime} from '../../../core/timeAnalyzer';

interface IProps {

}

export const TimeAnalyzer: React.FC<IProps> = () => {

    const [actionsText, setActionsText] = useState('')

    const analyze = () => {
        //todo implement
        analyzeTime(actionsText)
    }

    return (
        <>
            <EnterActions actionsText={actionsText}
                          setActionsText={setActionsText}
                          handleAnalyzeButtonClick={analyze}/>
        </>
    )
}