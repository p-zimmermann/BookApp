import { Box, TextField, Input, InputLabel, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
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
    id: "",
    email: "",
    password: "",
    username: "",
    profilePicture: "",
  });

  const handleInputChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };
  const navigate = useNavigate();

  //axios request
  const registerUser = async (e) => {
    e.preventDefault();
    const userForm = new FormData();
    userForm.append("id", uuidv4());
    userForm.append("email", user.email);
    userForm.append("password", user.password);
    userForm.append("username", user.username);
    userForm.append("profilePicture", selectedFile);
    /* console.log(userForm); */
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
            style={{ width: "50vw" }}
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
