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
const { JWT_SECRET } = process.env;

usersRouter.post("/register", async (req, res, next) => {
  const { username, password, email } = req.body;
  try {
    const _user = await getUserByUsername(username);
    if (_user) {
      res.send(401);
      next({
        name: "UserExistsError",
        message: "A user by that username already exists",
      });
    }if (password.length < 8) {
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
    res.send({
      user: user,
      message: "thank you for signing up",
      token: token,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
});

usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password",
    });
  }

  try {
    const user = await getUserByUsername( username );
    if (user && user.password == password) {
      const token = jwt.sign(
        user, JWT_SECRET
      );
      res.send({ message: "you're logged in!", token, user });
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
    res.send(req.user)
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = usersRouter;
