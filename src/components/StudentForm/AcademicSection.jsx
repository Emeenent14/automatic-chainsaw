import React from 'react';

const AcademicSection = ({ formData, errors, handleChange }) => {
  return (
    <div className="form-section">
    <h2>2. Academic Details</h2>
    
    <div className="form-row">
      <div className="form-group">
        <label htmlFor="faculty">Faculty*</label>
        <input
          type="text"
          id="faculty"
          name="faculty"
          value={formData.faculty}
          onChange={handleChange}
          className={errors.faculty ? 'error' : ''}
        />
        {errors.faculty && <span className="error-text">{errors.faculty}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="department">Department*</label>
        <input
          type="text"
          id="department"
          name="department"
          value={formData.department}
          onChange={handleChange}
          className={errors.department ? 'error' : ''}
        />
        {errors.department && <span className="error-text">{errors.department}</span>}
      </div>
    </div>
    
    <div className="form-row">
      <div className="form-group">
        <label htmlFor="levelOfStudy">Level of Study*</label>
        <select
          id="levelOfStudy"
          name="levelOfStudy"
          value={formData.levelOfStudy}
          onChange={handleChange}
          className={errors.levelOfStudy ? 'error' : ''}
        >
          <option value="">Select Level</option>
          <option value="100 Level">100 Level</option>
          <option value="200 Level">200 Level</option>
          <option value="300 Level">300 Level</option>
          <option value="400 Level">400 Level</option>
          <option value="500 Level">500 Level</option>
          <option value="600 Level">600 Level</option>
        </select>
        {errors.levelOfStudy && <span className="error-text">{errors.levelOfStudy}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="matricNumber">Matric Number*</label>
        <input
          type="text"
          id="matricNumber"
          name="matricNumber"
          value={formData.matricNumber}
          onChange={handleChange}
          className={errors.matricNumber ? 'error' : ''}
        />
        {errors.matricNumber && <span className="error-text">{errors.matricNumber}</span>}
      </div>
    </div>
    <div className="form-row">
      <div className="form-group">
        <label htmlFor="modeOfEntry">Mode of Entry*</label>
        <select
          id="modeOfEntry"
          name="modeOfEntry"
          value={formData.modeOfEntry}
          onChange={handleChange}
          className={errors.modeOfEntry ? 'error' : ''}
        >
          <option value="">Select Mode</option>
          <option value="UTME">UTME</option>
          <option value="Direct Entry">Direct Entry</option>
          <option value="Transfer">Transfer</option>
        </select>
        {errors.modeOfEntry && <span className="error-text">{errors.modeOfEntry}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="jambRegNumber">JAMB Registration Number</label>
        <input
          type="text"
          id="jambRegNumber"
          name="jambRegNumber"
          value={formData.jambRegNumber}
          onChange={handleChange}
        />
      </div>
    </div>
  </div>
  );
};

export default AcademicSection;