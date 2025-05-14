import React from 'react';

const SuccessPopup = ({ submissionCode, closePopup }) => {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>Form Submitted Successfully!</h2>
        <p>Your CBRT verification code is:</p>
        <div className="submission-code">{submissionCode}</div>
        <p>Please save this code for future reference.</p>
        <button onClick={closePopup} className="close-button">Close</button>
      </div>
    </div>
  );
};

export default SuccessPopup;