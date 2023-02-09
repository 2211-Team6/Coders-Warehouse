const express = require("express");
const { requireUser } = require("./utils");
const usersRouter = express.Router();
const {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
  getAllUsers,
} = require("../db/users");

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

usersRouter.post("/register", async (req, res, next) => {
  const { username, password, email, fname, city, birthday, about } = req.body;
  try {
    const _user = await getUserByUsername(username);
    if (_user) {
      res.send(401);
      next({
        name: "UserExistsError",
        message: "A user by that username already exists",
      });
    }
    if (password.length < 8) {
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
      fname,
      city,
      birthday,
      about,
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
    const user = await getUserByUsername(username);
    if (user && user.password == password) {
      const token = jwt.sign(user, JWT_SECRET);
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
    res.send(req.user);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

usersRouter.get("/:id", async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await user.findById(userId);
    if (!user) {
      return res.status(404).send("No user found with the given id");
    }
    res.send(user);
  } catch (error) {
    next(error);
  }
});

usersRouter.patch("/:id", requireUser, async (req, res, next) => {
  try {
    const id = req.params.id;
    const { username, email, fname, city, birthday, about } = req.body;
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).send("No user found with the given id");
    }
    if (user.id !== req.user.id) {
      return res.status(401).send("Unauthorized");
    }
    const updatedUser = await updateUser(id, {
      username,
      email,
      fname,
      city,
      birthday,
      about,
    });
    res.send(updatedUser);
  } catch (error) {
    next(error);
  }
});

usersRouter.delete("/:id", requireUser, async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).send("No user found with the given id");
    }
    if (user.id !== req.user.id) {
      return res.status(401).send("Unauthorized");
    }
    const deletedUser = await deleteUser(id);
    res.send(deletedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;

