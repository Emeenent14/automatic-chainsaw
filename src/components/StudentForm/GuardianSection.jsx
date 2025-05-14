import React from 'react';

const GuardianSection = ({ formData, errors, handleChange }) => {
  return (
    <div className="form-section">
          <h2>4. Guardian Information/Next of Kin</h2>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="guardianName">Guardian Name*</label>
              <input
                type="text"
                id="guardianName"
                name="guardianName"
                value={formData.guardianName}
                onChange={handleChange}
                className={errors.guardianName ? 'error' : ''}
              />
              {errors.guardianName && <span className="error-text">{errors.guardianName}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="guardianPhoneNumber">Guardian Phone Number*</label>
              <input
                type="text"
                id="guardianPhoneNumber"
                name="guardianPhoneNumber"
                value={formData.guardianPhoneNumber}
                onChange={handleChange}
                className={errors.guardianPhoneNumber ? 'error' : ''}
              />
              {errors.guardianPhoneNumber && <span className="error-text">{errors.guardianPhoneNumber}</span>}
            </div>
          </div>
            <div className="form-row">
            <div className="form-group">
              <label htmlFor="nextOfKinName">Next of Kin Name*</label>
              <input
                type="text"
                id="nextOfKinName"
                name="nextOfKinName"
                value={formData.nextOfKinName}
                onChange={handleChange}
                className={errors.nextOfKinName ? 'error' : ''}
              />
              {errors.nextOfKinName && <span className="error-text">{errors.nextOfKinName}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="nextOfKinPhone">Next of Kin Phone Number*</label>
              <input
                type="text"
                id="nextOfKinPhone"
                name="nextOfKinPhone"
                value={formData.nextOfKinPhone}
                onChange={handleChange}
                className={errors.nextOfKinPhone ? 'error' : ''}
              />
              {errors.nextOfKinPhone && <span className="error-text">{errors.nextOfKinPhone}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nextOfKinRelationship">Next of Kin Relationship*</label>
              <input
                type="text"
                id="nextOfKinRelationship"
                name="nextOfKinRelationship"
                value={formData.nextOfKinRelationship}
                onChange={handleChange}
                className={errors.nextOfKinRelationship ? 'error' : ''}
              />
              {errors.nextOfKinRelationship && <span className="error-text">{errors.nextOfKinRelationship}</span>}
            </div>
          </div>
        </div>
  );
};

export default GuardianSection;