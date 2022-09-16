import roomModel from "../models/roomModel.js";
import hotelModel from "../models/hotelModel.js";

export const createRoom = async (req, res, next) => {
  const newRoom = new roomModel(req.body);
  try {
    const createdRoom = await newRoom.save();
    try {
      await hotelModel.findByIdAndUpdate(req.params.hotelId, {
        $push: { rooms: createdRoom._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(createdRoom);
  } catch (err) {
    next(err);
  }
};

export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await roomModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};

export const deleteRoom = async (req, res, next) => {
  try {
    const deletedRoom = await roomModel.findByIdAndDelete(req.params.id);
    try {
      await hotelModel.findByIdAndUpdate(req.params.hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (err) {}
    res.status(200).json(deletedRoom);
  } catch (err) {
    next(err);
  }
};

export const getRoom = async (req, res, next) => {
  try {
    const roomData = await roomModel.findById(req.params.id);
    res.status(200).json(roomData);
  } catch (err) {
    next(err);
  }
};

export const getRooms = async (req, res, next) => {
  try {
    const allRooms = await roomModel.find({});
    res.status(200).json(allRooms);
  } catch (err) {
    next(err);
  }
};
