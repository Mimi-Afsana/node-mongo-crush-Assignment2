const express = require("express");
const tourControllers = require("../controllers/tours.controllers");
const viewCount = require("../middlewares/viewCount");
const router = express.Router();

router.route("/").get(tourControllers.getTours).post(tourControllers.saveTour);
router.route("/trending").get(tourControllers.getTopThreeViewed);
router.route("/cheapest").get(tourControllers.getThreeCheapestTour);

router
  .route("/:id")
  .get(tourControllers.getSingleServiceById)
  .patch(tourControllers.updateById);

module.exports = router;
