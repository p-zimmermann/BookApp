import { Box, Button, Avatar } from "@mui/material";
import AccordionShelve from "./AccordionShelve.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import useFetchByUserId from "../customHooks/useFetchByUserId.js";

export default function FeedPage({ handleLogout }) {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate("/search");
  };

  const handleClickLogout = () => {
    handleLogout();
  };

  /* useEffect(() => {
    getUserData(); 
    getToReadData();
  }, []); */

  const loggedUser = JSON.parse(localStorage.getItem("user"));

  const [currentlyRead, setCurrentlyRead] = useState([]);
  const [toRead, setToRead] = useState([]);
  const [libBook, setLibBook] = useState([]);
  //get books by userid
  async function waitForBooks() {
    const currentlyreading = "currentlyreading";
    const data = await useFetchByUserId(currentlyreading);
    console.log(data.toReadBooks);
    setCurrentlyRead(data.toReadBooks);
  }
  async function waitForLibBooks() {
    const library = "library";
    const dataLib = await useFetchByUserId(library);
    console.log(dataLib.toReadBooks);
    setLibBook(dataLib.toReadBooks);
  }
  async function waitForToReadBooks() {
    const toread = "toread";
    const dataToRead = await useFetchByUserId(toread);
    console.log(dataToRead.toReadBooks);
    setToRead(dataToRead.toReadBooks);
  }

  waitForBooks();
  waitForLibBooks();
  waitForToReadBooks();

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
          <AccordionShelve
            currentlyRead={currentlyRead}
            toRead={toRead}
            libBook={libBook}
            sx={{
              display: "flex",
            }}
          ></AccordionShelve>
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
