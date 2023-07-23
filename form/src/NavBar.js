import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({onClickWishlist,book_number}) => {
    
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Library Management</h1>
        <ul className="flex space-x-4">
          <li>
            <div className='flex gap-2 items-center'>
            <div onClick={()=>onClickWishlist()} className="text-white hover:text-blue-300">
              <Link to="/wishlist">Wishlist</Link> 
            </div>
            <div className=" -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                  {book_number}
                </div>
            </div>
            
          </li>
          {/* Add more navigation items as needed */}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;