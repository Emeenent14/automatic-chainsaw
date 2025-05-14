import { useState } from 'react';
import axios from 'axios';
import { countries } from '../constants/countries';

const useStudentForm = () => {
  // Initial form state
  const initialFormState = {
    surname: '',
    firstname: '',
    othername: '',
    sex: '',
    dateOfBirth: '',
    email: '',
    phoneNumber: '',
    secondPhoneNumber: '',
    whatsappName: '',
    nationality: '',
    passport: null,
    faculty: '',
    department: '',
    levelOfStudy: '',
    matricNumber: '',
    modeOfEntry: '',
    jambRegNumber: '',
    permanentAddress: '',
    accommodationType: '',
    residentialAddress: '',
    stateOfResidence: '',
    lgaOfResidence: '',
    guardianName: '',
    guardianPhoneNumber: '',
    nextOfKinName: '',
    nextOfKinPhone: '',
    nextOfKinRelationship: '',
    maritalStatus: '',
    religion: '',
    stateOfOrigin: '',
    localGovernment: '',
    skills: '',
    extracurricularActivities: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionCode, setSubmissionCode] = useState('');
  const [apiError, setApiError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
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

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      'surname', 'firstname', 'sex', 'dateOfBirth', 'email', 
      'phoneNumber', 'nationality', 'passport', 'faculty', 
      'department', 'levelOfStudy', 'matricNumber', 'modeOfEntry',
      'permanentAddress', 'accommodationType', 'residentialAddress', 
      'stateOfResidence', 'lgaOfResidence', 'guardianName', 
      'guardianPhoneNumber', 'nextOfKinName', 'nextOfKinPhone',
      'nextOfKinRelationship', 'maritalStatus', 'religion', 
      'stateOfOrigin', 'localGovernment', 'extracurricularActivities',
      'secondPhoneNumber','jambRegNumber'
    ];

    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
      }
    });
    
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (formData.phoneNumber && !/^\d+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must contain only digits';
    }

    if (formData.secondPhoneNumber && !/^\d+$/.test(formData.secondPhoneNumber)) {
      newErrors.secondPhoneNumber = 'Phone number must contain only digits';
    }

    if (formData.guardianPhoneNumber && !/^\d+$/.test(formData.guardianPhoneNumber)) {
      newErrors.guardianPhoneNumber = 'Phone number must contain only digits';
    }

    if (formData.nextOfKinPhone && !/^\d+$/.test(formData.nextOfKinPhone)) {
      newErrors.nextOfKinPhone = 'Phone number must contain only digits';
    }

    if (formData.matricNumber && !/\d{3,}/.test(formData.matricNumber)) {
      newErrors.matricNumber = 'Matric number must contain at least 3 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const camelToSnakeCase = (str) => {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      window.scrollTo(0, 0);
      return;
    }
    
    setSubmitting(true);
    setApiError('');
    
    const submitFormData = new FormData();
    
    Object.keys(formData).forEach(key => {
      const snakeCaseKey = camelToSnakeCase(key);
      if (key === 'passport' && formData[key]) {
        submitFormData.append(snakeCaseKey, formData[key]);
      } else if (formData[key] !== null && formData[key] !== undefined) {
        submitFormData.append(snakeCaseKey, formData[key]);
      }
    });
    
    try {
      const response = await axios.post('https://automatic-chainsaw-backend.onrender.com/api/submit-form/', submitFormData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setSubmitted(true);
      setSubmissionCode(response.data.code);
      setFormData(initialFormState);
      document.getElementById('passport').value = '';
      
    } catch (error) {
      console.error('Error submitting form:', error);
      
      if (error.response?.data?.errors) {
        const backendErrors = error.response.data.errors;
        const formattedErrors = {};
        
        Object.keys(backendErrors).forEach(key => {
          const camelCaseKey = key.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
          formattedErrors[camelCaseKey] = backendErrors[key][0];
        });
        
        setErrors(formattedErrors);
        setApiError('Please correct the errors below and try again.');
      } else {
        setApiError(error.response?.data?.message || 'An error occurred while submitting the form. Please try again.');
        window.scrollTo(0, 0);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const closePopup = () => {
    setSubmitted(false);
    setSubmissionCode('');
  };

  return {
    formData,
    errors,
    submitting,
    submitted,
    submissionCode,
    apiError,
    handleChange,
    handleFileChange,
    handleSubmit,
    closePopup,
    countries
  };
};

export default useStudentForm;