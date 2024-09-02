require('dotenv').config()
require('./db/mongodb')
const express = require("express");
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes')
const cors = require("cors");
const app = express();
const apipath = process.env.API_ROUTE

var corsOptions = {
  origin: '*',
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));



app.get("/", (req, res) => {
  res.json({ message: "Hola" });
});

app.use(apipath + '/auth', authRoutes);
app.use(apipath + '/product', productRoutes)

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
