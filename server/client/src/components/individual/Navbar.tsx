import React, {useState} from 'react'
import {Box, Button, Image} from '@chakra-ui/react'
import {routes} from '../../routes/routes'
import {useNavigate} from 'react-router-dom'
import imgMenu from '../../assets/images/menu.png'

interface IProps {

}

export const Navbar: React.FC<IProps> = () => {

    const navigate = useNavigate()
    const [currentRoute, setCurrentRoute] = useState(window.location.pathname)
    const [hidden, setHidden] = useState(false)

    const toggleHidden = () => setHidden(prev => !prev)

    return (
        <Box
            d={'flex'}
            flex={'0 1 235px'}
            position={'relative'}
            transition={'margin 0.2s ease-in'}
            ml={hidden ? '-200px' : '0px'}
        >
            <Box
                d={'flex'}
                flexDirection={'column'}
                flexWrap={'wrap'}
            >
                {routes.map(route => {
                    return <Button
                        key={route.link}
                        flex={'0 1 auto'}
                        w={'200px'}
                        backgroundColor={currentRoute === route.link ? 'custom.medium' : 'custom.dark'}
                        onClick={() => {
                            setCurrentRoute(route.link)
                            navigate(route.link)
                        }}
                    >
                        {route.name}
                    </Button>
                })}
            </Box>
            <Button
                position={'relative'}
                top={'5px'}
                left={'5px'}

                backgroundColor={'transparent'}
                alignSelf={'flex-start'}
                w={'30px'}
                h={'30px'}
                p={0}
                minW={'none'}
                minH={'none'}

                onClick={toggleHidden}
            >
                <Box
                    w={'100%'}
                    h={'100%'}
                    borderRadius={'100px'}
                    backgroundColor={'custom.dark'}
                    className={'image_wrapper'}
                    _hover={{
                        backgroundColor: 'custom.medium'
                    }}
                >
                    <Image
                        position={'absolute'}
                        top={'50%'}
                        left={'50%'}
                        w={'75%'}
                        h={'75%'}
                        src={imgMenu}
                        filter={'invert(1)'}

                        transform={'translate(-50%, -50%)'}
                    />
                </Box>
            </Button>
        </Box>

    )
}