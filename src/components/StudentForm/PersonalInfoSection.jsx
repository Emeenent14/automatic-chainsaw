import React from 'react';
import { countries } from '../../constants/countries';

const PersonalInfoSection = ({ formData, errors, handleChange, handleFileChange }) => {
  return (
    <div className="form-section">
          <h2>1. Personal Information</h2>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="surname">Surname*</label>
              <input
                type="text"
                id="surname"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                className={errors.surname ? 'error' : ''}
              />
              {errors.surname && <span className="error-text">{errors.surname}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="firstname">Firstname*</label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                className={errors.firstname ? 'error' : ''}
              />
              {errors.firstname && <span className="error-text">{errors.firstname}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="othername">Other Name</label>
              <input
                type="text"
                id="othername"
                name="othername"
                value={formData.othername}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group radio-group">
              <label>Sex*</label>
              <div className="radio-options">
                <label>
                  <input
                    type="radio"
                    name="sex"
                    value="Male"
                    checked={formData.sex === 'Male'}
                    onChange={handleChange}
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="sex"
                    value="Female"
                    checked={formData.sex === 'Female'}
                    onChange={handleChange}
                  />
                  Female
                </label>
                <label>
                  <input
                    type="radio"
                    name="sex"
                    value="Other"
                    checked={formData.sex === 'Other'}
                    onChange={handleChange}
                  />
                  Other
                </label>
              </div>
              {errors.sex && <span className="error-text">{errors.sex}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="dateOfBirth">Date of Birth*</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className={errors.dateOfBirth ? 'error' : ''}
              />
              {errors.dateOfBirth && <span className="error-text">{errors.dateOfBirth}</span>}
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email*</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number*</label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={errors.phoneNumber ? 'error' : ''}
              />
              {errors.phoneNumber && <span className="error-text">{errors.phoneNumber}</span>}
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="whatsappName">WhatsApp Name/Nickname (Optional)</label>
              <input
                type="text"
                id="whatsappName"
                name="whatsappName"
                value={formData.whatsappName}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="nationality">Nationality*</label>
              <select
                id="nationality"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                className={errors.nationality ? 'error' : ''}
              >
                <option value="">Select Nationality</option>
                {countries.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              {errors.nationality && <span className="error-text">{errors.nationality}</span>}
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="passport">Passport/Clear Image Upload* (JPG/PNG only)</label>
              <input
                type="file"
                id="passport"
                name="passport"
                accept=".jpg,.jpeg,.png"
                onChange={handleFileChange}
                className={errors.passport ? 'error' : ''}
              />
              {errors.passport && <span className="error-text">{errors.passport}</span>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="secondPhoneNumber">Phone Number 2</label>
              <input
                type="text"
                id="secondPhoneNumber"
                name="secondPhoneNumber"
                value={formData.secondPhoneNumber}
                onChange={handleChange}
                className={errors.secondPhoneNumber ? 'error' : ''}
              />
              {errors.secondPhoneNumber && <span className="error-text">{errors.secondPhoneNumber}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="maritalStatus">Marital Status*</label>
              <select
                id="maritalStatus"
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange}
                className={errors.maritalStatus ? 'error' : ''}
              >
                <option value="">Select Status</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
              </select>
              {errors.maritalStatus && <span className="error-text">{errors.maritalStatus}</span>}
            </div>
          </div>
        </div>
        
  );
};

export default PersonalInfoSection;