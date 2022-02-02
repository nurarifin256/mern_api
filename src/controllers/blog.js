const { validationResult } = require("express-validator");

exports.createBlogPost = (req, res, next) => {
  const title = req.body.title;
  // const image = req.body.image;
  const body = req.body.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error("Input value tidak sesuai");
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;

    // console.log("err : ", errors);
    // res.status(400).json({
    //   message: "Request error",
    //   data: null,
    // });
  }

  const result = {
    message: "Create Blog Success",
    data: {
      post_id: 1,
      title: title,
      image: "image.png",
      body: body,
      created_at: "12/06/2020",
      author: {
        uid: 1,
        name: "testing",
      },
    },
  };

  res.status(201).json(result);
};
