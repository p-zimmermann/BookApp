import { TextField, Typography, Button, Box, InputAdornment,
  IconButton, } from "@mui/material";
import { Visibility, VisibilityOff, Close } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import axios from "axios";
import showNotification from "../notification/showNotification";
//import jwt_decode from "jsonwebtoken";



export default function Login({handleLogin}) {
  const navigate = useNavigate();
  const formRef = useRef();

  //login request
  const handleClick = async(e) => {
    e.preventDefault();
    const loginForm = formRef.current;
    const data = {
      email: loginForm.email.value,
      password: loginForm.password.value,
    }
    const config = {
      url: "http://localhost:3001/login",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      data: data
    }
    try {
      const response = await axios (config);
      showNotification(`${response.data.message}`, "normal");
      localStorage.setItem("token", response.data.token)
      const token = localStorage.getItem("token");
      const base64Url = token.split(".")[1]; // Extract the payload (middle part of the token)
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/"); // Replace URL-safe characters
      const payload = JSON.parse(atob(base64));
      const id = payload.id;
      const responseUser = await axios(`http://localhost:3001/finduser?id=${id}`);
      localStorage.setItem("user", JSON.stringify(responseUser.data))
      handleLogin()
      navigate("/feed");
    } catch (error){
      showNotification(`${error.response.data.message}`,"red");
    }
  };
  const handleClickRegister = () => {
    navigate("/register");
  };

  //login request
  const loginRequest = (e) => {
    e.preventDefault();
  }
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
    <Box
          component="form"
          ref={formRef}
          onSubmit={handleClick}
          
        >
      <TextField
        fullWidth
        margin="normal"
        label="E-Mail"
        name="email"
        variant="outlined"
      />
      <TextField
        fullWidth
        margin="normal"
        label="Password"
        name="password"
        variant="outlined"
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment:
          <InputAdornment position="end">
            <IconButton
              edge="end"
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }}
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
      
      </Box>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3 }}
        onClick={handleClickRegister}
      >
        Register
      </Button>
    </>
  );
}
