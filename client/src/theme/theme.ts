import {extendTheme} from '@chakra-ui/react'
import {Card} from '../components/ui/customComponents'
export const customTheme = extendTheme({
    colors: {
        custom: {
            dark: 'rgb(18,18,20)',
            medium: 'rgb(37,36,39)',
            mediumDark: 'rgb(30,30,33)',
        }
    },
    styles: {
        global: {
            body: {
                'fontFamily': 'Segoe UI, sans-serif',
                'fontStyle': 'normal',
                'bg' : 'custom.dark'
            }
        }
    },
    components: {
        Card
    }
})