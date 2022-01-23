import {extendTheme} from '@chakra-ui/react'

export const customTheme = extendTheme({
    colors: {
        custom: {
            dark: 'rgb(18,18,20)',
            medium: 'rgb(37,36,39)'
        }
    },
    styles: {
        global: {
            body: {
                'fontFamily': 'Segoe UI, sans-serif',
                'fontStyle': 'normal'
            }
        }
    }
})