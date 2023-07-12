import { useState, useEffect } from "react";
import axios from "axios";

export default async function useFetchByUserId(booklist) {
  const token = localStorage.getItem("token");
  const base64Url = token.split(".")[1]; // Extract the payload (middle part of the token)
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/"); // Replace URL-safe characters
  const payload = JSON.parse(atob(base64));
  const id = payload.id;
  const [bookdata, setBookdata] = useState([]);
  const [toReadBooks, setToReadBooks] = useState([]);

  const fetchData = async (booklist) => {
    
    try {
      const response = await axios(
        `http://localhost:3001/${booklist}?id=${id}`
      );
      const toReadData = response.data.map((toreadBook) => {
        return {
          userId: toreadBook.userId,
          isbn13: toreadBook.isbn13,
        };
      });
      setBookdata(toReadData);
      
      const fetchToRead = toReadData.map((item) => {
        return axios
          .get("https://www.googleapis.com/books/v1/volumes", {
            params: {
              q: `isbn:${item.isbn13}`,
              key: "AIzaSyC_GqwBGc6ICB15i7B_V-oZj0KeWzE5WJQ",
            },
          })
          .then((res) => {
           /*  console.log(res) */
            setToReadBooks(toReadBooks => [...toReadBooks, res.data.items[0]]);
          })
          .catch((e) => console.error(e));
      });
      Promise.all(fetchToRead).then(value => console.log(value));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(booklist)
  }, []);

  return {toReadBooks}
}
