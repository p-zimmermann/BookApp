const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 3001;

const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer"); //library for uploading images
app.use(cors());
const bcrypt = require("bcrypt"); //library for hashing the password
const jwt = require("jsonwebtoken"); //library for login
app.use(express.json())
//express limit
const limiter = require("express-rate-limit");
app.use('/uploads', express.static('uploads'))
const limit = limiter({
    windowMs: 15*60*1000,
    max: 100,
})


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

//post route register
app.post("/register", limit, upload.single("profilePicture"), async (req, res) => {
  try {
    console.log("Received data:", req.body);
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
});

/*   // Check if email or username exists
app.get("/checkuser", async (req, res) => {
    const { email, username } = req.query;
  
    try {
      const userWithEmail = email
        ? await Userdata.findOne({ email: email })
        : null;
      const userWithUsername = username
        ? await Userdata.findOne({ username: username })
        : null;
  
      res.status(200).json({
        emailExists: Boolean(userWithEmail),
        usernameExists: Boolean(userWithUsername),
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }); */

//route for login
app.post(
  "/login",
  async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(404)
        .send({ message: "User or password is not correct" });
    }

    const existUser = await UserData.findOne({ email });
    if (!existUser) {
      return res.status(401).send({ message: "User does not exist" });
    }
    //check if password is correct
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(401).send({ message: "Password is incorrect" });
    }
    //create jwt token
    const token = jwt.sign(
      { id: existUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.status(200).send({ token, message: "Login successful" });
  }
  /* // Find user by email or username
      const user = await Userdata.findOne({
        $or: [{ email: identifier }, { username: identifier }],
      });
  
      // If user not found, return an error
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Check if the provided password matches the user's password
      const passwordMatch = user && await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid password" });
      }
  
      // Generate access token
      const accessToken = jwt.sign(
        { id: user._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" }
      );
  
      // Return the user document and access token as the response
      res.status(200).json({ user: user, accessToken: accessToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    } */
);
