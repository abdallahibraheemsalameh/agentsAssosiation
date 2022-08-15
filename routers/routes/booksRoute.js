const express = require('express');
const booksRoute = express.Router();
const { createUserToken, verifyUserToken } = require('../../jwt');
const {
  getAllBooks,
  addBooks,
  getAllReaders,
  addIMGS,
  updateOwner,
  deleteOwner,
  updateBook,
  deleteBook,
  updateImg,
  deleteImg,
  Signup,
  Login,
} = require('../controllers/books');

booksRoute.get('/books/:id/:search', getAllBooks);
booksRoute.post('/book', verifyUserToken, addBooks);
booksRoute.get('/readers', getAllReaders);
booksRoute.post('/img', addIMGS);
booksRoute.post('/update', updateOwner);
booksRoute.post('/delete', deleteOwner);
booksRoute.post('/updatebook', updateBook);
booksRoute.get('/deleteBook/:id', deleteBook);
booksRoute.post('/updateImg', updateImg);
booksRoute.post('/deleteImg', deleteImg);
booksRoute.post('/Signup', Signup);
booksRoute.post('/Login', Login);

/// exports
module.exports = booksRoute;
