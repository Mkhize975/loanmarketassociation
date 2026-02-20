import React from 'react';

const Home = () => {
  return (
    <div>
      <section className="hero">
        <h1>Welcome to Loan Market Association!</h1>
        <p>Your trusted partner in finding the best loans.</p>
      </section>
      
      <section className="featured-destinations">
        <h2>Featured Destinations</h2>
        <ul>
          <li>Home Loans</li>
          <li>Personal Loans</li>
          <li>Business Loans</li>
        </ul>
      </section>
      
      <section className="testimonials">
        <h2>What Our Clients Say</h2>
        <blockquote>
          <p>"The service was exceptional! I found the best loan for my needs!" - Jane Doe</p>
        </blockquote>
        <blockquote>
          <p>"Highly recommend Loan Market Association for their professionalism!" - John Smith</p>
        </blockquote>
      </section>
      
      <section className="newsletter">
        <h2>Subscribe to Our Newsletter</h2>
        <form>
          <input type="email" placeholder="Enter your email" required />
          <button type="submit">Subscribe</button>
        </form>
      </section>
    </div>
  );
};

export default Home;
