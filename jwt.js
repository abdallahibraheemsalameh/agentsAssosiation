const jwt = require('jsonwebtoken');
require('dotenv').config();

function createUserToken({ userID, username }) {
  const token = jwt.sign(
    {
      userID: userID,
      username: username,
    },

    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '10s' }
  );
  return token;
}

function verifyUserToken(req, res, next) {
  const token = req.headers.token;
  console.log(token);
  try {
    if (token) {
      // Verify the token using jwt.verify method
      const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      //  Return response with decode data
      console.log('llllllllllllllll', decode);
      if (decode) {
        const creatingNewToken = createUserToken({
          userID: decode.userID,
          username: decode.username,
        });
        //   console.log('llllllllllllllllllllll', creatingNewToken);
        req.newToken = creatingNewToken;
      }

      // console.log(decode);
      else {
        // Return response with error
        req.newToken = null;
      }
    }
  } catch (err) {
    console.log(err);
  }

  next();
}

module.exports = { createUserToken, verifyUserToken };
