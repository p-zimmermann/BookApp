import { Box, Button, Avatar } from "@mui/material";
import AccordionShelve from "./AccordionShelve.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function FeedPage({ handleLogout }) {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);

  const handleClick = () => {
    navigate("/search");
  };

  const handleClickLogout = () => {
    handleLogout();
  };

  const getUserData = async () => {
    const token = localStorage.getItem("token");
    const base64Url = token.split(".")[1]; // Extract the payload (middle part of the token)
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/"); // Replace URL-safe characters
    const payload = JSON.parse(atob(base64));
    const id = payload.id;
    const response = await axios(`http://localhost:3001/finduser?id=${id}`);
    localStorage.setItem("user", JSON.stringify(response.data))
    setUser(response.data);

  
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

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
            minWidth: "15vw",
          }}
        ></Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minWidth: "60vw",
            height: "100vh",
            bgcolor: "primary.light",
            justifyContent: "flex-start",
            padding: 10,
          }}
        >
          <Button variant="contained" sx={{ margin: 5 }} onClick={handleClick}>
            Search
          </Button>
          <AccordionShelve></AccordionShelve>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minWidth: "15vw",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              m: 3,
              p: "1rem",
            }}
            src={user.profilePicture}
          ></Avatar>
          <Box>
            <Button variant="contained" sx={{ margin: 2 }}>
              Profile
            </Button>
          </Box>
          <Box>
            <Button
              variant="contained"
              sx={{ margin: 2 }}
              onClick={handleClickLogout}
            >
              Logout
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
