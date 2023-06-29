import { Box, Typography, IconButton, Modal } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function ShowBook ({book}) {
    console.log(book)
    return(
        <>
        <Box>
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
        </Box>
        </>
    )

}
    