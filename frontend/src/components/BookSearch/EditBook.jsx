import { Box, Button } from "@mui/material";
import { useState } from "react";

export default function EditBook({ modalIsOpen, closeModal, bookVolumeIfo }) {
  const [open, setOpen] = useState(true); // State to control the modal

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log(bookVolumeIfo);

  function BookCoverDisplay({ bookVolumeIfo }) {
    if (bookVolumeIfo.imageLinks && bookVolumeIfo.imageLinks.thumbnail) {
      return (
        <>
          <Box>
            <img
              src={
                bookVolumeIfo.imageLinks && bookVolumeIfo.imageLinks.thumbnail
                  ? bookVolumeIfo.imageLinks.thumbnail
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
        {BookCoverDisplay({ bookVolumeIfo })}
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
          <Button variant="contained" sx={{ m: 1 }}>
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
