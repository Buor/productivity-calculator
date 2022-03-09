import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Navbar } from './components/individual/Navbar'
import { Box } from '@chakra-ui/react'
import { routes } from './routes/routes'
import { Manual } from './components/individual/Manual/Manual'

function App() {
    return (
        <Box h={'100vh'} backgroundColor={'custom.dark'} color={'white'}>
            <Navbar />
            <Routes>
                {routes.map((route) => (
                    <Route
                        key={route.link}
                        path={route.link}
                        element={route.component}
                    />
                ))}
            </Routes>
            <Manual />
        </Box>
    )
}

export default App
