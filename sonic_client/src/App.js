import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import AllRoutes from './Component/AllRoutes'
import './App.css'
import  {BrowserRouter as Router} from 'react-router-dom'

function App() {
  return (
    <ChakraProvider>
      <Router>
        <AllRoutes/>
      </Router>
    </ChakraProvider>
  )
}

export default App