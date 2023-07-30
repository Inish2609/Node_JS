const asyncHandler = require("express-async-handler")

const User = require("../models/userModel");

const bcrypt = require("bcrypt")

const jwb = require("jsonwebtoken")

//@desc Register The User
//@route POST /api/users/register
//@access public

const register = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All Fields Are Mandotary");
    }

    const userAvailable = await User.findOne({email:email});
    if(userAvailable){
        res.status(400);
        throw new Error("User Ready Available");
    }

    // HASHED PASSWORD

    const hashedPassword = await bcrypt.hash(password,10);
    const user = await User.create({
        username,email,password:hashedPassword
    })

  res.json({ username : username , email : email });
});

//@desc Login The User
//@route POST /api/users/login
//@access public

const login = asyncHandler(async (req, res) => {
  const {email,password} = req.body;
  if(!email || !password){
    res.status(400);
    throw new Error("All Fields are Mandatory")
  }
  const user = await User.findOne({email});
  if(user && (await bcrypt.compare(password, user.password))){
    const accessToken = jwb.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECERT,
      { expiresIn: "15m" }
    );
    res.json({ accessToken });
  }
  else{
    res.status(401);
    throw new Error("Email or password is not valid")
  }
});

//@desc Current The User
//@route GET /api/users/current
//@access private

const current = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = {
    register,
    login,
    current
}

