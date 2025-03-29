const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
let userswithsamename = users.filter((user) => {
    return user.username === username;
  });
  return userswithsamename.length > 0;
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.

  let validusers = users.filter((user) => {
    return user.username === username && user.password === password;
  });
  return validusers.length > 0;
}

// Route to handle user registration
regd_users.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (username && password) {
      if (!isValid(username)) {
        users.push({ "username": username, "password": password });
        return res.status(200).json({ message: "User successfully registered. Now you can login" });
      } else {
        return res.status(404).json({ message: "User already exists!" });
      }
    }
    return res.status(404).json({ message: "Please provide username and password." });
  });
  

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(404).json({ message: "Error logging in" });
  }

  if (authenticatedUser(username, password)) {
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 60 * 60 });

    req.session.authorization = {
      accessToken, username
    };
    return res.status(200).send("User successfully logged in");
  } else {
    return res.status(208).json({ message: "Invalid Login. Check username and password" });
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const username = req.session.authorization['username'];
  const reviewUsername = req.params.username;
  const rating = req.params.rating;
  const description = req.params.description;

  const isbn = req.params.isbn;
  let filtered_book = Object.values(books).filter((book) => book.isbn === isbn);

  //review object
  let reviewObj = {
    "rating": rating,
    "description": description

  }
  if(filtered_book.length > 0){
    let book_reviews = filtered_books[0].reviews;
    let userReviews = Object.values(book_reviews).filter((review) => review.username === loggedInUser);


    if(userReviews.length > 0){ //existing review
        userReviews
        return res.status(200).json({"message": "Review Update for current user"});
    }else{ //new review
        // books[]
        return res.status(200).json({"message": "Review Added for current user"});
    }
    return res.status(200).json({"books": filtered_books});
  }else{

    return res.status(404).json({message: `Book with ISBN ${isbn} not found`});
  }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
