import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

const ListBooks = ({ books, onMoveBook }) => {
    let navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [showSearchPage, setShowSearchpage] = useState(false);
    const [isValueProvided, setValueProvided] = useState(false);

    const showingBooks = query === ""
        ? books
        : books.filter((b) =>
            b.title.toLowerCase().includes(query.toLowerCase())
        );

    const updateQuery = (query) => {
        setQuery(query.trim());
        if (query !== "") {
            setValueProvided(true);
        } else {
            setValueProvided(false);
        }
    }
    const clearQuery = () => {
        updateQuery("");
        navigate("/")
    }

    return (
        <div className="app">
            {showSearchPage ? (
                <div className="search-books">
                    <div className="search-books-bar">
                        <a
                            className="close-search"
                            onClick={() => { setShowSearchpage(!showSearchPage); clearQuery() }}
                        >
                            Close
                        </a>
                        <div className="search-books-input-wrapper">
                            <input
                                type="text" value={query} onChange={(event) => { updateQuery(event.target.value) }}
                                placeholder="Search by title, author, or ISBN"
                            />
                        </div>
                    </div>

                    {<div className="search-books-results">
                        <ol className="books-grid">
                            {isValueProvided && showingBooks.map(filteredBook => (
                                <li key={filteredBook.id}>
                                    <div className="book">
                                        <div className="book-top">
                                            <div
                                                className="book-cover"
                                                style={{
                                                    width: 128,
                                                    height: 193,
                                                    backgroundImage: `url(${filteredBook.imageLinks.thumbnail})`
                                                }}
                                            ></div>
                                            <div className="book-shelf-changer">
                                                <select defaultValue={filteredBook.shelf}
                                                    onChange={(event) => {
                                                        onMoveBook(filteredBook, event.target.value);
                                                    }}>
                                                    <option value="none" disabled>
                                                        Move to...
                                                    </option>
                                                    <option value="currentlyReading">
                                                        Currently Reading
                                                    </option>
                                                    <option value="wantToRead">Want to Read</option>
                                                    <option value="read">Read</option>
                                                    <option value="none">None</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="book-title">{filteredBook.title}</div>
                                        <div className="book-authors">{filteredBook.authors}</div>
                                    </div>
                                </li>
                            ))}

                        </ol>

                    </div>}

                </div>
            ) : (
                <div className="list-books">
                    <div className="list-books-title">
                        <h1>MyReads</h1>
                    </div>
                    <div className="list-books-content">
                        <div>
                            <div className="bookshelf">
                                <h2 className="bookshelf-title">Currently Reading</h2>
                                <div className="bookshelf-books">
                                    <ol className="books-grid">
                                        {showingBooks.filter(book => book.shelf === "currentlyReading").map(filteredBook => (
                                            <li key={filteredBook.id}>
                                                <div className="book">
                                                    <div className="book-top">
                                                        <div
                                                            className="book-cover"
                                                            style={{
                                                                width: 128,
                                                                height: 193,
                                                                backgroundImage: `url(${filteredBook.imageLinks.thumbnail})`
                                                            }}
                                                        ></div>
                                                        <div className="book-shelf-changer">
                                                            <select
                                                                defaultValue={filteredBook.shelf}
                                                                onChange={(event) => {
                                                                    onMoveBook(filteredBook, event.target.value);
                                                                }}
                                                            >
                                                                <option value="none" disabled>
                                                                    Move to...
                                                                </option>
                                                                <option value="currentlyReading">
                                                                    Currently Reading
                                                                </option>
                                                                <option value="wantToRead">Want to Read</option>
                                                                <option value="read">Read</option>
                                                                <option value="none">None</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="book-title">{filteredBook.title}</div>
                                                    <div className="book-authors">{filteredBook.authors}</div>
                                                </div>
                                            </li>
                                        ))}

                                    </ol>
                                </div>
                            </div>
                            <div className="bookshelf">
                                <h2 className="bookshelf-title">Want to Read</h2>
                                <div className="bookshelf-books">
                                    <ol className="books-grid">
                                        {showingBooks.filter(book => book.shelf === "wantToRead").map(filteredBook => (
                                            <li key={filteredBook.id}>
                                                <div className="book">
                                                    <div className="book-top">
                                                        <div
                                                            className="book-cover"
                                                            style={{
                                                                width: 128,
                                                                height: 193,
                                                                backgroundImage: `url(${filteredBook.imageLinks.thumbnail})`
                                                            }}
                                                        ></div>
                                                        <div className="book-shelf-changer">
                                                            <select defaultValue={filteredBook.shelf}
                                                                onChange={(event) => {
                                                                    onMoveBook(filteredBook, event.target.value);
                                                                }}>
                                                                <option value="none" disabled>
                                                                    Move to...
                                                                </option>
                                                                <option value="currentlyReading">
                                                                    Currently Reading
                                                                </option>
                                                                <option value="wantToRead">Want to Read</option>
                                                                <option value="read">Read</option>
                                                                <option value="none">None</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="book-title">{filteredBook.title}</div>
                                                    <div className="book-authors">{filteredBook.authors}</div>
                                                </div>
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            </div>
                            <div className="bookshelf">
                                <h2 className="bookshelf-title">Read</h2>
                                <div className="bookshelf-books">
                                    <ol className="books-grid">
                                        {showingBooks.filter(book => book.shelf === "read").map(filteredBook => (
                                            <li key={filteredBook.id}>
                                                <div className="book">
                                                    <div className="book-top">
                                                        <div
                                                            className="book-cover"
                                                            style={{
                                                                width: 128,
                                                                height: 193,
                                                                backgroundImage: `url(${filteredBook.imageLinks.thumbnail})`
                                                            }}
                                                        ></div>
                                                        <div className="book-shelf-changer">
                                                            <select defaultValue={filteredBook.shelf}
                                                                onChange={(event) => {
                                                                    onMoveBook(filteredBook, event.target.value);
                                                                }}>
                                                                <option value="none" disabled>
                                                                    Move to...
                                                                </option>
                                                                <option value="currentlyReading">
                                                                    Currently Reading
                                                                </option>
                                                                <option value="wantToRead">Want to Read</option>
                                                                <option value="read">Read</option>
                                                                <option value="none">None</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="book-title">{filteredBook.title}</div>
                                                    <div className="book-authors">{filteredBook.authors}</div>
                                                </div>
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="open-search">
                        <Link to="/search"
                            onClick={() => setShowSearchpage(!showSearchPage)}
                        >Add a book</Link>
                    </div>
                </div>
            )}
        </div>
    );

};

export default ListBooks;