import React, { useState } from 'react';

const RequestGroomingTips = () => {
  const [request, setRequest] = useState('');
  const [response, setResponse] = useState('');

  const handleChange = (e) => {
    setRequest(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate response fetching from the server (this can be replaced with an actual API call)
    setResponse(`Here is a grooming tip based on your request: ${request}`);
  };

  return (
    <div>
      <h2>Request Grooming Tips</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Describe your request or ask a question</label>
          <textarea
            name="request"
            value={request}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit">Submit Request</button>
      </form>
      {response && <p>{response}</p>}
    </div>
  );
};

export default RequestGroomingTips;
