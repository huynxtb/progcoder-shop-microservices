import React, { useState } from 'react';
import { toast } from 'react-toastify';

const ContactFormSection = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [comment, setComment] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !phoneNumber || !comment) {
      toast.error('Please fill out all fields.', { position: 'top-right' });
    } else if (!isValidEmail(email)) {
      toast.warning('Please provide a valid email address.', { position: 'top-right' });
    } else {

      // If the form is successfully submitted, show a success toast
      toast.success('Form submitted successfully!', { position: 'top-right' });
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhoneNumber('');
      setComment('');
    }
  };

  const isValidEmail = (email) => {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <form action="#" onSubmit={handleFormSubmit}>
      <div className="row g-xl-4 g-3">
        <div className="col-6 col-xxs-12">
          <input
            type="text"
            name="commenter-first-name"
            id="commenter-first-name"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="col-6 col-xxs-12">
          <input
            type="text"
            name="commenter-last-name"
            id="commenter-last-name"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="col-6 col-xxs-12">
          <input
            type="email"
            name="commenter-email"
            id="commenter-email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="col-6 col-xxs-12">
          <input
            type="number"
            name="commenter-number"
            id="commenter-number"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="col-12">
          <textarea
            name="commenter-comment"
            id="commenter-comment"
            placeholder="Your Message"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>
      </div>

      <button type="submit" className="fz-1-banner-btn fz-comment-form__btn">
        Send Message
      </button>
    </form>
  );
};

export default ContactFormSection;
