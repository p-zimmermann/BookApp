import { TextField, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/feed");
  };
  const handleClickRegister = () => {
    navigate("/register");
  };
  return (
    <>
      <TextField
        fullWidth
        margin="normal"
        label="E-Mail"
        name="mail"
        variant="outlined"
        value=""
        onChange=""
      />
      <TextField
        fullWidth
        margin="normal"
        label="Password"
        name="password"
        variant="outlined"
        value=""
        onChange=""
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        onClick={handleClick}
        sx={{ mt: 3 }}
      >
        Login
      </Button>
      <Typography align="center">OR</Typography>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        onClick={handleClickRegister}
        sx={{ mt: 3 }}
      >
        Register
      </Button>
    </>
  );
}
