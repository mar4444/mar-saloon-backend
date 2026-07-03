import User from "../models/Users.js";
import bcrypt from "bcrypt";
import { Op } from "sequelize";

export const registerUser = async (req, res) => {
  try {
    const { name, email, phone, role, password } = req.body;

    const exists = await User.findOne({ where: { email } });
    if (exists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      phone,
      role,
      password: hashed,
    });

    const { password: pw, ...userData } = user.dataValues;

    res.status(201).json({
      message: "User created successfully",
      user: userData,
    });

  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ success: false, message: error.message});
  }
};


// GET ALL
export const getUsers = async (req, res) => {
  try {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 2;
    const offset = (page - 1) * limit;

    const search = req.query.search || "";
    const role = req.query.role || "";
    const sort = req.query.sort || "createdAt";

    // 1. BUILD FILTER CONDITIONS
    const whereCondition = {};

    // SEARCH (name)
    if (search) {
      whereCondition.name = {
        [Op.like]: `%${search}%`
      };
    }

    // FILTER (Role)
    if (role) {
      whereCondition.role = role;
    }

    // 2. GET Users
    const users = await User.findAll({
      where: whereCondition,
      limit,
      offset,
      attributes: { exclude: ["password"] },
      order: [[sort, "DESC"]],
    });

    // 3. COUNT TOTAL MATCHING USERS
    const totalUsers = await User.count({
      where: whereCondition,
    });

    const totalPages = Math.ceil(totalUsers / limit);

    res.json({
      page,
      limit,
      totalUsers,
      totalPages,
      data: users,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteUser = await User.destroy({ where: { id } });

    if (!deleteUser) {
      return res.status(400).json({ success: false, message: "User not found!!"});
    }

    res.status(200).json({ success: true, message: "User successfully deleted!" })

  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}