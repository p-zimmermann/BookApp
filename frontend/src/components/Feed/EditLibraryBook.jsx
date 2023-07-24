import { Box, Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";

import showNotification from "../notification/showNotification";

export default function EditLibraryBook({
  modalIsOpen,
  closeModal,
  bookVolumeInfo,
}) {
  const [open, setOpen] = useState(true); // State to control the modal

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRefresh = () => {
    // Trigger a reload of the whole page
    window.location.reload()
  };

  //delete book from library
  const [selectedBook, setSelectedBook] = useState([]);

  //delete book from library database
  const handleClickDelete = async ({ bookVolumeInfo }) => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    const loggedUserId = loggedUser._id;

    //get info from library database
    const responseLibrary = await axios(
      `http://localhost:3001/library?id=${loggedUser._id}`
    );
    console.log(responseLibrary.data);
    //find book based on isbn13
    const selectedBookPromise = new Promise(async (resolve) => {
      for (const item of responseLibrary.data) {
        if (item.isbn13 === bookVolumeInfo.industryIdentifiers[0].identifier) {
          setSelectedBook(item);
          resolve(item);
          break;
        }
      }
    });

    const selectedBook = await selectedBookPromise;
    //delete currentread
    const configDelete = {
      url: "http://localhost:3001/library",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      data: selectedBook,
    };
    try {
      const res = await axios(configDelete);
      /* if (res.data.success) {
        alert(res.data.msg);
      } */
     //get new info from library database and update
      const responseLib = await axios(
      `http://localhost:3001/library?id=${loggedUser._id}`
      );
      showNotification("Book deleted","normal");
      handleRefresh()
    }  catch (err) {
      showNotification(`${err.responseLib.data.message}`,"red");
      
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
          <Button
            variant="contained"
            sx={{ m: 1 }}
            onClick={() =>
                handleClickDelete({ bookVolumeInfo })
            }
          >
            delete from list
          </Button>
          <Button variant="contained" onClick={closeModal} sx={{ m: 1 }}>
            close/return
          </Button>
        </Box>
      </Box>
    </>
  );
}
