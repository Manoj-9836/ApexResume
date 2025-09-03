import React, { useState } from 'react';

const ToastNotification = ({ message, onClose }) => {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    if (onClose) {
      onClose();
    }
  };

  return (
    show && (
      <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1050, bottom: '1rem', right: '1rem', maxWidth: '90vw', width: 'auto', }}>
        <div className="toast show bg-success text-white" role="alert" aria-live="assertive" aria-atomic="true">
          <div className="toast-header">
            <strong className="me-auto">Success</strong>
            <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
          </div>
          <div className="toast-body">
            {message}
          </div>
        </div>
      </div>
    )
  );
};

export default ToastNotification;
