export default function Home() {
  return (
    <main>
      <section className="home-hero">
        <div className="container">
          <div className="home-hero-content">
            <h6 style={{color:"#f0d071"}}>THE HEART OF HARMONY</h6>
            <h1>Align Your Space.</h1>
            <h1>Attract Your <span style={{color:"#f0d071"}}>Fortune.</span> </h1>
            <p>
              Feng Shui is the ancient Chinese art of arranging your environment to create balance, harmony, and prosperity. Our expert consultants will help you optimize your space to attract positive energy and abundance.
            </p>

            <a href="#consultation" className="feng-consultation-btn">
              Let's Connect
            </a>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="container">
          <h2>About Us</h2>
          <p>Your content goes here.</p>
        </div>
      </section>

      <section className="home-section" style={{backgroundColor:"#466039"}}>
        <div className="container">
          <img src="/木.png" alt="" />
        </div>
      </section>
    </main>
  );
}