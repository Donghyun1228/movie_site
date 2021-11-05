import React, { useEffect } from "react";
import { Col } from "antd";

export default function GridCards(props) {
  if (props.landingPage) {
    return (
      <Col lg={6} md={8} xs={24}>
        <div style={{ position: "relative" }}>
          <a href={`/movie/${props.movieId}`}>
            <img
              src={props.image}
              alt={props.movieTitle}
              style={{ width: "100%", height: "320px" }}
            />
          </a>
        </div>
      </Col>
    );
  } else {
    return (
      <Col lg={6} md={8} xs={24}>
        <div style={{ position: "relative" }}>
          <img src={props.image} style={{ width: "100%", height: "320px" }} />
        </div>
      </Col>
    );
  }
}
