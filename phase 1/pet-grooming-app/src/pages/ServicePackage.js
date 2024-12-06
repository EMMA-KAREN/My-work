import React from 'react';

function ServicePackages() {
  return (
    <section className="services py-5">
    <div className="container">
      <h2 className="text-center mb-4">Our Grooming Services</h2>
      <div className="row">
        <div className="col-lg-4 col-md-6 mb-4">
          <div className="service-card p-4 border">
            <h4>Full Grooming</h4>
            <p>Includes bath, cut, nail trimming, and ear cleaning.</p>
            <button className="btn btn-primary">Learn More</button>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 mb-4">
          <div className="service-card p-4 border">
            <h4>Bath & Brush</h4>
            <p>A bath and brush session to keep your pet clean and shiny.</p>
            <button className="btn btn-primary">Learn More</button>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 mb-4">
          <div className="service-card p-4 border">
            <h4>Nail Trimming</h4>
            <p>Keep your pet’s paws healthy with a quick nail trim.</p>
            <button className="btn btn-primary">Learn More</button>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
}

export default ServicePackages;
