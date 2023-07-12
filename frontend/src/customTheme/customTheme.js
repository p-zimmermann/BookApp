import { createTheme } from '@mui/material/styles';

const themeOptions = createTheme ({
    palette: {
      mode: 'light',
      primary: {
        main: '#893618',
        light: '#D68567',
        dark: '#572310',
      },
      secondary: {
        main: '#C8B3E6',
        dark: '#9C8BB3',
        light: '#D5CAE6',
      },
    },
  }) 

  export default themeOptions