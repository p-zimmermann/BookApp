import { Box, Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";

import showNotification from "../notification/showNotification";

export default function EditBook({ modalIsOpen, closeModal, bookVolumeInfo }) {
  const [open, setOpen] = useState(true); // State to control the modal

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //get userID
  const loggedUser = JSON.parse(localStorage.getItem("user"));

  //add book to library database
  const handleClickLibrary = async ({ bookVolumeInfo }) => {
    const library = {
      userId: loggedUser._id.toString(),
      isbn13: bookVolumeInfo.industryIdentifiers[0].identifier,
      startdate: "",
      enddate: "",
      review: "",
    };

    const config = {
      url: "http://localhost:3001/library",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: library,
    };
    try {
      const response = await axios(config);
      showNotification("Book added to Library", "normal");
     
    } catch (error) {
      showNotification(`${error.response.data.message}`,"red");
    }
  };
//add book to library database
const handleClickCurrentlyRead = async ({ bookVolumeInfo }) => {
  const currentTimestamp = new Date().toLocaleString();
  const currentlyReading = {
    userId: loggedUser._id.toString(),
    isbn13: bookVolumeInfo.industryIdentifiers[0].identifier,
    startdate: currentTimestamp,
    enddate: "",
  };

  const config = {
    url: "http://localhost:3001/currentlyreading",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: currentlyReading,
  };
  try {
    const response = await axios(config);
    showNotification("Book added to Currently Reading", "normal");
  } catch (error) {
    showNotification(`${error.response.data.message}`,"red");
  }
};
  //add book toread database
  const handleClickToRead = async ({ bookVolumeInfo }) => {
    const toReadBook = {
      userId: loggedUser._id.toString(),
      isbn13: bookVolumeInfo.industryIdentifiers[0].identifier,
    };

    const config = {
      url: "http://localhost:3001/toread",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: toReadBook,
    };
    try {
      const response = await axios(config);
      showNotification("Book added to To Read List", "normal");
    } catch (error) {
      showNotification(`${error.response.data.message}`,"red");
    }
  };

  function BookCoverDisplay({ bookVolumeInfo }) {
    if (bookVolumeInfo.imageLinks && bookVolumeInfo.imageLinks.thumbnail) {
      return (
        <>
          <Box>
            <img
              src={
                bookVolumeInfo.imageLinks && bookVolumeInfo.imageLinks.thumbnail
                  ? bookVolumeInfo.imageLinks.thumbnail
                  : null
              }
            ></img>
          </Box>
        </>
      );
    } else  return <img src="../../../img/buch_platzhalter.png"></img>;
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          height: 250,
          bgcolor: "primary.light",
          alignItems: "center",
          p: 1
        }}
      >
        {BookCoverDisplay({ bookVolumeInfo })}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 2,
          }}
        >
          <Button
            variant="contained"
            
            sx={{ m: 1 }}
            onClick={() => handleClickLibrary({ bookVolumeInfo })}
          >
            add to library
          </Button>
          <Button
            variant="contained"
            sx={{ m: 1 }}
            onClick={() => handleClickCurrentlyRead({ bookVolumeInfo })}
          >
            currently reading
          </Button>
          <Button
            variant="contained"
            sx={{ m: 1 }}
            onClick={() => handleClickToRead({ bookVolumeInfo })}
          >
            to read
          </Button>
          <Button variant="contained" onClick={closeModal} sx={{ m: 1 }}>
            close/return
          </Button>
        </Box>
      </Box>
    </>
  );
}
