const { validationResult } = require("express-validator");
const path = require("path");
const fs = require("fs");
const BlogPost = require("../models/blog");

exports.createBlogPost = (req, res, next) => {
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

  if (!req.file) {
    const err = new Error("Image harus di upload");
    err.errorStatus = 422;
    throw err;
  }

  const title = req.body.title;
  const image = req.file.path;
  const body = req.body.body;

  const Postting = new BlogPost({
    title: title,
    body: body,
    image: image,
    author: { uid: 1, name: "Arifin" },
  });

  Postting.save()
    .then((result) => {
      res.status(201).json({
        message: "Create Blog Success",
        data: result,
      });
    })
    .catch((err) => {
      console.log("err : ", err);
    });

  // const result = {
  //   message: "Create Blog Success",
  //   data: {
  //     post_id: 1,
  //     title: title,
  //     image: "image.png",
  //     body: body,
  //     created_at: "12/06/2020",
  //     author: {
  //       uid: 1,
  //       name: "testing",
  //     },
  //   },
  // };

  // res.status(201).json(result);
};

exports.getAllBlogPost = (req, res, next) => {
  BlogPost.find()
    .then((result) => {
      res.status(200).json({
        message: "Data blog post berhasil dipanggil",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getBlogPostById = (req, res, next) => {
  const postId = req.params.postId;
  BlogPost.findById(postId)
    .then((result) => {
      if (!result) {
        const error = new Error("Blog post tidak di temukan");
        error.errorStatus = 404;
        throw error;
      }
      res.status(200).json({
        message: "data blog post berhasil ditemukan",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.updateBlogPost = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error("Input value tidak sesuai");
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }

  if (!req.file) {
    const err = new Error("Image harus di upload");
    err.errorStatus = 422;
    throw err;
  }

  const title = req.body.title;
  const image = req.file.path;
  const body = req.body.body;
  const postId = req.params.postId;

  BlogPost.findById(postId)
    .then((post) => {
      if (!post) {
        const err = new Error("blog post tidak ditemukan");
        err.errorStatus = 404;
        throw err;
      }
      post.title = title;
      post.body = body;
      post.image = image;

      return post.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "update sukses",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteBlogPost = (req, res, next) => {
  const postId = req.params.postId;

  BlogPost.findById(postId)
    .then((post) => {
      if (!post) {
        const err = new Error("blog post tidak ditemukan");
        err.errorStatus = 404;
        throw err;
      }
      removeImage(post.image);
      return BlogPost.findByIdAndRemove(postId);
    })
    .then((result) => {
      res.status(200).json({
        message: "hapus blog berhasil",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

const removeImage = (filePath) => {
  // console.log("file Path", filePath);
  // console.log("directory name", __dirname);

  filePath = path.join(__dirname, "../../", filePath);
  fs.unlink(filePath, (err) => console.log(err));
};
