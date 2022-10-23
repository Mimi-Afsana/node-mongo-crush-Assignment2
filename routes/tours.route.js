const express = require("express");
const tourControllers = require("../controllers/tours.controllers");
const viewCount = require("../middlewares/viewCount");
const router = express.Router();

router
  .route("/tours")
  .get(tourControllers.getTours)
  .post(tourControllers.saveTour);
router.route("/tour/trending").get(tourControllers.getTopThreeViewed);
router.route("/tour/cheapest").get(tourControllers.getThreeCheapestTour);

router.route("/tours/:id").get(tourControllers.getSingleServiceById);
router.route("/tour/:id").patch(tourControllers.updateById);

module.exports = router;
