import React from "react";
import "../Popup.css"; // Стили

const Popup = ({ isOpen, onClose, children, title }) => {
    if (!isOpen) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-container">
                <div className="popup-header">
                    <h2>{title}</h2>
                    <button className="popup-close" onClick={onClose}>
                        ×
                    </button>
                </div>
                <div className="popup-content">{children}</div>
            </div>
        </div>
    );
};

export default Popup;