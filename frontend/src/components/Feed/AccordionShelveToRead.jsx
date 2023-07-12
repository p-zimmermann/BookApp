import { Box, Typography, IconButton, Modal } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ShowBook from "../BookUtils/ShowBook.jsx";
import { useState } from "react";

import EditToReadBook from "./EditToReadBook.jsx";
/* import useFetchByUserId from '../customHooks/useFetchByUserId.jsx' */

export default function AccordionShelveToRead ({ index, toRead }) {

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
            key={toRead.id}
          >
            <ShowBook key={index} book={toRead} />
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
              <EditToReadBook
                modalIsOpen={open}
                closeModal={handleClose}
                bookVolumeInfo={toRead.volumeInfo}
              />
            </Modal>
          </Box>
        </>
      );
}