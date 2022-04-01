import {ComponentStyleConfig} from "@chakra-ui/react";

export const Card = {
    baseStyle: {
        display: 'flex',
        flexDirection: 'column',
        background: 'custom.medium',
        alignItems: 'center',
    },
    variants: {
        rounded: {
            padding: 8,
            borderRadius: 'xl',
            boxShadow: 'xl',
        },
        smooth: {
            padding: 6,
            borderRadius: 'base',
            boxShadow: 'md',
        },
    },
    defaultProps: {
        variant: 'smooth',
    },
}

export const Button: ComponentStyleConfig = {
    baseStyle: {
        border: '0',
        background: 'custom.dark',
        fontWeight: '700',
        fontSize: 17,
        borderRadius: 0,
        '&:hover': {
            backgroundColor: 'custom.medium'
        },
        '&:focus': {
            boxShadow: 'none'
        },
        '&:active': {
            background: 'none !important'
        }
    },
    variants: {
        yellow: {
            background: 'yellow.400',
            color: 'black',
            '&:hover': {
                background: 'yellow.600'
            }
        }
    }
}