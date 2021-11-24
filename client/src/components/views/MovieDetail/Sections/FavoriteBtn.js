import React, { useState, useEffect } from "react";
import { Button } from "antd";
import Axios from "axios";

function FavoriteBtn(props) {
  let variables = {
    userFrom: props.userFrom,
    movieId: props.movieId,
    movieTitle: props.movieInfo.original_title,
    moviePost: props.movieInfo.backdrop_path,
    movieRuntime: props.movieInfo.runtime,
  };

  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteNum, setFavoriteNum] = useState(0);
  const [load, setLoad] = useState(true);

  function onFavHandler(e) {
    setLoad(true);
    Axios.post("/api/favorite/delete", variables)
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
        setLoad(false);
      })
      .catch(err => {
        console.log(err);
      });
  }

  function offFavHandler(e) {
    setLoad(true);
    Axios.post("/api/favorite/register", variables)
      .then(() => {
        return new Promise(resolve => {
          setTimeout(() => resolve(), 100);
        });
      })
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
        setLoad(false);
      })
      .catch(err => {
        console.log(err);
      });
  }

  useEffect(() => {
    Axios.post("/api/favorite/favoriteNum", variables)
      .then(response => {
        if (response.data.success) {
          setFavoriteNum(response.data.favoriteNumber);
          setLoad(false);
        } else {
          alert("좋아요한 개수를 불러오는 데 실패했습니다.");
        }
      })
      .catch(err => {
        console.log(err);
      });

    Axios.post("/api/favorite/favorited", variables)
      .then(response => {
        if (response.data.success) {
          if (response.data.favorited) {
            setIsFavorite(true);
          }
        } else {
          alert("정보를 불러오는 데 실패했습니다.");
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      {isFavorite ? (
        <Button disabled={load} type="default" onClick={onFavHandler}>
          <i className="fas fa-heart"> {favoriteNum}</i>
        </Button>
      ) : (
        <Button disabled={load} type="default" onClick={offFavHandler}>
          <i className="far fa-heart"> {favoriteNum}</i>
        </Button>
      )}
    </div>
  );
}

export default FavoriteBtn;
