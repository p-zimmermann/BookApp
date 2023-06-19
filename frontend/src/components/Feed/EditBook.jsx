import { Box, Button } from "@mui/material";
import { useState } from "react";

export default function EditBook({ modalIsOpen, closeModal, books }) {
  const [open, setOpen] = useState(true); // State to control the modal

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log(books)

  function BookCoverDisplay({books}){
    if(books.volumeInfo.imageLinks && books.volumeInfo.imageLinks.thumbnail){
        return(
            <>
            <Box>
            <img
                src={
                  books.volumeInfo.imageLinks &&
                  books.volumeInfo.imageLinks.thumbnail
                    ? books.volumeInfo.imageLinks.thumbnail
                    : null
                }
              ></img>
            </Box>
            </>
            
        )
    }
    else null
  }

  return (
    <>
      <Box sx={{
            display: 'flex',
            flexDirection: "row",
            height: 250,
            bgcolor: "secondary.main"
        }}>
           
           
            <Box
                sx={{
                    display: 'flex',
                    flexDirection:"column",
                    p: 2
                }}
            >
                <Button variant="contained" sx={{m:1}}>add to library</Button>
                <Button variant="contained" sx={{m:1}}>currently reading</Button>
                <Button variant="contained" sx={{m:1}}>to read</Button>
                <Button variant="contained" onClick={closeModal} sx={{m:1}}>close/return</Button>
            </Box>
      </Box>
    </>
  );
}
