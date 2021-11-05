import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../../Config";
import { Button, Row } from "antd";
import MainImage from "../LandingPage/Sections/MainImage";
import MovieInfo from "./MovieInfo";
import GridCards from "../commons/GridCards";

export default function MovieDetail(props) {
  const movieId = props.match.params.movieId;

  const [movie, setMovie] = useState(null);
  const [crews, setCrews] = useState(null);
  const [isToggle, setIsToggle] = useState(false);

  function toggleCastHandler(e) {
    setIsToggle(isToggle ? false : true);
  }
  useEffect(() => {
    const endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
    const endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
    axios.get(endpointInfo).then(response => {
      setMovie(response.data);
      console.log(response.data);
    });

    axios.get(endpointCrew).then(response => {
      setCrews(response.data);
      console.log("crew list", response.data);
    });
  }, []);

  return (
    <div>
      {movie && (
        <MainImage
          image={`${IMAGE_BASE_URL}w1280${movie.backdrop_path}`}
          title={movie.original_title}
          description={movie.overview}
        />
      )}
      <div
        style={{
          width: "85%",
          margin: "2rem auto",
        }}
      >
        <MovieInfo movie={movie} />
        <div
          style={{
            width: "85%",
            margin: "2rem auto",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button type="default" onClick={toggleCastHandler}>
            Cast
          </Button>
        </div>
        <Row gutter={[16, 16]}>
          {isToggle &&
            crews.cast.map((crew, index) => {
              return (
                <React.Fragment key={index}>
                  <GridCards
                    image={
                      crew.profile_path
                        ? `${IMAGE_BASE_URL}w500${crew.profile_path}`
                        : null
                    }
                  />
                </React.Fragment>
              );
            })}
        </Row>
      </div>
    </div>
  );
}
