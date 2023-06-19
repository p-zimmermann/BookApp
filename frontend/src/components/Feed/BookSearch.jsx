import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  Modal,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useEffect, useState } from "react";
import axios from "axios";

import EditBook from "./EditBook.jsx";

export default function BookSearch() {
  const [books, setBooks] = useState([]);
  const [nytBooks, setNytBooks] = useState([]);
  const nytimesKey = "3QdQnrcpPLUzdrgAFwoJtsqbLYlOsHWF";
  const googleBooksKey = "AIzaSyC_GqwBGc6ICB15i7B_V-oZj0KeWzE5WJQ";

  // get nyt bestseller list
  useEffect(() => {
    const fetchNYTBooks = async () => {
      try {
        const response = await axios.get(
          "https://api.nytimes.com/svc/books/v3/lists.json?list-name=hardcover-fiction&api-key=" +
            nytimesKey
        );
        console.log(response.data.results);
        setNytBooks(response.data.results);
      } catch (error) {
        console.error("Error fetching bestseller books:", error);
      }
    };
    fetchNYTBooks();
  }, []);
  // get book cover from nyt bestseller list
  /*  async function getCover(id, isbn) {
    try {
        const response = await axios.get(
            'https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn + "&key=" + googleBooksKey
        );
        console.log(reponse.items)
        var img = response.items[0].volumeInfo.imageLinks.thumbnail;
        
    } catch (error) {
        console.error("Error fetching bestseller books:", error);
  } */

  //get book from google api
  const fetchBooks = async (value) => {
    try {
      const response = await axios.get(
        "https://www.googleapis.com/books/v1/volumes",
        {
          params: {
            q: value,
            key: "AIzaSyC_GqwBGc6ICB15i7B_V-oZj0KeWzE5WJQ",
          },
        }
      );
      /*   setTimeout(() => {
        setBooks(response.data.items);
        handleBooksFetched(response.data.items);
      }, 3000); */
      setBooks(response.data.items);
      handleBooksFetched(response.data.items);
      console.log(response.data.items);
    } catch (error) {
      console.error("Error fetching bestseller books:", error);
    }
  };

  const handleBooksFetched = (fetchedBooks) => {
    console.log(fetchedBooks);
    // Perform any actions that require the fetched books here
  };

  const [searchText, setSearchText] = useState("");
  const handleChange = (event) => {
    setSearchText(event.target.value);
    console.log(searchText);
  };
  const onClick = () => {
    console.log(searchText);
    fetchBooks(searchText);
  };

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
      <Box>
        <TextField
          label="search for title"
          /* value='search' */
          onChange={handleChange}
          sx={{
            width: "80%",
          }}
        ></TextField>
        <Button variant="contained" onClick={onClick}>
          Start Search
        </Button>
      </Box>

      <h2>Results</h2>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {books.map((books, index) => (
          <Box
            sx={{
              width: "20%",
              padding: 2,
            }}
            key={books.id}
          >
            <Typography>{index+1}. {books.volumeInfo.title}</Typography>
            <Typography>
              {books.volumeInfo.authors && books.volumeInfo.authors[0] ? books.volumeInfo.authors[0] : null}
            </Typography>
            <Box sx={{}}>
              <img
                src={
                  books.volumeInfo.imageLinks &&
                  books.volumeInfo.imageLinks.thumbnail
                    ? books.volumeInfo.imageLinks.thumbnail
                    : null
                }
              ></img>
            </Box>
            <IconButton onClick={handleOpen}>
              <AddCircleIcon />
            </IconButton>
          </Box>
        ))}

        <Modal
          open={open}
          onClose={handleClose}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <EditBook modalIsOpen={open} closeModal={handleClose} books={books.volumeInfo} />
        </Modal>
      </Box>
      <h2>Bestseller Books</h2>
      <ul>
        {nytBooks.map((nytBooks) => (
          <li key={nytBooks.id}>{nytBooks.book_details[0].title}</li>
        ))}
      </ul>
      {/* <p>
          {nytBooks.map((nytBooks) => (
                getCover(nytBooks.id, nytBooks.data.isbns[0].isbn10)
            ))}
            </p> */}
    </>
  );
}
