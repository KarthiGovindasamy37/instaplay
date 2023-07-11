
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import playIcon from '../Assets/playIcon.svg'

function Card({ cardDetails }) {

  const rating =(avg)=>{
    return (avg / 2).toFixed(1)
  }

  return (
    <div key={cardDetails?.id} className="card-div">
      <div className="card">
        <div className="img-div">
          <Link to={`/movie/${cardDetails?.id}`}>
            <img
              src={
                cardDetails?.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${cardDetails.poster_path}`
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
                <p className="title-t">{cardDetails?.title}</p>
              </div>
              <div className="rating-div">
                <div className="star">
                  <ReactStars
                    count={Math.floor(cardDetails?.vote_average / 2)}
                    edit={false}
                    color="#ffd700"
                    size={16}
                  />
                </div>
                {cardDetails?.vote_average ? (
                  <div className="rating">{`${rating(cardDetails.vote_average)} /  5`}</div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="play">
              <div className="play-icon">
                <Link to={`/movie/${cardDetails?.id}`}>
                  <img
                    src={playIcon}
                    alt="playIcon"
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
