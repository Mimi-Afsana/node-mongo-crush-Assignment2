const Tour = require("../model/TourSchema");

// save tour service
const saveService = async (data) => {
  const tour = await Tour.create(data);
  return tour;
};

// get all tour service
const getService = async (querys) => {
  const tours = await Tour.find({})
    .skip(querys.skip)
    .limit(querys.limit)
    .select(querys.fields)
    .sort(querys.sortBy);

  return tours;
};

// update tour service
const updateServiceById = async (id, data) => {
  const updatedResult = await Tour.updateOne(
    { _id: id },
    { $set: data },
    { runValidators: true }
  );
  return updatedResult;
};

// get tour service using id

const getServiceById = async (toorId) => {
  const tour = await Tour.findById(toorId);
  return tour;
};

// get three tour service

const getThreeTour = async (querys) => {
  const tours = await Tour.find({}).sort(querys.sortBy).limit(querys.limit);
  return tours;
};

module.exports = {
  saveService,
  getService,
  updateServiceById,
  getServiceById,
  getThreeTour,
};
