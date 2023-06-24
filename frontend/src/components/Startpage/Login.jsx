import { TextField, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import axios from "axios";

export default function Login() {
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
    console.log(data)
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
      console.log(response);
      localStorage.setItem("token", response.data.token)
      //navigate("/feed");
    } catch (error){
      console.log(error);
    }

  };
  const handleClickRegister = () => {
    navigate("/register");
  };

  //login request
  const loginRequest = (e) => {
    e.preventDefault();
  }

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
