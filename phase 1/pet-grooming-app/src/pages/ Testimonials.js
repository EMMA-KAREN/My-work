import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Testimonials() {
  return (
    <section className="testimonials bg-light py-5">
      <div className="container">
        <h2 className="text-center mb-4">What Our Customers Are Saying</h2>
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="testimonial-card p-4 border">
              <p>"The grooming service was amazing! My dog looked so happy and fresh!"</p>
              <strong>- Jane Doe</strong>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="testimonial-card p-4 border">
              <p>"Great service! The groomers really know how to handle pets with care."</p>
              <strong>- John Smith</strong>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="testimonial-card p-4 border">
              <p>"I’m so happy with the results! Highly recommend their grooming services."</p>
              <strong>- Sarah Lee</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
