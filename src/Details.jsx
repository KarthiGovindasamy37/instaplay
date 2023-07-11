import { useEffect, useState } from "react";
import Modal from "./components/Modal";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getMovieData } from "./Services/Details";
import { getYear } from "./Helper/Index";
import logo from "./Assets/instaPlay.svg";
import Loader from "./components/Loader";
import arrow from "./Assets/Frame.svg";
import playIcon from "./Assets/playIconDesc.svg";

function Details() {
  const params = useParams();
  const navigate = useNavigate();
  const [MovieDetails, setMovieDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [videoDetails, setVideoDetails] = useState({});
  const [iconState, setIconState] = useState(false);
  const [sourceAlert, setSourceAlert] = useState("");

  useEffect(() => {
    getMovieDetails();
  }, []);

  const getMovieDetails = async () => {
    try {
      const res = await getMovieData(params.id);

      setMovieDetails(res.data);

      const videoRes = await getMovieData(params.id);

      const trailer = videoRes?.data?.results?.filter(
        (e) => e.type === "Trailer"
      );
      if (trailer.length) {
        setIconState(true);
        setVideoDetails(trailer[0].key);
      }
      setLoading(false);
    } catch (error) {
      if (error?.response?.status === 404) {
        setSourceAlert(error?.response?.data?.status_message);
      }
      setLoading(false);
      toast.error(error?.response?.data?.status_message, {
        toastId: "movieError",
      });
    }
  };

  // const {
  //   backdrop_path,
  //   id,
  //   overview,
  //   original_title,
  //   release_date,
  //   spoken_languages,
  //   vote_average,
  // } = MovieDetails;

  const getLanguages = (languageArr = []) => {
    const languages = languageArr.map((language, indx) => {
      if (indx !== 0) {
        return ` ${language.english_name}`;
      } else {
        return language.english_name;
      }
    });
    return languages.join();
  };

  const rating = (avg) => {
    return (avg / 2).toFixed(1);
  };
  return (
    <>
      <div className="modal-div">
        <div className="detail-nav">
          <div className="logo">
            <img
              src={logo}
              onClick={() => navigate("/movies")}
              className="logoImg"
            />
          </div>
        </div>
        {loading ? (
          <div className=" details-bg-loading">
            <Loader />
          </div>
        ) : sourceAlert ? (
          <div className="details-bg-loading">
            <div>{sourceAlert}</div>
          </div>
        ) : (
          <div className="details-bg">
            <div className="arrow">
              <Link to="/movies">
                <img src={arrow} alt="frame" />
              </Link>
            </div>
            <div className="desc-pos">
              <div className="movie-desc">
                <p className="movie-desc-t">
                  {MovieDetails?.original_title ?? "No title"}
                </p>
                {MovieDetails?.vote_average ? (
                  <p className="movie-desc-rating">{`Rating : ${rating(
                    MovieDetails.vote_average
                  )} /  5`}</p>
                ) : (
                  ""
                )}
                <div className="detailDescDiv">
                  <p className="movie-desc-content">
                    {MovieDetails?.overview ?? "Overview not available"}
                  </p>
                </div>
                <div className="release-div">
                  <p className="release">Release Date</p>
                  <p className="release-date">
                    {MovieDetails?.release_date
                      ? getYear(MovieDetails.release_date)
                      : "Nil"}
                  </p>
                </div>
                <div className="original-div">
                  <p className="original">Original Language</p>
                  <p className="languages">
                    {MovieDetails?.spoken_languages
                      ? getLanguages(MovieDetails.spoken_languages)
                      : "Nil"}
                  </p>
                </div>
              </div>
            </div>
            <div className="detail-division">
              <div className="desc"></div>
              <div className="movie-desc-pic">
                <img
                  src={
                    MovieDetails?.backdrop_path
                      ? `https://image.tmdb.org/t/p/w500/${MovieDetails.backdrop_path}`
                      : ""
                  }
                  alt=""
                  className="detail-pic"
                />
                {iconState ? (
                  <div className="play-icon-details-div">
                    <img
                      src={playIcon}
                      alt="playIcon"
                      className="play-icon-details"
                      onClick={() => setShowModal(true)}
                    />
                  </div>
                ) : (
                  ""
                )}
                <div className="overlay"></div>
              </div>
            </div>
            {showModal ? (
              <Modal setShowModal={setShowModal} videoKey={videoDetails} />
            ) : (
              ""
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Details;
