import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ededed', // Color del encabezado de la tabla
    },
    secondary: {
      main: '#38B2AC', // Color secundario de Chakra UI teal.500
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          '@media (max-width: 600px)': {
            padding: '8px',
          },
        },
      },
    },
  },
});

export default theme;
