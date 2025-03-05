import { StrictMode } from 'react'
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom'; /* Componente de React */
import { createRoot } from 'react-dom/client' /*Necesario para aplicaciones multipagina*/ 
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme/mui-theme';
import './index.css' 
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
      <BrowserRouter>
        <ChakraProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </ChakraProvider>
      </BrowserRouter>
)
