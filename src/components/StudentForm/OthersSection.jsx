import React from 'react';

const OthersSection = ({ formData, errors, handleChange }) => {
  return (
    <div className="form-section">
          <h2>5. Others</h2>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="religion">Religion*</label>
              <select
                id="religion"
                name="religion"
                value={formData.religion}
                onChange={handleChange}
                className={errors.religion ? 'error' : ''}
              >
                <option value="">Select Religion</option>
                <option value="Christian">Christian</option>
                <option value="Muslim">Muslim</option>
                <option value="Traditional">Traditional</option>
                <option value="Others">Others</option>
              </select>
              {errors.religion && <span className="error-text">{errors.religion}</span>}
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="stateOfOrigin">State of Origin*</label>
              <input
                type="text"
                id="stateOfOrigin"
                name="stateOfOrigin"
                value={formData.stateOfOrigin}
                onChange={handleChange}
                className={errors.stateOfOrigin ? 'error' : ''}
              />
              {errors.stateOfOrigin && <span className="error-text">{errors.stateOfOrigin}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="localGovernment">Local Government*</label>
              <input
                type="text"
                id="localGovernment"
                name="localGovernment"
                value={formData.localGovernment}
                onChange={handleChange}
                className={errors.localGovernment ? 'error' : ''}
              />
              {errors.localGovernment && <span className="error-text">{errors.localGovernment}</span>}
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group full-width">
              <label htmlFor="skills">Do you possess any skills or vocational training? (Optional)</label>
              <textarea
                id="skills"
                placeholder='eg. programming, graphic design, hairstylist'
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                rows="3"
              ></textarea>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group full-width">
              <label htmlFor="extracurricularActivities">Recreational & Extracurricular Activities*</label>
              <textarea
                id="extracurricularActivities"
                placeholder='eg. football, dancing, basketball'
                name="extracurricularActivities"
                value={formData.extracurricularActivities}
                onChange={handleChange}
                className={errors.extracurricularActivities ? 'error' : ''}
                rows="3"
              ></textarea>
              {errors.extracurricularActivities && <span className="error-text">{errors.extracurricularActivities}</span>}
            </div>
          </div>
        </div>
  );
};

export default OthersSection;