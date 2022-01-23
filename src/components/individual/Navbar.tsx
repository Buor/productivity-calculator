import React from 'react'
import {Box, Button} from '@chakra-ui/react'
import {routes} from '../../routes/routes'
import {useNavigate} from 'react-router-dom'

interface IProps {

}

export const Navbar: React.FC<IProps> = () => {

    const navigate = useNavigate()

    return (
        <Box
            d={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            minH={'40px'}
            flexWrap={'wrap'}
        >
            {routes.map(route => {
                return <Button
                    flex={'1 1 200px'}
                    border={'0'}
                    backgroundColor={'custom.dark'}
                    fontWeight={'700'}
                    fontSize={17}
                    _hover={{
                        backgroundColor: 'custom.medium'
                    }}
                    key={route.link}
                    onClick={() => navigate(route.link)}
                >
                    {route.name}
                </Button>
            })}
        </Box>
    )
}