import {
  getAllUsers,
  findUserById,
  deleteUserById
} from "../models/userModel.js";

export const fetchUsers = async (req, res, next) => {
  try {
    const users = await getAllUsers();

    res.status(200).json({
      success: true,
      users
    });
  } catch (error) {
    next(error);
  }
};

export const fetchUserById = async (req, res, next) => {
  try {
    const user = await findUserById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    next(error);
  }
};

export const removeUser = async (req, res, next) => {
  try {
    await deleteUserById(req.params.id);

    res.status(200).json({
      success: true,
      message: "User deleted"
    });
  } catch (error) {
    next(error);
  }
};
