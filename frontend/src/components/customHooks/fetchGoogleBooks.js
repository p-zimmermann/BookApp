import { useState } from 'react';

export default function fetchGoogleBooks(){

    const [books, setBooks] = useState([]);
    //value can be anything
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
          console.log(response.data.items);
        } catch (error) {
          console.error("Error fetching bestseller books:", error);
        }
      };
    return [fetchBooks]
}