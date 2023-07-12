import { Box, Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";

import showNotification from "../notification/showNotification";

export default function EditToReadBook({
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

  //add book to library database and delete from currently reading
  const [selectedBook, setSelectedBook] = useState([]);
  const handleClickToReadToCurrently = async ({ bookVolumeInfo }) => {
    const token = localStorage.getItem("token");
    const base64Url = token.split(".")[1]; // Extract the payload (middle part of the token)
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/"); // Replace URL-safe characters
    const payload = JSON.parse(atob(base64));
    const id = payload.id;

    //get info from currentlyRead database
    const responseToRead = await axios(
      `http://localhost:3001/toread?id=${id}`
    );

    const selectedBookPromise = new Promise(async (resolve) => {
      for (const item of responseToRead.data) {
        if (item.isbn13 === bookVolumeInfo.industryIdentifiers[0].identifier) {
          setSelectedBook(item);
          //console.log(item);
          resolve(item);
          break;
        }
      }
    });

    const selectedBook = await selectedBookPromise;

    // move currentlyRead data to library and add enddate based on timestamps
    const currentTimestamp = new Date().toLocaleString();
    const finishedBook = {
      isbn13: selectedBook.isbn13,
      userId: selectedBook.userId,
      startdate: currentTimestamp,
      enddate: "",
    };
    //console.log(finishedBook);

    const config = {
      url: "http://localhost:3001/currentlyreading",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: finishedBook,
    };
    try {
      const response = await axios(config);
    } catch (error) {
      console.log(error);
    }

    //delete toRead
    const configDelete = {
      url: "http://localhost:3001/toread",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      data: selectedBook,
    };
    try {
      const res = await axios(configDelete);
      showNotification("Book moved to Currently Reading","normal");
      handleRefresh()
    } catch (err) {
      showNotification(`${err.response.data.message}`,"red");
      /* console.error(err); */
    }
  };

  //delete book from toread database
  const handleClickDeleteToRead = async ({ bookVolumeInfo }) => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    const loggedUserId = loggedUser._id;

    //get info from toRead database
    const responseToRead = await axios(
      `http://localhost:3001/toread?id=${loggedUser._id}`
    );
    console.log(responseToRead.data);
    //find book based on isbn13
    const selectedBookPromise = new Promise(async (resolve) => {
      for (const item of responseToRead.data) {
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
      url: "http://localhost:3001/toread",
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
     //get new info from toRead database and update
      const responseToRead = await axios(
      `http://localhost:3001/toread?id=${loggedUser._id}`
      );
      showNotification("Book deleted","normal");
      handleRefresh()
    }  catch (err) {
      showNotification(`${err.responseToRead.data.message}`,"red");
      
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
            onClick={() => handleClickToReadToCurrently({ bookVolumeInfo })}
          >
            I started reading the book!
          </Button>
          <Button
            variant="contained"
            sx={{ m: 1 }}
            onClick={() =>
                handleClickDeleteToRead({ bookVolumeInfo })
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
