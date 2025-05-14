import React from 'react';

const FormHeader = () => {
  return (
    <div className="header-section">
      <div className="logo-container">
        <img 
          src="/images/newunnlogo" 
          alt="University Logo"
          className="logo-image"
        />
      </div>
      <div className="title-container">
        <h1 className="form-title">Student Registration Form</h1>
        <div className="form-subtitle">
          Welcome to <span className="highlight">CBRT Student Verification</span> database
        </div>
        <p className="form-instruction">
          Please fill out the following fields carefully and honestly
        </p>
      </div>
    </div>
  );
};

export default FormHeader;