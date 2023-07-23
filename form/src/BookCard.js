import React from 'react';

const BookCard = ({ book,onAddToWishList,isInWishlist }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h2 className="text-lg font-bold">{book.book_name}</h2>
      <p className="text-sm text-gray-600">Author: {book.author}</p>
      <p className="text-sm text-gray-600">Quantity: {book.quantity}</p>
      <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-2" onClick={() => onAddToWishList(book)}>
        {!isInWishlist?'Add to Wishlist':'Remove from wishlist'}
      </button>
    </div>
  );
};

export default BookCard;