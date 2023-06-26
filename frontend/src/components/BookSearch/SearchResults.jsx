import { Box, Typography, IconButton, Modal } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useEffect, useState } from "react";

import EditBook from "./EditBook.jsx";

export default function SearchResults({ index, book }) {
  //const { book } = this.props;

  console.log(book.volumeInfo);

  //open modal of edit book
  const [open, setOpen] = useState(false); // State to control the modal

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          width: "20%",
          padding: 2,
        }}
        key={book.id}
      >
        <Typography>{book.volumeInfo.title}</Typography>
        <Typography>
          {book.volumeInfo.authors && book.volumeInfo.authors[0]
            ? book.volumeInfo.authors[0]
            : null}
        </Typography>
        <Box sx={{}}>
          <img
            src={
              book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail
                ? book.volumeInfo.imageLinks.thumbnail
                : null
            }
          ></img>
        </Box>
        <IconButton onClick={handleOpen}>
          <AddCircleIcon />
        </IconButton>
        <Modal
          open={open}
          onClose={handleClose}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <EditBook
            modalIsOpen={open}
            closeModal={handleClose}
            bookVolumeInfo={book.volumeInfo}
          />
        </Modal>
      </Box>
    </>
  );
}
