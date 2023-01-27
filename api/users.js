const express = require("express");
const {requireUser} = require("./utils")
const usersRouter = express.Router();
const {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
} = require("../db/users");

const jwt = require("jsonwebtoken");
const { JWT_SECRET = "do not tell" } = process.env;

usersRouter.post("/register", async (req, res, next) => {
  const { username, password, email } = req.body;
  console.log("hello there!", username, password, email);
  try {
    const _user = await getUserByUsername(username);
    console.log("its me, Ya boi!", _user);
    if (_user) {
      res.status(401);
      next({
        name: "UserExistsError",
        message: "A user by that username already exists",
      });
    } else if (password.length < 8) {
      res.status(401);
      next({
        name: "PasswordLengthError",
        message: "Password Too Short!",
      });
    }

    const user = await createUser({
      username,
      password,
      email,
    });
    console.log("hey im right here!", user);
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      JWT_SECRET,
      {
        expiresIn: "1w",
      }
    );
    console.log("yo! I am a token!", token);
    res.send({
      user,
      message: "thank you for signing up",
      token,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
});

usersRouter.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await getUser({ username, password });
    if (user) {
      const token = jwt.sign(
        {
          id: user.id,
          username,
        },
        JWT_SECRET,
        {
          expiresIn: "1w",
        }
      );

      return res.send({ message: "you're logged in!", token, user });
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//  GET /api/users/me

usersRouter.get("/me", async (req, res, next) => {
  try {
    console.log("hit the backend API");
    res.send(req.user)
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = usersRouter;
