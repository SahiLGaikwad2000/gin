import React from 'react';
// import './App.css';
import Form from './Form';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import BookListPage from './BookListPage';

function App() {
  return (
    <div className="min-h-screen bg-gray-200">
      {/* <h1>React Form</h1> */}
      {/* <Form /> */}
      {/* <h1  >test</h1> */}
      <Router>
      <Routes>
      
        <Route path="/" element={<Form/>} />
        <Route path="/booklist" element={<BookListPage/>} />
        </Routes>
    </Router>
    </div>
  );
}

export default App;
