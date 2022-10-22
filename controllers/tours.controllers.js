const ObjectId = require("mongoose").Types.ObjectId;

const {
  saveService,
  getService,
  updateServiceById,
  getServiceById,
  getThreeTour,
} = require("../tourServices/tour.services.js");

// get tours service
const getTours = async (req, res, next) => {
  try {
    const querys = {};

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      querys.sortBy = sortBy;
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      querys.fields = fields;
    }
    if (req.query.page) {
      const { page = 1, limit = 5 } = req.query;
      const skip = (page - 1) * Number(limit);
      querys.skip = skip;
      querys.limit = Number(limit);
    }
    const tours = await getService(querys);
    res.send(tours);
  } catch (error) {
    res.status(400).send({
      status: false,
      message: "can't get data something is wrong",
      error: error.message,
    });
  }
};

// save tour service
const saveTour = async (req, res, next) => {
  try {
    const tour = await saveService(req.body);
    await tour.save();
    res.status(200).send({
      status: true,
      message: "save successfully",
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: "something went wrong data can not save",
      error: error.message,
    });
  }
};

// update tour service using id

const updateById = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: `id is not valid` });
    }

    const result = await updateServiceById(id, req.body);

    if (!result.modifiedCount) {
      return res
        .status(400)
        .json({ success: false, error: `Can not update the Data` });
    }
    res.status(200).json({
      status: true,
      message: "data updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "something is wrong data can not update",
      error: error.message,
    });
  }
};

// get service by id

const getSingleServiceById = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      res.status(400).send({
        success: false,
        error: `It is not valid id`,
      });
    }

    const tour = await getServiceById(id);
    tour.views = (await tour.views) + 1;
    const result = await updateServiceById(id, tour);
    res.status(200).json({
      status: true,
      message: `Find the service by ${id}`,
      data: tour,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: "can not get data",
      error: error.message,
    });
  }
};

// get three tour

const getTopThreeViewed = async (req, res, next) => {
  try {
    const querys = {};
    querys.sortBy = "-views";
    querys.limit = 3;

    const tours = await getThreeTour(querys);
    res.json(tours);
  } catch (error) {
    res.status(400).send({
      status: false,
      message: "data not found",
      error: error.message,
    });
  }
};

// three cheapest tour
const getThreeCheapestTour = async (req, res, next) => {
  try {
    const querys = {};
    querys.sortBy = "price";
    querys.limit = 3;

    const tours = await getThreeTour(querys);
    res.json(tours);
  } catch (error) {
    res.status(400).send({
      status: false,
      message: "Data is not found",
      error: error.message,
    });
  }
};

module.exports = {
  getTours,
  saveTour,
  getSingleServiceById,
  updateById,
  getThreeCheapestTour,
  getTopThreeViewed,
};
