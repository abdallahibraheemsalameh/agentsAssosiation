const { sequelize } = require('../../models/index');
const uuid = require('uuid');
require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { createUserToken } = require('../../jwt');

// 🟢
// @DESC ➡ get all Readers form the database (they are static users)
// @ROUTE ➡ GET  /readers
// @ACCESS ➡ ***

const getAllReaders = async (req, res) => {
  try {
    const readers = await sequelize.models.Readers.findAll({});

    res.status(200).json(readers);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
// 🟢

// 🟢

// @DESC ➡ get all books from the database
// @ROUTE ➡ GET /books/:id/:search
// @ACCESS ➡ public

const getAllBooks = async (req, res) => {
  try {
    let whereObj = {};
    req.params.search !== 'null'
      ? (whereObj = {
          recordStatus: 'latest',
          bookname: req.params.search,
        })
      : (whereObj = {
          recordStatus: 'latest',
        });
    // const search = req.params.search;
    const Books = await sequelize.models.Books.findAndCountAll({
      limit: 4,
      offset: (req.params.id - 1) * 4,
      where: whereObj,
      order: [['createdTime', 'DESC']],
    });

    const count = await Books.count;
    // res.send(Books.rows);

    const response = [];
    for (let i = 0; i < Books.rows.length; i++) {
      const element = Books.rows[i];
      const owner = await sequelize.models.Owners.findAll({
        where: {
          bookID: element.bookID,
          recordStatus: 'latest',
        },
      });
      const imgs = await sequelize.models.Imgs.findAll({
        where: {
          bookID: element.bookID,
        },
      });
      response.push({
        ...element.dataValues,
        owner,
        imgs,
      });
    }
    res.status(200).json({ response, count });
  } catch (error) {
    res.status(400).json(error.message);
  }
};
// 🟢

// 🟢

// @DESC ➡ delete book from the database
// @ROUTE ➡ GET /deleteBook/:id
// @ACCESS ➡ private

const deleteBook = async (req, res) => {
  const bookID = req.params.id;
  try {
    const findBook = await sequelize.models.Books.findOne({
      where: { bookID: bookID },
    });
    const updateOwner = await sequelize.models.Books.update(
      { recordStatus: 'deleted' },
      { where: { bookID: bookID } }
    );
    res.status(200).json(findBook);
  } catch (error) {
    console.log(error);
  }
};
// 🟢

// 🟢

// @DESC ➡ add book to the database
// @ROUTE ➡ POST /book
// @ACCESS ➡ public

const addBooks = async (req, res) => {
  if (req.newToken) {
    try {
      const {
        userID,
        bookname,
        author,
        discription,
        recordStatus,
        createdTime,
        bookIMG,
        owners,
      } = req.body;

      const bookID = uuid.v4();
      const imgID = uuid.v4();
      const newBook = await sequelize.models.Books.create({
        userID,
        bookname,
        author,
        bookID,
        discription,
        recordStatus,
        createdTime,
      });

      for (let i = 0; i < bookIMG.length; i++) {
        const element = bookIMG[i];
        const newIMG = await sequelize.models.Imgs.create({
          bookID: bookID,
          imgID: imgID,
          imgURL: element.imgURL,
        });
      }

      for (let i = 0; i < owners.length; i++) {
        const element = owners[i];
        const newOwner = await sequelize.models.Owners.create({
          ownerID: uuid.v4(),
          readerID: element._id,
          bookID: bookID,
          ownername: element.ownername,
          avatar: element.avatar,
          email: element.email,
          location: element.location,
          phoneNumber: element.phoneNumber,
          age: element.age,
          recordStatus: 'latest',
        });
      }
      res.status(201).json({ newBook, newToken: req.newToken });
    } catch (error) {
      res.status(400).json(error.message);
    }
  } else {
    res.status(400).json({ mes: 'Token is invalid' });
  }
};
// 🟢

// 🟢

// @DESC ➡ create a new img in the database
// @ROUTE ➡ POST /img
// @ACCESS ➡ private

const addIMGS = async (req, res) => {
  try {
    const { bookID, imgURL } = req.body;
    const imgID = uuid.v4();

    const newIMG = await sequelize.models.Imgs.create({
      bookID: bookID,
      imgID: imgID,
      imgURL: imgURL,
    });
    res.status(201).json(newIMG);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

// 🟢

// 🟢

// @DESC ➡ update the owner
// @ROUTE ➡ POST /update
// @ACCESS ➡ private

const updateOwner = async (req, res) => {
  const ownerID = req.body.ownerID;
  const bookID = req.body.bookID;
  const readerID = req.body.readerID;
  const avatar = req.body.avatar;
  const ownername = req.body.ownername;
  const email = req.body.email;
  const location = req.body.location;
  const phoneNumber = req.body.phoneNumber;
  const age = req.body.age;

  // console.log(ownerID);
  try {
    const findowner = await sequelize.models.Owners.findOne({
      where: { ownerID: ownerID, bookID: bookID },
    });

    const updateOwner = await sequelize.models.Owners.update(
      { recordStatus: 'updated' },
      { where: { ownerID: ownerID } }
    );
    // res.send(findowner);
    const createnewOwner = await sequelize.models.Owners.create({
      ownerID: ownerID,
      bookID: bookID,
      readerID: readerID,
      avatar: avatar,
      ownername: ownername,
      email: email,
      location: location,
      phoneNumber: phoneNumber,
      age: age,
      recordStatus: 'latest',
    });
    res.status(201).json(createnewOwner);
  } catch {
    console.log('error from the update and create');
  }
};
// 🟢

// 🟢

// @DESC ➡ delete the owner
// @ROUTE ➡ POST /delete
// @ACCESS ➡ private

const deleteOwner = async (req, res) => {
  const ownerid = req.body.ownerID;

  try {
    const findowner = await sequelize.models.Owners.findOne({
      where: { ownerID: ownerid },
    });
    const updateOwner = await sequelize.models.Owners.update(
      { recordStatus: 'deleted' },
      { where: { ownerID: ownerid } }
    );
    res.status(200).json(findowner);
  } catch (error) {
    console.log(error);
  }
};

// 🟢

// 🟢

// @DESC ➡ update a certain book
// @ROUTE ➡ POST /updatebook
// @ACCESS ➡ private

const updateBook = async (req, res) => {
  const bookID = req.body.bookID;
  const author = req.body.author;
  const discription = req.body.discription;
  const bookname = req.body.bookname;
  const owner = req.body.owner;
  const imgs = req.body.imgs;
  const createdTime = req.body.createdTime;
  const userID = req.body.userID;
  // console.log(ownerID);
  try {
    const findbook = await sequelize.models.Books.findOne({
      where: { bookID: bookID, userID: userID },
    });

    const updateOwner = await sequelize.models.Books.update(
      { recordStatus: 'updated' },
      { where: { bookID: bookID, userID: userID } }
    );
    // res.send(findowner);
    const createnewBook = await sequelize.models.Books.create({
      bookID: bookID,
      author: author,
      discription: discription,
      bookname: bookname,
      owner: owner,
      imgs: imgs,
      createdTime: createdTime,
      recordStatus: 'latest',
      userID: userID,
    });
    res.status(201).json(createnewBook);
  } catch {
    console.log('error from the update and create');
  }
};

// 🟢

// 🟢

// @DESC ➡ update a certain image
// @ROUTE ➡ POST /updateImg
// @ACCESS ➡ private

const updateImg = async (req, res) => {
  const bookid = req.body.bookID;
  const imgID = req.body.imgID;
  const newUrl = req.body.newUrl;

  try {
    const findIMG = await sequelize.models.Imgs.findOne({
      where: { bookID: bookid, imgID: imgID },
    });

    const updateIMG = await sequelize.models.Imgs.update(
      { imgURL: newUrl },
      { where: { bookID: bookid, imgID: imgID } }
    );
    res.send(findIMG);
  } catch (err) {
    console.log(err);
  }
};

// 🟢

// 🟢

// @DESC ➡ delete certain image
// @ROUTE ➡ POST /deleteImg
// @ACCESS ➡ private

const deleteImg = async (req, res) => {
  const bookid = req.body.bookID;
  const imgID = req.body.imgID;

  try {
    const findIMG = await sequelize.models.Imgs.findOne({
      where: { bookID: bookid, imgID: imgID },
    });

    const deleteImg = await sequelize.models.Imgs.destroy({
      where: { imgID: imgID },
    });
    res.send(findIMG);
  } catch (err) {
    console.log(err);
  }
};

// 🟢

// 🟢

// @DESC ➡ crate new user with hashedPassword and unique username.
// @ROUTE ➡ POST /Signup
// @ACCESS ➡ public

const Signup = async (req, res) => {
  try {
    const name = req.body.name;
    // const password = req.body.password;
    const userID = uuid.v4();
    const email = req.body.email;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const CheckIfExist = await sequelize.models.Users.findOne({
      where: { username: name },
    });

    if (CheckIfExist) {
      res.json({ msg: 'the user name is already exists' });
      return;
    } else {
      const addUser = await sequelize.models.Users.create({
        userID: userID,
        username: name,
        useremail: email,
        userpass: hashedPassword,
      });
      if (addUser) {
        res.status(201).json(addUser);
      } else {
        res.json({ msg: 'error While creating user' });
      }
    }

    // ✔✔✔✔✔✔✔
  } catch (err) {
    console.log(err);
  }
};

// 🟢

// 🟢

// @DESC ➡ Login by checking if the username is already exists and then checking  if the the entered password  matches the hashedPassword
// @ROUTE ➡ POST /Login
// @ACCESS ➡ public

const Login = async (req, res) => {
  try {
    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;

    const CheckIfExist = await sequelize.models.Users.findOne({
      where: { username: name },
    });

    if (CheckIfExist) {
      let hashedPassword = CheckIfExist.dataValues.userpass;

      bcrypt
        .compare(password, hashedPassword)
        .then((response) => {
          console.log(response);

          if (response === true) {
            // from the JWT FILE 🟢

            const accessToken = createUserToken({
              userID: CheckIfExist.dataValues.userID,
              username: CheckIfExist.dataValues.username,
            });
            console.log(accessToken);
            res.status(200).json({ accessToken: accessToken });
          } else {
            res.status(202).json({ msg: 'Password mismatch' });
          }
        })
        .catch((err) => console.error(err.message));
    } else {
      res.status(202).json({ msg: 'user name not found' });
    }
  } catch (err) {
    console.log(err);
  }
};
// 🟢

module.exports = {
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
};
