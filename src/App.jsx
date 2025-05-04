import React, { useState } from 'react';
import axios from 'axios';
import './StudentForm.css';

const StudentForm = () => {
  // Form state
  const [formData, setFormData] = useState({
    surname: '',
    firstname: '',
    othername: '',
    sex: '',
    dateOfBirth: '',
    email: '',
    phoneNumber: '',
    whatsappName: '',
    nationality: '',
    passport: null,
    faculty: '',
    department: '',
    levelOfStudy: '',
    matricNumber: '',
    permanentAddress: '',
    accommodationType: '',
    residentialAddress: '',
    stateOfResidence: '',
    lgaOfResidence: '',
    guardianName: '',
    guardianPhoneNumber: '',
    religion: '',
    stateOfOrigin: '',
    localGovernment: '',
    skills: '',
    extracurricularActivities: ''
  });

  // Error state
  const [errors, setErrors] = useState({});
  // Submission status
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionCode, setSubmissionCode] = useState('');
  const [apiError, setApiError] = useState('');

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field if any
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      // Validate file type
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        setErrors({
          ...errors,
          passport: 'Only JPG and PNG files are allowed'
        });
        return;
      }
      
      setFormData({
        ...formData,
        passport: file
      });
      
      if (errors.passport) {
        setErrors({
          ...errors,
          passport: ''
        });
      }
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      'surname', 'firstname', 'sex', 'dateOfBirth', 'email', 
      'nationality', 'passport', 'faculty', 'department', 
      'levelOfStudy', 'matricNumber', 'permanentAddress', 
      'accommodationType', 'residentialAddress', 'stateOfResidence', 
      'lgaOfResidence', 'guardianName', 'guardianPhoneNumber',
      'religion', 'stateOfOrigin', 'localGovernment', 'extracurricularActivities'
    ];
    
    // Check required fields
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
      }
    });
    
    // Validate email format
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Validate phone number (digits only)
    if (formData.phoneNumber && !/^\d+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must contain only digits';
    }
    
    if (formData.guardianPhoneNumber && !/^\d+$/.test(formData.guardianPhoneNumber)) {
      newErrors.guardianPhoneNumber = 'Phone number must contain only digits';
    }
    
    // Validate matric number (must have at least 3 digits)
    if (formData.matricNumber && !/\d{3,}/.test(formData.matricNumber)) {
      newErrors.matricNumber = 'Matric number must contain at least 3 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      window.scrollTo(0, 0); // Scroll to top to show errors
      return;
    }
    
    setSubmitting(true);
    setApiError('');
    
    // Create form data for file upload
    const submitFormData = new FormData();
    
    // Append all form fields
    Object.keys(formData).forEach(key => {
      if (key === 'passport' && formData[key]) {
        submitFormData.append(key, formData[key]);
      } else if (formData[key] !== null && formData[key] !== undefined) {
        submitFormData.append(key, formData[key]);
      }
    });
    
    try {
      const response = await axios.post('/api/submit-form/', submitFormData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setSubmitted(true);
      setSubmissionCode(response.data.code);
      // Reset form
      setFormData({
        surname: '',
        firstname: '',
        othername: '',
        sex: '',
        dateOfBirth: '',
        email: '',
        phoneNumber: '',
        whatsappName: '',
        nationality: '',
        passport: null,
        faculty: '',
        department: '',
        levelOfStudy: '',
        matricNumber: '',
        permanentAddress: '',
        accommodationType: '',
        residentialAddress: '',
        stateOfResidence: '',
        lgaOfResidence: '',
        guardianName: '',
        guardianPhoneNumber: '',
        religion: '',
        stateOfOrigin: '',
        localGovernment: '',
        skills: '',
        extracurricularActivities: ''
      });
      
      // Reset file input
      document.getElementById('passport').value = '';
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setApiError(error.response?.data?.message || 'An error occurred while submitting the form. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Close popup
  const closePopup = () => {
    setSubmitted(false);
    setSubmissionCode('');
  };

  // List of countries for dropdown
  const countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"];

  return (
    <div className="student-form-container">
      <h1 className="form-title">Student Registration Form</h1>
      
      {apiError && (
        <div className="error-message api-error">
          {apiError}
        </div>
      )}
      
      {Object.keys(errors).length > 0 && (
        <div className="error-message">
          Please correct the errors below before submitting.
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        {/* Personal Information Section */}
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
        </div>
        
        {/* Academic Details Section */}
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
        </div>
        
        {/* Residential Info Section */}
        <div className="form-section">
          <h2>3. Residential Info</h2>
          
          <div className="form-row">
            <div className="form-group full-width">
              <label htmlFor="permanentAddress">Permanent Address*</label>
              <input
                type="text"
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
              <label htmlFor="residentialAddress">Residential Address*</label>
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
              <label htmlFor="stateOfResidence">State of Residence*</label>
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
              <label htmlFor="lgaOfResidence">Local Government of Residence*</label>
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
        
        {/* Guardian Information Section */}
        <div className="form-section">
          <h2>4. Guardian Information</h2>
          
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
        </div>
        
        {/* Others Section */}
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
        
        <div className="form-actions">
          <button type="submit" className="submit-button" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit Form'}
          </button>
        </div>
      </form>
      
      {/* Success Popup */}
      {submitted && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Form Submitted Successfully!</h2>
            <p>Your submission code is:</p>
            <div className="submission-code">{submissionCode}</div>
            <p>Please save this code for future reference.</p>
            <button onClick={closePopup} className="close-button">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentForm;