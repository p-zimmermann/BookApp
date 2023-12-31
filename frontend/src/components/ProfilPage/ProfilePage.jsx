import { Box, Button, Avatar, TextField, Typography } from "@mui/material";

import DataPieChart from "./DataPieChart";
import { useNavigate } from "react-router-dom";

export default function ProfilePage({ handleLogout }) {
  const navigate = useNavigate();
  
  const handleClickLogout = () => {
    handleLogout();
    localStorage.clear();
  };
  const handleClick = () => {
    navigate("/feed");
  };
  const handleClickSearch =() => {
    navigate("/search")
  }
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
            alignItems: "baseline",
            padding: 5,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "baseline",
              padding: 10,
            }}
          >
            <Avatar
              sx={{
                m: 3,
                width: 100,
                height: 100,
              }}
              src={loggedUser.profilePicture}
            ></Avatar>
            <Typography variant="h2">{loggedUser.username}</Typography>
          </Box>

          <Typography variant="h4">
            Wow! Look at all the books you've already added to your account.
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "60vw",
              height: "60vh",
            }}
          >
            <DataPieChart />
          </Box>
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
            src={loggedUser.profilePicture}
          ></Avatar>
          <Box>
            <Button
              variant="contained"
              sx={{ margin: 2,
                minWidth: '95px' }}
              onClick={handleClick}
            >
              Feed
            </Button>
          </Box>
          <Button variant="contained" sx={{ margin: 2, minWidth: '95px' }} onClick={handleClickSearch}>
            Search
          </Button>
          <Box>
            <Button
              variant="contained"
              sx={{ margin: 2, minWidth: '95px' }}
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
