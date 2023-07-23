import React, { useState } from 'react';
import BookCard from './BookCard';
import NavBar from './NavBar';

const BookListPage = () => {
    const books = [
        { book_id: 1, book_name: 'Book One', author: 'Author One', quantity: 10 },
        { book_id: 2, book_name: 'Book Two', author: 'Author Two', quantity: 5 },
        { book_id: 3, book_name: 'Book Three', author: 'Author Three', quantity: 15 },
      ];

    const [wishlist, setWishlist] = useState([]);
    const clickWishlist=()=>{
        console.log(wishlist)
    }
    const addToWishlist = (book) => {
        if (wishlist.some((item) => item.book_id === book.book_id)) {
            // If the book is already in the wishlist, remove it
            setWishlist((prevWishlist) => prevWishlist.filter((item) => item.book_id !== book.book_id));
          } else {
            // If the book is not in the wishlist, add it
            setWishlist((prevWishlist) => [...prevWishlist, book]);
          }
        
        
        
      };

    
    return (
        
        <div >
            <NavBar onClickWishlist={clickWishlist} book_number={wishlist.length}/>
       
       
        <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Book List</h1>
      {books.map((book) => (
        <BookCard key={book.book_id} book={book} onAddToWishList={addToWishlist} isInWishlist={wishlist.some((item) => item.book_id === book.book_id)}/>
      ))}
    </div>
     </div>
    );
};
  


export default BookListPage;