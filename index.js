const express = require("express");

const app = express();
const productRoutes = require("./src/routes/products");

// pindahkan ke folder src -> routes
// router.use("/products", (req, res, next) => {
//   //   console.log('request', req);
//   //   console.log("url", req.originalUrl);
//   //   console.log("method", req.method);
//   res.json({ name: "arifin", email: "arif@gmail.com" });
//   next();
// });

// router.use("/prices", (req, res, next) => {
//   res.json({ price: 3000 });
//   next();
// });

// router.get("/customers", (req, res, next) => {
//   res.json({ title: "customers" });
//   next();
// });

app.use("/", productRoutes);

app.listen(4000);
