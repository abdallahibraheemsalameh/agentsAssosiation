const express = require('express');
const app = express();
const cors = require('cors');
// require("./db/db");
const { sequelize } = require('./models/index');
sequelize.sync();
app.use(express.json());
app.use(cors());

////////////////////////////

const booksRoute = require('./routers/routes/booksRoute');

///////////////////////////

app.use(booksRoute);

////////////////////////////
const Port = 5000;
app.listen(Port, () => {
  console.log('server is running');
});
