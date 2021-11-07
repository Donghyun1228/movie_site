const express = require("express");
const router = express.Router();
const { Favorite } = require("../models/Favorite");

router.post("/favoriteNum", (req, res) => {
  Favorite.find({ movieId: req.body.movieId }, (err, docs) => {
    if (err) {
      res.status(500).send("database error");
      console.log(err);
    } else {
      res.status(200).json({
        success: true,
        favoriteNumber: docs.length,
      });
    }
  });
});

router.post("/register", (req, res) => {
  let favorite = new Favorite(req.body);
  favorite.save().then(
    res.json({
      success: true,
    })
  );
});

module.exports = router;
