import React from 'react'
import {Route, Routes} from "react-router-dom"
import {Navbar} from "./components/Navbar"
import {Box} from "@chakra-ui/react"
import {routes} from "./routes/routes"

function App() {
    return (
        <Box h={'100vh'} backgroundColor={'custom.dark'} color={'white'}>
            <Navbar/>
            <Routes>
                {routes.map(route => <Route key={route.link} path={route.link} element={route.component}/>)}
            </Routes>
        </Box>

    )
}

export default App
