import {
  createTheatre,
  getAllTheatres,
  getTheatreById,
  updateTheatre,
  deleteTheatre
} from "../models/theatreModel.js";

export const addTheatre = async (req, res, next) => {
  try {
    const { name, location } = req.body;

    if (!name || !location) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const theatre = await createTheatre({ name, location });

    res.status(201).json({
      success: true,
      theatre
    });
  } catch (error) {
    next(error);
  }
};

export const fetchTheatres = async (req, res, next) => {
  try {
    const theatres = await getAllTheatres();
    res.status(200).json({ success: true, theatres });
  } catch (error) {
    next(error);
  }
};

export const editTheatre = async (req, res, next) => {
  try {
    const existing = await getTheatreById(req.params.id);

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Theatre not found"
      });
    }

    const updated = await updateTheatre(req.params.id, req.body);

    res.status(200).json({
      success: true,
      theatre: updated
    });
  } catch (error) {
    next(error);
  }
};

export const removeTheatre = async (req, res, next) => {
  try {
    const existing = await getTheatreById(req.params.id);

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Theatre not found"
      });
    }

    await deleteTheatre(req.params.id);

    res.status(200).json({
      success: true,
      message: "Theatre deleted"
    });
  } catch (error) {
    next(error);
  }
};
