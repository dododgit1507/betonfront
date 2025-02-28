import { StrictMode } from 'react'
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom'; /* Componente de React */
import { createRoot } from 'react-dom/client' /*Necesario para aplicaciones multipagina*/ 
import './index.css' 
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </BrowserRouter>
  </StrictMode>
)
