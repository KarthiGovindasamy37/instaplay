import React from 'react'

function Card({e}) {
  const {original_title,backdrop_path} = e
  return (
    <div className="card-div">
    <div className="card">
    <div className="img-div">
      <img src={"https://image.tmdb.org/t/p/w500" + backdrop_path} className='movie-img' />
      </div>
      <div className="detail">
        <div className="detail-div">
          <div className="detail-w">
          <div className="tit-div">
          <p className='title-t'>{original_title}</p>
          </div>
          <div className="rating-div">
            <div className="star">
                <img src="/assets/starIcon.svg" alt="" className='star-icon'/>
            </div>
            <div className="rating">4.5/5</div>
          </div>
          </div>
          <div className="play">
            <div className="play-icon">
                <img src="/assets/playIcon.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
  </div>
  </div>
  )
}

export default Card