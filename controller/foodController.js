const Food = require("../models/foodModels");
const fs = require("fs");
const jwt = require("jsonwebtoken");
<<<<<<< HEAD
const { google } = require("googleapis");
const path = require("path");
const stream = require("stream");
require("dotenv").config();
const { validationResult } = require("express-validator");
const Category = require("../models/categoryModels");
const asyncHandler = require("express-async-handler");
=======
require("dotenv").config();
const { validationResult } = require("express-validator");
const Category = require("../models/categoryModels");
>>>>>>> 18d00605b33224bc145136653b11b4c19b569080

function getUserData(headers) {
  // Split the Bearer token
  const token = headers.authorization.split(" ")[1];
  if (!token) {
    return res
      .status(400)
      .json({ success: false, message: "Token header missing", userId: null });
  }
  const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
  console.log(verifiedToken);

  if (!verifiedToken)
    return {
      success: false,
      message: "Invalid token",
      userId: null,
    };
  return {
    success: true,
    message: "Token verified successfully",
    userId: verifiedToken.id, // Assuming the token payload contains the user ID as 'id'
  };
}

<<<<<<< HEAD
const KEYFILEPATH = path.join(__dirname, "..", "cred.json");
const SCOPES = ["https://www.googleapis.com/auth/drive"];
const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});
const insertFile = async (fileObject) => {
  const bufferStream = new stream.PassThrough();
  bufferStream.end(fileObject.buffer);
  const { data } = await google.drive({ version: "v3", auth }).files.create({
    media: {
      mimeType: fileObject.mimeType,
      body: bufferStream,
    },
    requestBody: {
      name: fileObject.originalname,
      parents: ["1e8OIEcKOet5DJPbQ7JkIv-3gU7mIICTM"],
    },
    fields: "id, name",
  });
  console.log("Insert File in drive successfully ");
  return data;
};
const uploadFood = asyncHandler(async (req, res) => {
  try {
    const { userId } = getUserData(req.headers);
    const { name, description, category, price } = req.body;
    const image = req.file; // File path after upload
=======
const uploadFood = async (req, res) => {
  try {
    const { userId } = getUserData(req.headers);
    const { name, description, category, price } = req.body;
    console.log("userId:", userId);

    let imagePath = req.file.filename; // File path after upload
    console.log("field:", name, description, category, price, imagePath);
>>>>>>> 18d00605b33224bc145136653b11b4c19b569080
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User Expired Please log in again" });
    }
<<<<<<< HEAD
    if (!name || !description || !category || !price || !image) {
=======
    if (!name || !description || !category || !price || !imagePath) {
>>>>>>> 18d00605b33224bc145136653b11b4c19b569080
      return res
        .status(400)
        .json({ success: false, message: "Please provide all the field..." });
    }
<<<<<<< HEAD
    const uploadDrive = await insertFile(image);
    if (!uploadDrive) {
      return res
        .status(500)
        .json({ success: false, message: "Error in file uploading" });
    }
    const newFood = await Food.create({
      name,
      description,
      category,
      price,
      image: uploadDrive.id,
      userId,
    });
=======

    // Save food details to MongoDB
    const newFood = await Food.create({
      name: name,
      description: description,
      category: category,
      price: price,
      image: imagePath,
      userId: userId,
    });
    // .populate("categoryId");
    console.log(newFood);
>>>>>>> 18d00605b33224bc145136653b11b4c19b569080
    return res.status(200).json({
      success: true,
      newFood,
      message: "Food uploaded successfully",
    });
  } catch (error) {
<<<<<<< HEAD
    return res.status(500).json({ success: false, message: error });
  }
});
<<<<<<< HEAD
=======

// const uploadFood = async (req, res) => {
//   try {
//     const { userId } = getUserData(req.headers);
//     const { name, description, category, price } = req.body;
//     // console.log("userId:", userId);

//     let imagePath = req.file.filename; // File path after upload
//     // console.log("field:", name, description, category, price, imagePath);
//     if (!userId) {
//       return res
//         .status(400)
//         .json({ success: false, message: "User Expired Please log in again" });
//     }
//     if (!name || !description || !category || !price || !imagePath) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Please provide all the field..." });
//     }

//     // Save food details to MongoDB
//     const newFood = await Food.create({
//       name: name,
//       description: description,
//       category: category,
//       price: price,
//       image: imagePath,
//       userId: userId,
//     });
//     // .populate("categoryId");
//     console.log(newFood);//
//     return res.status(200).json({
//       success: true,
//       newFood,
//       message: "Food uploaded successfully",
//     });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: "Server Error" });
//   }
// };
=======
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
>>>>>>> 18d00605b33224bc145136653b11b4c19b569080
>>>>>>> a66210d9847ab045370c8d6b6cfd4ef9f93d57a3
//list food
const listFood = async (req, res) => {
  try {
    // const { userId } = getUserData(req.headers);
    const foods = await Food.find({}).populate("userId", "email");
    // if (!userId) {
    //   return res
    //     .status(403)
    //     .json({ success: false, message: "User Expired Please log in again" });
    // }
    if (!foods) {
      return res
        .status(400)
        .json({ success: false, message: "Food is not found..." });
    }
    return res.status(200).json({
      success: true,
      Data: foods,
      message: "food listed successfully",
    });
  } catch (error) {
    console.log(error);
<<<<<<< HEAD
    return res.status(500).json({ success: false, message: error });
=======
    return res.status(500).json({ success: false, message: "Server Error" });
>>>>>>> 18d00605b33224bc145136653b11b4c19b569080
  }
};
//remove food
const removedFood = async (req, res) => {
  try {
    // const { userId } = getUserData(req.headers);
    const { id } = req.body;
    // if (!userId) {
    //   return res
    //     .status(403)
    //     .json({ success: false, message: "User Expired Please log in again" });
    // }
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide Food_id..." });
    }
    const food = await Food.findById(id);
    if (!food) {
      return res
        .status(400)
        .json({ success: false, message: "Food is not found..." });
    }
<<<<<<< HEAD
    // fs.unlink(`uploads/${food.image}`, () => {});
    const driveUpload = google.drive({ version: "v3", auth });
    await driveUpload.files.delete({ fileId: food.image });
=======
    fs.unlink(`uploads/${food.image}`, () => {});
>>>>>>> 18d00605b33224bc145136653b11b4c19b569080
    await Food.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ success: true, message: "Food removed successfully..." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getFoodByCategory = async (req, res) => {
  try {
    //const { userId } = getUserData(req.headers);
    const { category } = req.query; // Assuming the category is passed as a query parameter
    // if (!userId) {
    //   return res
    //     .status(403)
    //     .json({ success: false, message: "User Expired Please log in again" });
    // }
    if (!category) {
      return res.status(400).json({ msg: "Category is required" });
    }
    const foodItems = await Food.find({ userId: userId, category: category });
    if (!foodItems || foodItems.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Category is not fouond in the food list...",
      });
    }
    return res.status(200).json({
      success: true,
      foodItems,
      message: `${category} category is listed...`,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: `Error fetching food items by category: ${error.message}` });
  }
};

const searchFood = async (req, res) => {
  try {
    const { foodName } = req.query;
    const food = await Food.find({ name: { $regex: foodName, $options: "i" } });
    if (!foodName) {
      return res
        .status(200)
        .json({ success: true, message: "Provide a food name", food });
    }
    if (!food || food.length === 0) {
      return res
        .status(200)
        .json({ success: true, message: "Food is not found", food: [] });
    }
    return res
      .status(200)
      .json({ success: true, message: "Food is here...", food });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
//edit food
const editFood = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { userId } = getUserData(req.headers);

  console.log(userId);
  const { name, description, category, price } = req.body;
  const imagePath = req.file?.filename;
  const { id } = req.params;
  if (!id || !name || !description || !category || !price) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields." });
  }
  console.log(id, name, description, category, price);
  try {
    const food = await Food.findById(id);
    if (!food) {
      return res
        .status(404)
        .json({ success: false, message: "Food not found" });
    }
    console.log(food);
    if (food.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to edit this food item",
      });
    }

    const updatedData = { name, description, category, price };
    if (imagePath) {
      fs.unlink(`uploads/${food.image}`, () => {});
      updatedData.image = imagePath;
    }
    console.log(updatedData);
    const updatedFood = await Food.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    console.log("object update");
    return res.status(200).json({
      success: true,
      updatedFood,
      message: "Food updated successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
module.exports = {
  uploadFood: uploadFood,
  listFood: listFood,
  removedFood: removedFood,
  getFoodByCategory: getFoodByCategory,
  searchFood: searchFood,
  editFood: editFood,
};
