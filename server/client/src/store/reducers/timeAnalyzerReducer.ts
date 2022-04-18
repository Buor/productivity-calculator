import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    actionsText: ''
}

export const timeAnalyzerSlice = createSlice({
    initialState,
    name: 'timeAnalyzer',
    reducers: {
        changeAnalyzeText(state, action: PayloadAction<string>) {
            state.actionsText = action.payload
        }
    }
})

export const {changeAnalyzeText} = timeAnalyzerSlice.actions
