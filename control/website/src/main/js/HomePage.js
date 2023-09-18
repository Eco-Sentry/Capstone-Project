import React from 'react';

//my functional component using the arrow function syntax
const HomePage = () => {
  return (
    <div className="homepage">

      <header className="header">
        <h1>Welcome to EcoSentry</h1>
        <p>Monitoring and Protecting the Environment</p>
      </header>

      <section className="features">
        <div className="feature">
          <h2>Real-Time Data</h2>
          <p>Access accurate and up-to-date environmental information</p>
        </div>

        <div className="feature">
          <h2>Customizable Stations</h2>
          <p>Create and deploy EcoSentry stations tailored to your needs</p>
        </div>

        <div className="feature">
          <h2>Global Network</h2>
          <p>Join a worldwide network of enthusiasts and researchers</p>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
