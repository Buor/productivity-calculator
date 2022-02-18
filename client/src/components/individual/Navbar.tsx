import React, {useState} from 'react'
import {Box, Button} from '@chakra-ui/react'
import {routes} from '../../routes/routes'
import {useNavigate} from 'react-router-dom'

interface IProps {

}

export const Navbar: React.FC<IProps> = () => {

    const navigate = useNavigate()
    const [currentRoute, setCurrentRoute] = useState(window.location.pathname)

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
                    key={route.link}
                    flex={'1 1 200px'}
                    border={'0'}
                    backgroundColor={currentRoute === route.link ? 'custom.medium' : 'custom.dark'}
                    fontWeight={'700'}
                    fontSize={17}
                    borderRadius={0}
                    _hover={{
                        backgroundColor: 'custom.medium'
                    }}
                    _focus={{border: '0'}}
                    onClick={() => {
                        setCurrentRoute(route.link)
                        navigate(route.link)
                    }}
                >
                    {route.name}
                </Button>
            })}
        </Box>
    )
}