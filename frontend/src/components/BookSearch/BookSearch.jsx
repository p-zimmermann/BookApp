import { Box, TextField, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import SearchResults from "./SearchResults.jsx";


export default function BookSearch() {
  const [books, setBooks] = useState([]);
  const [nytBooks, setNytBooks] = useState([]);
  const [nytCover, setNytCover] = useState([]);
  const nytimesKey = "3QdQnrcpPLUzdrgAFwoJtsqbLYlOsHWF";
  const googleBooksKey =  "AIzaSyC_GqwBGc6ICB15i7B_V-oZj0KeWzE5WJQ";

  const fetchNYTBooks = async () => {
    try {
      const response = await axios.get(
        "https://api.nytimes.com/svc/books/v3/lists.json?list-name=hardcover-fiction&api-key=" +
          nytimesKey
      );
      //console.log(response.data.results);
     /*  setNytBooks(response.data.results); */
      console.log(response.data.results)
      getCover(response.data.results)
    } catch (error) {
      console.error("Error fetching bestseller books:", error);
    }
  };
  // get nyt bestseller list
  useEffect(() => {
    fetchNYTBooks();
    
  }, []);
  // get book cover from nyt bestseller list
  async function getCover(nytBooks) {
    const nytBookCover = nytBooks.map((nytBook)=>{
      return axios
      .get(
        'https://www.googleapis.com/books/v1/volumes', 
        {
          params: {
            q: `isbn:${nytBook.isbns[0].isbn13}`,
            key: "AIzaSyC_GqwBGc6ICB15i7B_V-oZj0KeWzE5WJQ",
          },
        })
      .then((res) => {
        /*  console.log(res) */
        console.log(res)
        setNytCover(nytCover => [...nytCover, res.data.items[0].volumeInfo.imageLinks.thumbnail]);
        setNytBooks(nytBooks => [...nytBooks, res.data.items[0].volumeInfo.title])
       })
       .catch((e) => console.error(e));
    });
    Promise.all(nytBookCover).then(value => console.log(value))
  }

  /*   nytBooks.map((nytBook) => {
      try {
        const response = await axios.get(
            'https://www.googleapis.com/books/v1/volumes', 
            {
              params: {
                q: `isbn:${nytBook.isbns[0].isbn13}`,
                key: "AIzaSyC_GqwBGc6ICB15i7B_V-oZj0KeWzE5WJQ",
              },
            }
        );
        console.log(response.data.items[0].volumeInfo.imageLinks.thumbnail)
        setNytCover(nytCover => [...nytCover, response.data.items[0].volumeInfo.imageLinks.thumbnail])
      } catch (error) {
        console.error("Error fetching book cover:", error);
    }
  })
  } */
  //get userID
  const loggedUser = JSON.parse(localStorage.getItem("user"))

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
      setBooks(response.data.items);
      handleBooksFetched(response.data.items);
      /* console.log(response.data.items); */
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
   
  };
  const onClick = () => {
    fetchBooks(searchText);
  };
  return (
    <>
      <Box sx={{
        
      }}>
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

      <Typography variant="h4" sx={{my: 3}} >Results</Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          my: 3,
        }}
      >
        {books ? (books.map((book, index) => { 
          return <SearchResults key={index} book={book} />;
        })) : (
          <Typography>No Search Results</Typography>
        )
      }
      </Box>
      <Typography variant="h4" sx={{my: 3}}>Current NYT Bestseller Books</Typography>
      <ul>
        {nytCover.map((bookCover, index) => (
          <>
          <li key={bookCover.id}>
            <Typography>{nytBooks[index]}</Typography>
          </li>
            <img src={bookCover}></img>
          </>
          
          ))}
      </ul>
      {}
           
    </>
  );
}

