import { Box, Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";

export default function EditBook({ modalIsOpen, closeModal, bookVolumeInfo }) {
  const [open, setOpen] = useState(true); // State to control the modal

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log(bookVolumeInfo);
  //get userID
  const loggedUser = JSON.parse(localStorage.getItem("user"));

  //add book toread database
  const handleClickToRead = async({ bookVolumeInfo }) => {
    const toReadBook = {
      id: loggedUser._id,
      isbn13: bookVolumeInfo.industryIdentifiers[0].identifier,
    };
    console.log(toReadBook)

    const config = {
      url: "http://localhost:3001/toread",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      data: toReadBook
    }
    try {
      const response = await axios(config);
      console.log(response);
    }
    catch(error){
      console.log(error)
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
    } else null;
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          height: 250,
          bgcolor: "secondary.main",
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
          <Button variant="contained" sx={{ m: 1 }}>
            add to library
          </Button>
          <Button variant="contained" sx={{ m: 1 }}>
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
