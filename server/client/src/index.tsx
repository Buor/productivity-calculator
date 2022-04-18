import React from 'react'
import ReactDOM from 'react-dom'

import './globalStyles.css'

import App from './App'
import {ChakraProvider} from '@chakra-ui/react'
import {BrowserRouter} from 'react-router-dom'
import {customTheme} from './theme/theme'
import {Provider} from "react-redux";
import {setupStore} from "./store/store";

ReactDOM.render(
    <Provider store={setupStore()}>
        <BrowserRouter>
            <ChakraProvider theme={customTheme} resetCSS>
                <App/>
            </ChakraProvider>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
)