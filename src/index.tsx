import React from 'react'
import ReactDOM from 'react-dom'

import './globalStyles.css'

import App from './App'
import {ChakraProvider} from '@chakra-ui/react'
import {BrowserRouter} from 'react-router-dom'
import {customTheme} from './theme/theme'
import {analyzeTime} from './core/timeAnalyzer';

ReactDOM.render(
    <BrowserRouter>
        <ChakraProvider theme={customTheme} resetCSS>
            <App/>
        </ChakraProvider>
    </BrowserRouter>,
    document.getElementById('root')
)
//todo test remove
console.log(analyzeTime(`6:44-7:00) Просыпаться, зайти в соцсети
-7:47) Умываться, готовить завтрак, завтракать`))