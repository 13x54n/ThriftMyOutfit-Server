const express = require("express");
const { body, validationResult } = require("express-validator");
const Product = require("../models/Product");
const { default: mongoose } = require("mongoose");
const Review = require("../models/Review");
const ProductDetails = require("../models/ProductDetails");

const router = express.Router();

const productValidationRules = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Name is required"),
  body("href")
    .isString()
    .withMessage("Href must be a string")
    .notEmpty()
    .withMessage("Href is required"),
  body("price")
    .isString()
    .withMessage("Price must be a string")
    .notEmpty()
    .withMessage("Price is required"),
  body("imageSrc")
    .isURL()
    .withMessage("ImageSrc must be a valid URL")
    .notEmpty()
    .withMessage("ImageSrc is required"),
  body("imageAlt")
    .isString()
    .withMessage("ImageAlt must be a string")
    .notEmpty()
    .withMessage("ImageAlt is required"),
];

router.post("/", productValidationRules, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const product = new Product(req.body);
    await product.save({ session });

    const productDetails = new ProductDetails({
      product: product._id,
      ...req.body.productDetails
    });
    await productDetails.save({ session });

    const review = new Review({
      productDetails: productDetails._id,
    });
    await review.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).send({ product, productDetails, review });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(400).send(error);
  }
});

// Read all
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Read Product, ProductDetails, and Review
router.get("/all/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const productDetails = await ProductDetails.findOne({
      product: req.params.id,
    }).populate("product");
    const reviews = await Review.find({ productDetails: productDetails._id });

    if (!product || !productDetails || reviews.length === 0) {
      return res.status(404).send({ message: "Not Found" });
    }

    res.send({ product, productDetails, reviews });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Read one
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send();
    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update
router.patch("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) return res.status(404).send();
    res.send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete Product, ProductDetails, and Review
router.delete("/:id", async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const product = await Product.findByIdAndDelete(req.params.id, { session });
    const productDetails = await ProductDetails.findOneAndDelete(
      { product: req.params.id },
      { session }
    );
    await Review.deleteMany(
      { productDetails: productDetails._id },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.send({ message: "Deleted successfully", product, productDetails });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).send(error);
  }
});

module.exports = router;
