import React from 'react';
import BookCard from './BookCard';

const BookListPage = () => {
    const books = [
        { book_id: 1, book_name: 'Book One', author: 'Author One', quantity: 10 },
        { book_id: 2, book_name: 'Book Two', author: 'Author Two', quantity: 5 },
        { book_id: 3, book_name: 'Book Three', author: 'Author Three', quantity: 15 },
      ];
    
    return (
        <div>
        <h2 className="text-2xl font-bold mb-4">All Books</h2>
       
       <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
       {books.map((book) => (
         <BookCard key={book.book_id} book={book} />
       ))}
     </div>
     </div>
    );
};
  


export default BookListPage;