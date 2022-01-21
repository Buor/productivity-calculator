import React from 'react'
import ReactDOM from 'react-dom'

import './globalStyles.css'

import App from './App'
import {ChakraProvider} from '@chakra-ui/react'
import {BrowserRouter} from 'react-router-dom'
import {customTheme} from './theme/theme'

ReactDOM.render(
    <BrowserRouter>
        <ChakraProvider theme={customTheme}>
            <App/>
        </ChakraProvider>
    </BrowserRouter>,
    document.getElementById('root')
)
