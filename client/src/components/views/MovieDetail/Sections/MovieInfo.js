import React, { useEffect } from "react";
import { Descriptions } from "antd";

export default function MovieInfo(props) {
  let { movie } = props;

  return (
    <div>
      {movie && (
        <Descriptions bordered title="Movie Info">
          <Descriptions.Item label="Movie Name" span={2}>
            {movie.original_title}
          </Descriptions.Item>
          <Descriptions.Item label="Release Date">
            {movie.release_date}
          </Descriptions.Item>
          <Descriptions.Item label="Revenue">{movie.revenue}</Descriptions.Item>
          <Descriptions.Item label="Runtime">{movie.runtime}</Descriptions.Item>
          <Descriptions.Item label="Vote Average">
            {movie.vote_average}
          </Descriptions.Item>
          <Descriptions.Item label="Vote Count">
            {movie.vote_count}
          </Descriptions.Item>
          <Descriptions.Item label="Status">{movie.status}</Descriptions.Item>
          <Descriptions.Item label="Popularity">
            {movie.popularity}
          </Descriptions.Item>
        </Descriptions>
      )}
    </div>
  );
}
