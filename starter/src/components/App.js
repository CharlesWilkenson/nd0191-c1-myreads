import "../App.css";
import { useEffect, useState } from "react";
import * as BooksAPI from "./BooksAPI";
import { Route, Routes } from "react-router-dom";
import ListBooks from "./ListBooks";

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [books, setBooks] = useState([]);

  const moveBook = (book, value) => {
    if (value !== "none") {
      setBooks(books.map(item => {
        if (item.id === book.id) {
          item.shelf = value;
        }
        return item;
      })

      );
    }
  }

  useEffect(() => {
    const getBooks = async () => {
      const res = await BooksAPI.getAll();
      setBooks(res);
      console.log(res)
    }
    getBooks();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<ListBooks books={books} onMoveBook={moveBook} />}></Route>
      <Route path="/search" element={<ListBooks books={books} onMoveBook={moveBook}  />}></Route>
    </Routes>
  )
}

export default App;
