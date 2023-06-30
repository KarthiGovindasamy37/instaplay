import React, { useState } from 'react'
import Modal from './components/Modal'

function Details() {

    const [showModal,setShowModal]= useState(false)

  return (
    <>
    <div className='modal-div'>
            <div className="detail-nav">
            <div className="logo">
                    <img src='/assets/instaPlay.svg'/>
                </div>
            </div>
            <div className="details-bg">
                <div className="arrow">
                    <img src="/assets/Frame.svg" alt="" />
                </div>
                <div className="desc-pos">
                    <div className="movie-desc">
                        <p className="movie-desc-t">The God Father</p>
                        <p className="movie-desc-rating">Rating : 4.6/5</p>
                        <p className="movie-desc-content">
                        Don Vito Corleone, head of a mafia family, decides to hand over his empire to his youngest son Michael. However, his decision unintentionally puts the lives of his loved ones in grave danger.
                        </p>
                        <div className="release-div">
                        <p className="release">Release Date</p>
                        <p className="release-date">1979</p>
                        </div>
                        <div className="original-div">
                            <p className="original">Original Language</p>
                            <p className="languages">English, Spanish, French</p>
                        </div>
                    </div>
                    </div>
                <div className="detail-division">
                <div className="desc">
                    
                </div>
                <div className="movie-desc-pic">
                    <img src="/assets/detailImage.png" alt="" className='detail-pic'/>
                    <div className="play-icon-details-div">
                    <img src="/assets/playIconDesc.svg" alt="" className='play-icon-details' onClick={()=>setShowModal(true)}/>
                    </div>
                    <div className="overlay"></div>
                </div>
                </div>
            
                <Modal showModal={showModal} setShowModal={setShowModal}/>
            </div> 
            
    </div>
    </>)
}

export default Details