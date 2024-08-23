import React, { useState } from 'react';
import './ContactUs.css';

const ContactUs = () => {
  const [name, setName] = useState('');
  const [query, setQuery] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Name validation: First letter must be capital, and at least 2 letters
    const nameRegex = /^[A-Z][a-zA-Z]{1,}$/;
    if (!nameRegex.test(name)) {
      alert('Name must start with a capital letter and contain at least 2 letters.');
      return;
    }

    // Query validation: At least 10 characters
    if (query.length < 10) {
      alert('Query must contain at least 10 characters.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, query }),
      });

      if (response.ok) {
        alert('Query submitted successfully!');
        setName('');
        setQuery('');
      } else {
        alert('Failed to submit query');
      }
    } catch (error) {
      alert('An error occurred while submitting your query.');
    }
  };

  return (
    <div className="bg-gray-100 py-10">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold mb-6 text-center text-blue-600">Contact Us</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="query">
              Query
            </label>
            <textarea
              id="query"
              placeholder="Enter your query"
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </div>
        </form>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-600">Main Office</h2>
          <p className="text-gray-700 mb-4">
            Raintree Marg, near Bharati Vidyapeeth,<br />Sector 7, CBD Belapur, Navi Mumbai, Maharashtra 400614
          </p>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.8596674030223!2d73.05167127596458!3d19.025904453541877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c24cce39457b%3A0x8bd69eab297890b0!2sCentre%20for%20Development%20of%20Advanced%20Computing%20(CDAC)!5e0!3m2!1sen!2sin!4v1716025018300!5m2!1sen!2sin"
              width="100%"
              height="300"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;