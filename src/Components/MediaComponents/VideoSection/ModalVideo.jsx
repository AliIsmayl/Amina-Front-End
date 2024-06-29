import React from 'react';
import './Modal.scss';
import { GrFormPrevious } from "react-icons/gr";
import { MdOutlineNavigateNext } from "react-icons/md";

function Modal({ video, onClose, onPrev, onNext, hasPrev, hasNext }) {
    if (!video) return null;

    return (
        <div className="modal-photo">
            <div className="modal" onClick={onClose}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()} >
                    <span className="close" onClick={onClose}>&times;</span>
                    <video controls src={video} alt="Enlarged" />
                    {hasPrev && <button style={{ position: "absolute", top: "50%", left: "-25px" }} className="nav-button prev-button" onClick={onPrev}><GrFormPrevious /></button>}
                    {hasNext && <button style={{ position: "absolute", top: "50%", right: "-25px" }} className="nav-button next-button" onClick={onNext}><MdOutlineNavigateNext /></button>}
                </div>
            </div>
        </div>
    );
}

export default Modal;
