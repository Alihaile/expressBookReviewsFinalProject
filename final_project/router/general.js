const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    // res.setHeader('Content-Type', 'application/json');
  return res.status(200).send(JSON.stringify({books}, null ,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  let filtered_books = Object.values(books).filter((book) => book.isbn === isbn);
  
  if(filtered_books.length > 0){
    return res.status(200).json({"books": filtered_books});
  }else{

    return res.status(404).json({message: `Book with ISBN ${isbn} not found`});
  }

 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  let filtered_books = Object.values(books).filter((book) => book.author === author);

  if(filtered_books.length > 0){
    return res.status(200).json({"books": filtered_books});
  }else{

    return res.status(404).json({message: `Book with author ${author} not found`});
  }
  
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  let filtered_books = Object.values(books).filter((book) => book.title === title);

  if(filtered_books.length > 0){
    return res.status(200).json({"books": filtered_books});
  }else{

    return res.status(404).json({message: `Book with title ${title} not found`});
  }
  
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  let filtered_books = Object.values(books).filter((book) => book.isbn === isbn);

  if(filtered_books.length > 0){
    let book_reviews = filtered_books[0].reviews;
   return res.status(200).json({"reviews": Object.keys(book_reviews).length });
  }

    
});

module.exports.general = public_users;
