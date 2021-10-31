exports.createProduct = (req, res, next) => {
  res.json({
    message: "Create Product Success",
    data: {
      id: 1,
      name: "Sari Roti",
      price: 7000,
    },
  });
  next();
};

exports.getAllProducts = (req, res, next) => {
  res.json({
    message: "Get All Product Success",
    data: {
      id: 1,
      name: "Sari Roti",
      price: 7000,
    },
  });
  next();
};
