import {TextField, Typography, Button} from '@mui/material';

export default function Login () {
return(
    <>
       <TextField
        fullWidth
        margin="normal"
        label="E-Mail"
        name="mail"
        variant="outlined"
        value=''
        onChange=''
      />
      <TextField
        fullWidth
        margin="normal"
        label="Password"
        name="password"
        variant="outlined"
        value=''
        onChange=''
      />
      
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
        Login
      </Button>
      <Typography align="center">OR</Typography>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
        Register
      </Button>
    </>
)
 

}