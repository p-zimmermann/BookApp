import { Box, Typography, IconButton, Modal } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ShowBook from "../BookUtils/ShowBook.jsx";
import { useState } from "react";

import EditToReadBook from "./EditToReadBook.jsx";

export default function AccordionShelveLibrary ({ index, libBook }) {

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
            key={libBook.id}
          >
            <ShowBook key={index} book={libBook} />
          </Box>
        </>
      );
}