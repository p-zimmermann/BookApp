import { Box, Typography, IconButton, Modal } from "@mui/material";

export default function ShowBook ({book}) {
    /* console.log(book) */
    return(
        <>
        <Box>
        <Typography>{book.volumeInfo && book.volumeInfo.title ? book.volumeInfo.title : null}</Typography>
        <Typography>
          {book.volumeInfo && book.volumeInfo.authors && book.volumeInfo.authors[0]
            ? book.volumeInfo.authors[0]
            : null}
        </Typography>
        <Box sx={{
          
        }}>
          <img
            src={
              book.volumeInfo && book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail
                ? book.volumeInfo.imageLinks.thumbnail
                : "../../../img/buch_platzhalter.png"
            }
            width="70%"
          ></img>
        </Box>
        </Box>
        </>
    )

}
    