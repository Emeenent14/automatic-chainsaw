import React from 'react';

const ResidentialSection = ({ formData, errors, handleChange }) => {
  return (
    <div className="form-section">
    <h2>3. Residential Info</h2>
    
    <div className="form-row">
      <div className="form-group full-width">
        <label htmlFor="permanentAddress">Permanent Address (home)*</label>
        <input
          type="text"
          placeholder='No. 12 Arena street'
          id="permanentAddress"
          name="permanentAddress"
          value={formData.permanentAddress}
          onChange={handleChange}
          className={errors.permanentAddress ? 'error' : ''}
        />
        {errors.permanentAddress && <span className="error-text">{errors.permanentAddress}</span>}
      </div>
    </div>
    
    <div className="form-row">
      <div className="form-group radio-group">
        <label>Accommodation Type*</label>
        <div className="radio-options">
          <label>
            <input
              type="radio"
              name="accommodationType"
              value="Off Campus"
              checked={formData.accommodationType === 'Off Campus'}
              onChange={handleChange}
            />
            Off Campus
          </label>
          <label>
            <input
              type="radio"
              name="accommodationType"
              value="Hostel"
              checked={formData.accommodationType === 'Hostel'}
              onChange={handleChange}
            />
            Hostel
          </label>
        </div>
        {errors.accommodationType && <span className="error-text">{errors.accommodationType}</span>}
      </div>
    </div>
    
    <div className="form-row">
      <div className="form-group full-width">
        <label htmlFor="residentialAddress">Residential Address (Off-Campus/Hostel address)*</label>
        <input
          type="text"
          id="residentialAddress"
          name="residentialAddress"
          value={formData.residentialAddress}
          onChange={handleChange}
          className={errors.residentialAddress ? 'error' : ''}
        />
        {errors.residentialAddress && <span className="error-text">{errors.residentialAddress}</span>}
      </div>
    </div>
    
    <div className="form-row">
      <div className="form-group">
        <label htmlFor="stateOfResidence">State of Residence (home)*</label>
        <input
          type="text"
          id="stateOfResidence"
          name="stateOfResidence"
          value={formData.stateOfResidence}
          onChange={handleChange}
          className={errors.stateOfResidence ? 'error' : ''}
        />
        {errors.stateOfResidence && <span className="error-text">{errors.stateOfResidence}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="lgaOfResidence">Local Government of Residence (home)*</label>
        <input
          type="text"
          id="lgaOfResidence"
          name="lgaOfResidence"
          value={formData.lgaOfResidence}
          onChange={handleChange}
          className={errors.lgaOfResidence ? 'error' : ''}
        />
        {errors.lgaOfResidence && <span className="error-text">{errors.lgaOfResidence}</span>}
      </div>
    </div>
  </div>
  
  );
};

export default ResidentialSection;