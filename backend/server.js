const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 3001;

const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectId;
const multer = require("multer"); //library for uploading images
app.use(cors());
const bcrypt = require("bcrypt"); //library for hashing the password
const jwt = require("jsonwebtoken"); //library for login
app.use(express.json());
//express limit
const limiter = require("express-rate-limit");
app.use("/uploads", express.static("uploads"));
const limit = limiter({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use("/uploads", express.static("uploads"));

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`);
});

//connection to mongodb
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

//create a disk storage for all the image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

//profile database mongoose schema

const userData = new mongoose.Schema({
  userId: String,
  email: String,
  password: String,
  profilePicture: String,
  username: String,
  resetPasswordToken: String,
  resetPasswortExpires: Date,
});

const UserData = mongoose.model("UserData", userData);

const toRead = new mongoose.Schema({
  isbn13: String,
  userId: String,
});
const ToRead = mongoose.model("ToRead", toRead);
const currentlyReading = new mongoose.Schema({
  isbn13: String,
  userId: String,
  startdate: String,
  enddate: String,
});
const CurrentlyReading = mongoose.model("CurrentlyReading", currentlyReading);

const library = new mongoose.Schema({
  isbn13: String,
  userId: String,
  startdate: String,
  enddate: String,
  review: String,
});
const Library = mongoose.model("Library", library);

const alreadyRead = new mongoose.Schema({
  isbn13: String,
  userId: String,
  startdate: String,
  enddate: String,
  review: String,
});
const AlreadyRead = mongoose.model("AlreadyRead", alreadyRead);

//post route register
app.post(
  "/register",
  limit,
  upload.single("profilePicture"),
  async (req, res) => {
    try {
      /*  res.status(201).send("Works fine"); */
      const { id, email, username } = req.body;
      const password = req.body.password;
      if (!id || !email || !username || !password) {
        return res.status(404).send({ message: "Please fill out all fields!" });
      }

      //check if user already exists
      const existsUser = await UserData.findOne({ email });
      if (existsUser) {
        return res.status(409).send({ message: "User already exists" });
      }
      // Hash the password with bcrypt
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
      console.log(`data of hashed password: ${hashedPassword}`);

      // Create a new user document in the database
      const newUser = await UserData.create({
        id: req.body.id,
        email: req.body.email,
        username: req.body.username,
        password: hashedPassword,
        profilePicture: req.file
          ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
          : "",
      });

      // Generate access token
      const accessToken = jwt.sign(
        { id: newUser._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" }
      );

      // Return the new user document and access token as the response
      res.status(201).json({ newUser, accessToken });
    } catch (error) {
      console.error("Error in function_name:", error.message);
      console.error("Error stack trace:", error.stack);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

//route for login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(404).send({ message: "User or password is not correct" });
  }

  const existUser = await UserData.findOne({ email });
  if (!existUser) {
    return res.status(401).send({ message: "User does not exist" });
  }
  //check if password is correct
  const isPasswordCorrect = await bcrypt.compare(password, existUser.password);
  if (!isPasswordCorrect) {
    return res.status(401).send({ message: "Password is incorrect" });
  }
  //create jwt token
  const token = jwt.sign(
    { id: existUser._id },
    process.env.ACCESS_TOKEN_SECRET
  );
  res.status(200).send({ token, message: "Login successful" });
});

app.get("/finduser", async (req, res) => {
  try {
    const { id } = req.query;
    const objectIdUserId = new ObjectId(id);
    const user = await UserData.findOne({ _id: objectIdUserId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(user);
    res.send(user);
  } catch (error) {
    console.error(error);
  }
});

app.post("/toread", async (req, res) => {
  try {
    const { userId, isbn13 } = req.body;
    console.log(req.body)
    //check if book already exists
    const existsBook = await ToRead.findOne({ isbn13 });
    if (existsBook) {
      return res.status(409).send({ message: "Book already in list" });
    }
    // Create a new entry
    const newToRead = await ToRead.create({
      userId: req.body.userId,
      isbn13: req.body.isbn13,
    });
    res.status(201).json({ newToRead });
  } catch (error) {
    console.error("Error adding to database", error);
  }
});
app.get("/toread", async (req, res) => {
  try {
    const { id } = req.query;
    console.log("Received data CURRENTLY " + req.query)
    const objectIdUserId = new ObjectId(id);
    const bookToRead = await ToRead.find({ userId: objectIdUserId });
    if (!bookToRead) {
      return res.status(404).json({ message: "books not found" });
    }
    console.log(bookToRead);
    res.send(bookToRead);
  } catch (error) {
    console.error(error);
  }
});


app.post("/currentlyreading", async (req, res) => {
  try {
    const { userId, isbn13, startdate } = req.body;
    //check if book already exists
    const existsBook = await CurrentlyReading.findOne({ isbn13 });
    if (existsBook) {
      return res.status(409).send({ message: "Book already in list" });
    }
    // Create a new entry
    const currentlyReadingBook = await CurrentlyReading.create({
      userId: req.body.userId,
      isbn13: req.body.isbn13,
      startdate: req.body.startdate,
      enddate: req.body.enddate,
    });
    res.status(201).json({ currentlyReadingBook });
  } catch (error) {
    console.error("Error adding to database", error);
  }
});

app.get("/currentlyreading", async (req, res) => {
  try {
    const { id } = req.query;
    console.log("Received data CURRENTLY " + req.query)
    const objectIdUserId = new ObjectId(id);
    const bookCurrently = await CurrentlyReading.find({ userId: objectIdUserId });
    if (!bookCurrently) {
      return res.status(404).json({ message: "books not found" });
    }
    console.log(bookCurrently);
    res.send(bookCurrently);
  } catch (error) {
    console.error(error);
  }
});

app.delete("/currentlyreading", async (req, res) => {
  try {
    console.log("Received data DELETE " + req.body)
    console.log(req.body._id)
    const bookCurrently = await CurrentlyReading.findByIdAndDelete(req.body._id);
    if (!bookCurrently) {
      return res.status(404).json({ message: "books not found" });
    }
    return res.status(200).json({ success: true, msg: 'Product Deleted' });
  } catch (error) {
    console.error(error);
  }
});

app.post("/library", async (req, res) => {
  try {
    const { userId, isbn13 } = req.body;
    //check if book already exists
    const existsBook = await Library.findOne({ isbn13 });
    if (existsBook) {
      return res.status(409).send({ message: "Book already in list" });
    }
    // Create a new entry
    const newToLib = await Library.create({
      userId: req.body.userId,
      isbn13: req.body.isbn13,
      startdate: req.body.startdate,
      enddate: req.body.enddate,
      review: req.body.review,
    });
    res.status(201).json({ newToLib });
  } catch (error) {
    console.error("Error adding to database", error);
  }
});

app.get("/library", async (req, res) => {
  try {
    const { id } = req.query;
    console.log("Received data CURRENTLY " + req.query)
    const objectIdUserId = new ObjectId(id);
    const bookLib = await Library.find({ userId: objectIdUserId });
    if (!bookLib) {
      return res.status(404).json({ message: "books not found" });
    }
    console.log(bookLib);
    res.send(bookLib);
  } catch (error) {
    console.error(error);
  }
});

