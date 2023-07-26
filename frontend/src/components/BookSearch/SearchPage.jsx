import {
  Box,
  Button,
  Avatar,
} from "@mui/material";
import BookSearch from './BookSearch.jsx';
import { useNavigate } from "react-router-dom";


export default function FeedPage({ handleLogout }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/feed");
  };
  const handleClickProfile = () => {
    navigate("/profile")
  }
  const handleClickLogout = () => {
    handleLogout();
    localStorage.clear()
  };

  //get userID
  const loggedUser = JSON.parse(localStorage.getItem("user"));

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
            minHeight: "100vh",
            
            bgcolor: "secondary.light",
            justifyContent: "flex-start",
            padding: 10,
          }}
        >
        <BookSearch/>
        </Box>
        
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            minWidth: "15vw",
            justifyContent: "flex-start",
            alignItems: "center",
          }}>
          <Avatar
            size="md"
            sx={{
              m: 3,
              p: "1rem",
            }}
            src={loggedUser.profilePicture}
          ></Avatar>
          <Button variant="contained" sx={{ margin: 2, minWidth: '95px' }} onClick={handleClick}>
            Feed
          </Button>
          <Button variant="contained" sx={{ margin: 2 }} onClick={handleClickProfile}>
            Profile
          </Button>
          <Button
              variant="contained"
              sx={{ margin: 2 }}
              onClick={handleClickLogout}
            >
              Logout
            </Button>
          </Box>
        </Box>
     
    </>
  );
}
