import { useEffect } from "react";
import PropTypes from 'prop-types';

export const Modal = ({ imageUrl, onClose }) => {
    const onClickClose = (e) => {  
        if (e.key === "Escape") {
            onClose();
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', onClickClose);

        return () => {
            document.removeEventListener('keydown', onClickClose);
        }
    }, []);
    
    return (
        <div className="overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => { e.stopPropagation() }}>
                <img src={imageUrl} alt="" />
            </div>
        </div>
    )
}

Modal.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired
}