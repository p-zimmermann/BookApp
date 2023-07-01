import { Box, Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";

export default function EditCurrentlyReadingBook({
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

  //console.log(bookVolumeInfo);

  //add book to library database and delete from currently reading
  const [selectedBook, setSelectedBook] = useState([]);
  const handleClickCurrentlyReadToLib = async ({ bookVolumeInfo }) => {
    const token = localStorage.getItem("token");
    const base64Url = token.split(".")[1]; // Extract the payload (middle part of the token)
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/"); // Replace URL-safe characters
    const payload = JSON.parse(atob(base64));
    const id = payload.id;

    //get info from currentlyRead database
    const responseCurrentlyRead = await axios(
      `http://localhost:3001/currentlyreading?id=${id}`
    );
    //console.log(responseCurrentlyRead.data);
    //find book based on isbn13
    /*   responseCurrentlyRead.data.map((item) => {
      if(item.isbn13 == bookVolumeInfo.industryIdentifiers[0].identifier) {
        setSelectedBook(item)
        console.log(item)
      }
    }
    ) */

    const selectedBookPromise = new Promise(async (resolve) => {
      for (const item of responseCurrentlyRead.data) {
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
      startdate: selectedBook.startdate,
      enddate: currentTimestamp,
      review: "",
    };
    //console.log(finishedBook);

    const config = {
      url: "http://localhost:3001/library",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: finishedBook,
    };
    try {
      const response = await axios(config);
      //console.log(response);
    } catch (error) {
      console.log(error);
    }

    //delete currentread
    const configDelete = {
      url: "http://localhost:3001/currentlyreading",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      data: selectedBook,
    };
    try {
      const res = await axios(configDelete);
      if (res.data.success) {
        alert(res.data.msg);
      }
    } catch (err) {
      console.error(err);
    }

    //add reupload to page
    /* window.location.reload(false);*/
  };

  //add book toread database
  const handleClickDeleteCurrentlyReading = async ({ bookVolumeInfo }) => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    const loggedUserId = loggedUser._id;

    //get info from currentlyRead database
    const responseCurrentlyRead = await axios(
      `http://localhost:3001/currentlyreading?id=${loggedUser._id}`
    );
    //console.log(responseCurrentlyRead.data);
    //find book based on isbn13
    /*   responseCurrentlyRead.data.map((item) => {
        if(item.isbn13 == bookVolumeInfo.industryIdentifiers[0].identifier) {
          setSelectedBook(item)
          console.log(item)
        }
      }
      ) */

    const selectedBookPromise = new Promise(async (resolve) => {
      for (const item of responseCurrentlyRead.data) {
        if (item.isbn13 === bookVolumeInfo.industryIdentifiers[0].identifier) {
          setSelectedBook(item);
          console.log(item);
          resolve(item);
          break;
        }
      }
    });

    const selectedBook = await selectedBookPromise;
    //delete currentread
    const configDelete = {
      url: "http://localhost:3001/currentlyreading",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      data: selectedBook,
    };
    try {
      const res = await axios(configDelete);
      if (res.data.success) {
        alert(res.data.msg);
      }
    } catch (err) {
      console.error(err);
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
            onClick={() => handleClickCurrentlyReadToLib({ bookVolumeInfo })}
          >
            I finished the book!
          </Button>
          <Button
            variant="contained"
            sx={{ m: 1 }}
            onClick={() =>
              handleClickDeleteCurrentlyReading({ bookVolumeInfo })
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
