import { createTheme } from '@mui/material/styles';

const themeOptions = createTheme ({
    palette: {
      mode: 'light',
      primary: {
        main: '#893618',
        light: '#A05E46',
        dark: '#5F2510',
      },
      secondary: {
        main: '#D65527',
        dark: '#DE7752',
        light: '#D6A08D',
      },
    },
  }) 

  export default themeOptions