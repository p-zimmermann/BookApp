import {
  Box,
  Button,
  Avatar,
  TextField,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Collapse,
  IconButton
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from "react";
import axios from "axios";
import BookSearch from './BookSearch.jsx';
import { useNavigate } from "react-router-dom";


export default function FeedPage() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/feed");
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
          
            bgcolor: "primary.light",
            justifyContent: "flex-start",
            padding: 10,
          }}
        >
        <BookSearch/>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minWidth: "15vw",
            justifyContent: "flex-start",
          }}
        >
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
          </Box>
          
          <Button variant="contained" sx={{ margin: 2 }} onClick={handleClick}>
            Feed
          </Button>
        </Box>
      </Box>
    </>
  );
}
