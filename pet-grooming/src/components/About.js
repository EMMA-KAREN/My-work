import React from 'react';

function About() {
  return (
    <div id='container' style={{ textAlign: "center", justifyContent: "center", display: "flex" }}>
      <div style={{ textAlign: "center", width: "80vw" }}>
        <h2 className="abouth2"><strong>Welcome to Our Pet Grooming System</strong></h2>
        <p className='aboutp'>
          Our Pet Grooming System is designed to make grooming appointments seamless for both pet owners and professional groomers. We understand how important it is to keep your furry friends looking and feeling their best, and our platform provides an easy way to manage grooming schedules, communicate with groomers, and share your experiences.
        </p>

        <h2 className="abouth2"><strong>Features for Pet Owners</strong></h2>
        <p className='aboutp'>
          Pet owners can create, update, and manage grooming appointments with ease. With just a few clicks, you can select a groomer, specify your preferred date and time, and provide the grooming location. You can also leave reviews and comments about your experience, which will be visible on our homepage to help others make informed decisions. Additionally, you can request grooming tips and product recommendations tailored to your pet’s specific needs.
        </p>

        <h2 className="abouth2"><strong>Features for Groomers</strong></h2>
        <p className='aboutp'>
          Groomers benefit from a streamlined notification system. Once a pet owner books an appointment, the groomer receives instant notifications in their profile. Groomers can confirm the appointment and provide details about their arrival time and the service location. This ensures clear communication between groomers and pet owners, fostering a professional and reliable service experience.
        </p>

        <h2 className="abouth2"><strong>Why Choose Our System?</strong></h2>
        <p className='aboutp'>
          Our system centralizes all your grooming needs in one place. Say goodbye to juggling phone calls, texts, and scattered notes. Whether you’re a pet owner looking to keep your pet well-groomed or a groomer managing multiple clients, our platform simplifies the process with easy access to bookings, reminders, and feedback.
        </p>

        <h2 className="abouth2"><strong>Enhanced Productivity and Communication</strong></h2>
        <p className='aboutp'>
          With our intuitive interface, both pet owners and groomers can maximize their time and focus on what truly matters—providing top-quality grooming services. Pet owners can plan ahead, while groomers can efficiently manage their schedules, reducing missed appointments and last-minute changes. 
        </p>

        <h2 className="abouth2"><strong>Conclusion</strong></h2>
        <p className='aboutp'>
          In conclusion, our Pet Grooming System is more than just a booking platform—it's a comprehensive solution for ensuring your pet gets the care they deserve. Join us today and experience the ease of managing your grooming needs in one place.
        </p>
      </div>
    </div>
  );
}

export default About;
