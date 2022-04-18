import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {timeAnalyzerSlice} from "./reducers/timeAnalyzerReducer";

const rootReducer = combineReducers({
    timeAnalyzer: timeAnalyzerSlice.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']