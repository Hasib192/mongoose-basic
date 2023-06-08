const Product = require("../model/Product");
const { generateToken } = require("../helpers/jwt-token-helper");

exports.getAllProucts = async (req, res) => {
  let products = await Product.find({}).select("name price");
  if (products.length < 0) {
    res.json("No products in record");
  }
  res.json(products);
  res.end();
};

exports.createProducts = async (req, res) => {
  const { name, price, description } = req.body;
  try {
    if (!name) {
      res.json("Name required");
    }
    if (!price || isNaN(price)) {
      res.json("Price is not a number");
    }
    const result = await new Product({
      name,
      price,
      description,
    }).save();

    res.status(201).json({
      msg: "Data saved",
      data: result,
    });
  } catch (error) {
    res.json(error);
  }
};
