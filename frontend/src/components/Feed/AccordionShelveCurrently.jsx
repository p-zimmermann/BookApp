import { Box, Typography, IconButton, Modal } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ShowBook from "../BookUtils/ShowBook.jsx";
import { useState } from "react";

import EditCurrentlyReadingBook from "./EditCurrentlyReadingBook.jsx";

export default function AccordionShelveCurrently ({ index, currentlyRead }) {

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
            key={currentlyRead.id}
          >
            <ShowBook key={index} book={currentlyRead} />
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
              <EditCurrentlyReadingBook
                modalIsOpen={open}
                closeModal={handleClose}
                bookVolumeInfo={currentlyRead.volumeInfo}
              />
            </Modal>
          </Box>
        </>
      );
}