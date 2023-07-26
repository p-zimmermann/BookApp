import { Box, TextField, Input, InputLabel, Button, InputAdornment,
  IconButton } from "@mui/material";
import { Visibility, VisibilityOff, Close } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRef, useState } from "react";

import showNotification from "../notification/showNotification";

export default function Register() {
  const formRef = useRef();

  //needed for image upload
  const [selectedFile, setSelectedFile] = useState(null);
  // Add a new function to handle file changes
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const handleInputChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };
  const navigate = useNavigate();

  //axios request
  const registerUser = async (e) => {
    e.preventDefault();
    const userForm = new FormData();
    /* console.log(user) */
    userForm.append("email", user.email);
    userForm.append("password", user.password);
    userForm.append("username", user.username);
    userForm.append("profilePicture", selectedFile);
   /*  console.log(userForm); */
    const config = {
      url: `http://localhost:3001/register`,
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: userForm,
    };
    try {
      const response = await axios(config);
      showNotification("User registered - log in now", "normal");
      navigate("/");
      if (response.status !== 201) {
        throw new Error("Failed to post");
      }
    } catch (error) {
      showNotification(`${error.response.data.message}`,"red");
      if (error.response.status === 429) {
        console.log(error.response.data);
      } else {
        console.log(error);
      }
    }
  };
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Box
          sx={{
            display: "flex",
            minWidth: "50%",
          }}
        >
          <img
            src="../../../../img/library/jpgs/bookshelf-1.jpg"
            style={{width: '50vw', height: '100vh'}}
          ></img>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: 5,
            width: "50%",
          }}
          component="form"
          ref={formRef}
          onSubmit={registerUser}
        >
          <Box>
            <TextField
              fullWidth
              margin="normal"
              label="E-Mail"
              name="email"
              variant="outlined"
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              name="password"
              variant="outlined"
              onChange={handleInputChange}
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
            <TextField
              fullWidth
              margin="normal"
              label="username"
              name="username"
              variant="outlined"
              onChange={handleInputChange}
            />
            <InputLabel htmlFor="profilePicture">
              Upload your profile picture here
            </InputLabel>
            <Input
              id="profilePicture"
              name="profilePicture"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </Box>
          <Box>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
              Register
            </Button>
          </Box>
          {/* <LoginFields></LoginFields> */}
        </Box>
      </Box>
    </>
  );
}
