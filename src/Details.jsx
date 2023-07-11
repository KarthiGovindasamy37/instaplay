import React, { useEffect, useState } from "react";
import Modal from "./components/Modal";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function Details() {
  const [MovieDetails, setMovieDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [videoDetails, setVideoDetails] = useState({});
  const [iconState, setIconState] = useState(false);
  const [sourceAlert, setSourceAlert] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setSourceAlert("");
    getMovieDetails();
  }, []);

  const getMovieDetails = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${params.id}?api_key=f2eedd0ef7a8665b0ae82eb6445a77e7&language=en-US`
      );
      setMovieDetails(res.data);

      const videoRes = await axios.get(
        `https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=f2eedd0ef7a8665b0ae82eb6445a77e7&language=en-US`
      );
      let trailer = videoRes.data.results.filter((e) => e.type === "Trailer");
      if (trailer.length) {
        setIconState(true);
        setVideoDetails(trailer[0].key);
      }
      setLoading(false);
    } catch (error) {
      if (error.response.status === 404) {
        setSourceAlert(error.response.data.status_message);
      }
      setLoading(false);
      toast.error(error.response.data.status_message, {
        toastId: "abc",
      });
    }
  };

  const {
    backdrop_path,
    id,
    overview,
    original_title,
    release_date,
    spoken_languages,
    vote_average,
  } = MovieDetails;

  const getYear = (date) => {
    let originalDate = new Date(date);
    return originalDate.getFullYear();
  };

  const getLanguages = (e = []) => {
    let languages = e.map((e, i) => {
      if (i !== 0) {
        return ` ${e.english_name}`;
      } else {
        return e.english_name;
      }
    });
    return languages.join();
  };

  return (
    <>
      <div className="modal-div">
        <div className="detail-nav">
          <div className="logo">
            <img
              src="/assets/instaPlay.svg"
              onClick={() => navigate("/movies")}
              className="logoImg"
            />
          </div>
        </div>
        {loading ? (
          <div className="loading details-bg-loading">
            <img src="/assets/ZZ5H.gif" alt="" className="loading-img" />
          </div>
        ) : sourceAlert ? (
          <div className="details-bg-loading">
            <div>{sourceAlert}</div>
          </div>
        ) : (
          <div className="details-bg">
            <div className="arrow">
              <Link to="/movies">
                <img src="/assets/Frame.svg" alt="" />
              </Link>
            </div>
            <div className="desc-pos">
              <div className="movie-desc">
                <p className="movie-desc-t">{original_title ?? "No title"}</p>
                {vote_average ? (
                  <p className="movie-desc-rating">{`Rating : ${(
                    vote_average / 2
                  ).toFixed(1)} /  5`}</p>
                ) : (
                  ""
                )}
                <div className="detailDescDiv">
                  <p className="movie-desc-content">
                    {overview ?? "Overview not available"}
                  </p>
                </div>
                <div className="release-div">
                  <p className="release">Release Date</p>
                  <p className="release-date">
                    {release_date ? getYear(release_date) : "Nil"}
                  </p>
                </div>
                <div className="original-div">
                  <p className="original">Original Language</p>
                  <p className="languages">
                    {spoken_languages ? getLanguages(spoken_languages) : "Nil"}
                  </p>
                </div>
              </div>
            </div>
            <div className="detail-division">
              <div className="desc"></div>
              <div className="movie-desc-pic">
                <img
                  src={
                    backdrop_path
                      ? `https://image.tmdb.org/t/p/w500/${backdrop_path}`
                      : ""
                  }
                  alt=""
                  className="detail-pic"
                />
                {iconState ? (
                  <div className="play-icon-details-div">
                    <img
                      src="/assets/playIconDesc.svg"
                      alt=""
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

            <Modal
              showModal={showModal}
              setShowModal={setShowModal}
              videoKey={videoDetails}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default Details;
