const express = require('express');
const axios = require('axios').default;
let fs = require('fs');
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
    getBookPromise.then((data) => {
        return res.status(200).send(JSON.stringify({data}, null ,4));
    }, 
    (error) => {

        return res.status(500).send(error);
    });
});

//function for getting books using promise
const getBookPromise = new Promise((resolve, reject) => {
    resolve(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  
    getBookByIsbnPromise(isbn).then((data) => {
        return res.status(200).send(JSON.stringify({data}, null ,4));
    }, 
    (error) => {

        return res.status(500).send(error);
    });
 });
  
//function for getting books by isbn using promise
const getBookByIsbnPromise = (isbn) => {
    return new Promise((resolve, reject) => {
        let filtered_books = Object.values(books).filter((book) => book.isbn === isbn);

        if(filtered_books.length > 0){
            return resolve(filtered_books);
        }else{

            return reject({message: `Book with ISBN ${isbn} not found`});
        }
    });
}


// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
   
  getBookByAuthorPromise(author).then((data) => {
        return res.status(200).send(JSON.stringify({data}, null ,4));
    }, 
    (error) => {

        return res.status(500).send(error);
    });

  
});

 //function for getting books by author using promise
const getBookByAuthorPromise = (author) => {
    return new Promise((resolve, reject) => {
        let filtered_books = Object.values(books).filter((book) => book.author === author);

        if(filtered_books.length > 0){
            return resolve(filtered_books);
        }else{

            return reject({message: `Book with author ${author} not found`});
        }
    });
}
// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
 
  getBookByTitlePromise(title).then((data) => {
        return res.status(200).send(JSON.stringify({data}, null ,4));
    }, 
    (error) => {

        return res.status(500).send(error);
    });
  
});

//function for getting books by title using promise
const getBookByTitlePromise = (title) => {
    return new Promise((resolve, reject) => {
        let filtered_books = Object.values(books).filter((book) => book.title === title);

        if(filtered_books.length > 0){
            return resolve(filtered_books);
        }else{

            return reject({message: `Book with title ${title} not found`});
        }
    });
}

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
