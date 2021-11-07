import React, { useState, useEffect } from "react";
import { Button } from "antd";
import Axios from "axios";

function FavoriteBtn(props) {
  const movieId = props.movieId;
  const userFrom = props.userFrom;
  const movieTitle = props.movieInfo.original_title;
  const moviePost = props.movieInfo.backdrop_path;
  const movieRuntime = props.movieInfo.runtime;

  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteNum, setFavoriteNum] = useState(0);
  const [load, setLoad] = useState(false);

  let variables = {
    userFrom,
    movieId,
    movieTitle,
    moviePost,
    movieRuntime,
  };

  console.log(variables);
  function onFavHandler(e) {
    let variables = {
      userFrom,
      movieId,
      movieTitle,
      moviePost,
      movieRuntime,
    };
    Axios.post("/api/favorite/register", variables).then(() => {
      Axios.post("/api/favorite/favoriteNum", variables)
        .then(response => {
          if (response.data.success) {
            setFavoriteNum(response.data.favoriteNumber);
          } else {
            alert("좋아요한 개수를 불러오는 데 실패했습니다.");
          }
        })
        .then(() => {
          setIsFavorite(isFavorite ? false : true);
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  function offFavHandler(e) {
    let variables = {
      userFrom,
      movieId,
      movieTitle,
      moviePost,
      movieRuntime,
    };
    setLoad(true);
    Axios.post("/api/favorite/favoriteNum", variables)
      .then(response => {
        if (response.data.success) {
          setFavoriteNum(response.data.favoriteNumber);
        } else {
          alert("좋아요한 개수를 불러오는 데 실패했습니다.");
        }
      })
      .then(() => {
        setIsFavorite(isFavorite ? false : true);
      })
      .then(() => setLoad(false))
      .catch(err => {
        console.log(err);
      });
  }

  function onFavHandler(e) {
    let variables = {
      userFrom,
      movieId,
      movieTitle,
      moviePost,
      movieRuntime,
    };
    setLoad(true);
    Axios.post("/api/favorite/register", variables)
      .then(() => {
        return Axios.post("/api/favorite/favoriteNum", variables);
      })
      .then(response => {
        if (response.data.success) {
          setFavoriteNum(response.data.favoriteNumber);
        } else {
          alert("좋아요한 개수를 불러오는 데 실패했습니다.");
        }
      })
      .then(() => {
        setIsFavorite(isFavorite ? false : true);
      })
      .then(() => setLoad(false))
      .catch(err => {
        console.log(err);
      });
  }

  useEffect(() => {
    let variables = {
      userFrom,
      movieId,
      movieTitle,
      moviePost,
      movieRuntime,
    };
    Axios.post("/api/favorite/favoriteNum", variables)
      .then(response => {
        if (response.data.success) {
          setFavoriteNum(response.data.favoriteNumber);
        } else {
          alert("좋아요한 개수를 불러오는 데 실패했습니다.");
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      {isFavorite ? (
        <Button disabled={load} type="default" onClick={offFavHandler}>
          <i className="fas fa-heart"> {favoriteNum}</i>
        </Button>
      ) : (
        <Button disabled={load} type="default" onClick={onFavHandler}>
          <i className="far fa-heart"> {favoriteNum}</i>
        </Button>
      )}
    </div>
  );
}

export default FavoriteBtn;
