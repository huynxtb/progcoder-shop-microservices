import React, { useState } from 'react'
import { toast } from 'react-toastify';

const CommentFormSection = () => {
  const [name, setName] = useState('');

  const [email, setEmail] = useState('');

  const [comment, setComment] = useState('');
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !comment) {
      toast.error('Please fill out all fields.', { position: 'top-right' });
    } else if (!isValidEmail(email)) {
      toast.warning('Please provide a valid email address.', { position: 'top-right' });
    } else {

      // If the form is successfully submitted, show a success toast
      toast.success('Form submitted successfully!', { position: 'top-right' });
      setName('');
      setEmail('');
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
        <div className="row gx-4 gy-3">
            <div className="col-6 col-xxs-12">
                <label htmlFor="commenter-name">Name<span>*</span></label>
                <input 
                type="text" 
                name="commenter-name" 
                id="commenter-name" 
                placeholder="Type Your Name Here"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="col-6 col-xxs-12">
                <label htmlFor="commenter-email">Email<span>*</span></label>
                <input 
                type="email" 
                name="commenter-email" 
                id="commenter-email"
                placeholder="Type Your Email Here"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="col-12">
                <label htmlFor="commenter-comment">Comment<span>*</span></label>
                <textarea 
                name="commenter-comment" 
                id="commenter-comment" 
                placeholder="Type Your Comment Here"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                ></textarea>
            </div>
        </div>

        <button type="submit" className="fz-1-banner-btn fz-comment-form__btn">Post Comment</button>
    </form>
  )
}

export default CommentFormSection