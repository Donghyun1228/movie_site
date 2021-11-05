import React, { useEffect, useState } from "react";
import { API_KEY, API_URL, IMAGE_BASE_URL } from "../../Config";
import axios from "axios";
import MainImage from "./Sections/MainImage";
import GridCards from "../commons/GridCards";
import { Row } from "antd";

function LandingPage() {
  const [movies, setMovies] = useState([]);
  const [mainMovie, setMainMovie] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const getMoviesAndSetState = function (endpoint) {
    axios
      .get(endpoint)
      .then(response => {
        console.log(response);
        setMovies([...movies, ...response.data.results]);
        setMainMovie(response.data.results[0]);
        setCurrentPage(response.data.page);
      })
      .catch(err => console.log(err));
  };

  const loadMoreMovies = function () {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${
      currentPage + 1
    }`;
    getMoviesAndSetState(endpoint);
  };

  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    getMoviesAndSetState(endpoint);
  }, []);

  return (
    <div style={{ width: "100%", margin: "0" }}>
      {mainMovie && (
        <MainImage
          image={`${IMAGE_BASE_URL}w1280${mainMovie.backdrop_path}`}
          title={mainMovie.original_title}
          description={mainMovie.overview}
        />
      )}

      <div style={{ width: "85%", margin: "1rem auto" }}>
        <h2>Movies by latest</h2>
        <hr />
        <Row gutter={[16, 16]}>
          {movies &&
            movies.map((movie, index) => {
              return (
                <React.Fragment key={index}>
                  <GridCards
                    landingPage
                    image={
                      movie.poster_path
                        ? `${IMAGE_BASE_URL}w500${movie.poster_path}`
                        : null
                    }
                    movieId={movie.id}
                    movieTitle={movie.original_title}
                  />
                </React.Fragment>
              );
            })}
        </Row>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={loadMoreMovies}>Load more</button>
      </div>
    </div>
  );
}

export default LandingPage;
