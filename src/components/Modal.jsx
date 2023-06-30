import React from 'react'

const Modal = ({showModal,setShowModal}) => {
  return <>
  {
    showModal ?
    <div style={{color: "white"}} className='modal'>
        <div className="modal-view-div">
            <div className="close">
                <img src="/assets/closeIcon.svg" alt="" className='close-icon' onClick={()=>setShowModal(false)}/>
            </div>
        </div>
    </div>
: null
  }
</>
}

export default Modal