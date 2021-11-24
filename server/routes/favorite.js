const express = require("express");
const router = express.Router();
const { Favorite } = require("../models/Favorite");

router.post("/favoriteNum", (req, res) => {
  Favorite.find({ movieId: req.body.movieId }, (err, docs) => {
    if (err) {
      res.status(500).send("error");
      console.log(err);
    } else {
      res.status(200).json({
        success: true,
        favoriteNumber: docs.length,
      });
    }
  });
});

router.post("/favorited", (req, res) => {
  Favorite.find(
    { movieId: req.body.movieId, userFrom: req.body.userFrom },
    (err, docs) => {
      if (err) {
        res.status(500).send("error");
        console.log(err);
      } else {
        res.status(200).json({
          success: true,
          favorited: docs.length ? true : false,
        });
      }
    }
  );
});

router.post("/delete", (req, res) => {
  Favorite.deleteMany(
    { movieId: req.body.movieId, userFrom: req.body.userFrom },
    (err, result) => {
      if (err) {
        res.status(500).send("error");
        console.log(err);
      } else {
        res.status(200).json({
          success: true,
        });
      }
    }
  );
});

router.post("/register", (req, res) => {
  let favorite = new Favorite(req.body);
  favorite
    .save()
    .then(
      res.json({
        success: true,
      })
    )
    .catch(err => {
      res.status(500).send("error");
      console.log(err);
    });
});

module.exports = router;
