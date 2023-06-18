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


export default function FeedPage() {

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
          <Avatar
            size="md"
            sx={{
              m: 3,
              p: "1rem",
            }}
          ></Avatar>
          <Button variant="contained" sx={{ margin: 2 }}>
            Profile
          </Button>
        </Box>
      </Box>
    </>
  );
}
