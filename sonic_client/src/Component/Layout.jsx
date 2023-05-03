import { Box } from '@chakra-ui/react'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer/Footer'
import Navbar from './Navbar/Navbar'

export default function Layout() {
  return (
    <Box>
        <Navbar/>
        <Box minH='90vh'>
            <Box h='65px'></Box>
            <Outlet/>
        </Box>
        <Footer/>
    </Box>
  )
}
