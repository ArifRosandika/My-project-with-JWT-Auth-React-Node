import { Sequelize } from "sequelize";
import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ["id", "username", "email"],
    });
    res.json(users);
  } catch (error) {
    console.log("error:", error.message);
  }
};

export const Register = async (req, res) => {
  const { username, email, password, confPassword } = req.body;
  if (!username || !email || !password || !confPassword)
    return res.status(400).json({ message: "ALL fields are required" });
  if (password !== confPassword)
    return res
      .status(400)
      .json({ message: "Password and confirmation password do not match" });
  console.log("Register:", req.body);

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    const exist = await Users.findOne({ where: { email } });
    if (exist) {
      return res.status(400).json({ message: "Email is already in use" });
    }
    await Users.create({
      username,
      email,
      password: hashPassword,
    });

    res.status(200).json({ message: "Register success" });
  } catch (error) {
    if (error instanceof Sequelize.UniqueConstraintError) {
      return res
        .status(400)
        .json({ message: "Email is already in use (constraint)" });
    }
    console.log("Server error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const Login = async (req, res) => {
  console.log(req.body.email);
  console.log(req.body.password);
  try {
    const user = await Users.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    const match = await bcrypt.compare(req.body.password, user.password);
    console.log(match);
    if (!match) return res.status(401).json({ message: "Wrong password!" });

    const userId = user.id;
    const username = user.username;
    const email = user.email;

    const accessToken = jwt.sign(
      { userId, username, email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    console.log(process.env.ACCESS_TOKEN_SECRET);
    const refreshToken = jwt.sign(
      { userId, username, email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "5d" }
    );
    console.log(process.env.REFRESH_TOKEN_SECRET);

    await Users.update({ refreshToken }, { where: { id: userId } });
    res.cookie("refreshToken", refreshToken, {
      secure: true,
      httpOnly: true,
      maxAge: 5 * 24 * 60 * 60 * 1000,
    });
    return res
      .status(200)
      .json({ accessToken, user: { userId, username, email } });
  } catch (error) {
    console.log("Login failed", error.message);
    res.status(500).json({ msg: "Login failed", error: error.message });
  }
};

export const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const user = await Users.findOne({ where: { refreshToken } });
  if (!user) return res.sendStatus(204);
  const userId = user.id;
  await Users.update({ refreshToken: null }, { where: { id: userId } });
  res.clearCookie("refreshToken");
  return res.sendStatus(200).json({ message: "Logout success" });
};
