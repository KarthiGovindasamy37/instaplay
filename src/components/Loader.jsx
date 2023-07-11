import loaderGif from "../Assets/ZZ5H.gif"

const Loader = () => {
  return (
    <div className="loading">
    <img src={loaderGif} alt="loader" className="loading-img" />
    </div>
  )
}

export default Loader