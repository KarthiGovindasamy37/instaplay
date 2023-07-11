import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

function Card({ e }) {
  const { title, poster_path, id, vote_average } = e;
  return (
    <div key={id} className="card-div">
      <div className="card">
        <div className="img-div">
          <Link to={`/movie/${id}`}>
            <img
              src={
                poster_path
                  ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                  : `/assets/detailImage.png`
              }
              className="movie-img"
            />
          </Link>
        </div>
        <div className="detail">
          <div className="detail-div">
            <div className="detail-w">
              <div className="tit-div">
                <p className="title-t">{title}</p>
              </div>
              <div className="rating-div">
                <div className="star">
                  <ReactStars
                    count={Math.floor(vote_average / 2)}
                    edit={false}
                    color="#ffd700"
                    size={16}
                  />
                </div>
                {vote_average ? (
                  <div className="rating">{`${(vote_average / 2).toFixed(
                    1
                  )} /  5`}</div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="play">
              <div className="play-icon">
                <Link to={`/movie/${id}`}>
                  <img
                    src="/assets/playIcon.svg"
                    alt=""
                    className="play-icon-card"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
