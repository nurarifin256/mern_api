const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const productRoutes = require("./src/routes/products");
const authRoutes = require("./src/routes/auth");
const blogRoutes = require("./src/routes/blog");

app.use(bodyParser.json()); //type json

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Methods", "Content-Type, Authorization");
  next();
});

app.use("/v1/customer", productRoutes);
app.use("/v1/auth", authRoutes);
app.use("/v1/blog", blogRoutes);

app.use((error, req, res, next) => {
  const status = error.errorStatus || 500;
  const message = error.message;
  const data = error.data;

  res.status(status).json({
    message: message,
    data: data,
  });
});

mongoose
  .connect(
    "mongodb://arifin:M01NhGk3fU5uNtUu@cluster0-shard-00-00.oryrc.mongodb.net:27017,cluster0-shard-00-01.oryrc.mongodb.net:27017,cluster0-shard-00-02.oryrc.mongodb.net:27017/blog?ssl=true&replicaSet=atlas-745b4g-shard-0&authSource=admin&retryWrites=true&w=majority"
  )
  .then(() => {
    // app.listen(4000, () => console.log("Koneksi Berhasil"));
    app.listen(4000);
  })
  .catch((err) => console.log(err));
