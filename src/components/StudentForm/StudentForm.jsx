import React from 'react';
import useStudentForm from '../../Hooks/useStudentForm';
import FormHeader from './FormHeader';
import PersonalInfoSection from './PersonalInfoSection';
import AcademicSection from './AcademicSection';
import ResidentialSection from './ResidentialSection';
import GuardianSection from './GuardianSection';
import OthersSection from './OthersSection';
import SuccessPopup from './SuccessPopup';
import FormFooter from './FormFooter';

const StudentForm = () => {
  const {
    formData,
    errors,
    submitting,
    submitted,
    submissionCode,
    apiError,
    handleChange,
    handleFileChange,
    handleSubmit,
    closePopup
  } = useStudentForm();

  return (
    <div className="student-form-container">
      <FormHeader />
      
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
        <PersonalInfoSection 
          formData={formData} 
          errors={errors} 
          handleChange={handleChange} 
          handleFileChange={handleFileChange} 
        />
        
        <AcademicSection 
          formData={formData} 
          errors={errors} 
          handleChange={handleChange} 
        />
        
        <ResidentialSection 
          formData={formData} 
          errors={errors} 
          handleChange={handleChange} 
        />
        
        <GuardianSection 
          formData={formData} 
          errors={errors} 
          handleChange={handleChange} 
        />
        
        <OthersSection 
          formData={formData} 
          errors={errors} 
          handleChange={handleChange} 
        />
        
        <div className="form-actions">
          <button type="submit" className="submit-button" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit Form'}
          </button>
        </div>
      </form>
      
      {submitted && (
        <SuccessPopup 
          submissionCode={submissionCode} 
          closePopup={closePopup} 
        />
      )}

      <FormFooter />
    </div>
  );
};

export default StudentForm;