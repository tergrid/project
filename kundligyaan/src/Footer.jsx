const Footer = () => {
    return (
      <footer>
        <div className="foot-pane1">
          <h2>Join Our Community</h2>
          <br />
          <form className="subscribe-form">
            <input type="email" placeholder="Enter Your Email..." required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
  
        <div className="footer-content">
          <div className="footer-section about">
            <h3>Kundli Gyaan</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur. Nullam et integer quis nibh
              eros. Morbi egestas at pulvinar urna nec malesuada sem.
            </p>
          </div>
          <div className="footer-section links">
            <h3>Useful Links</h3>
            <ul>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Features</a>
              </li>
              <li>
                <a href="#">Our Career</a>
              </li>
              <li>
                <a href="#">Works</a>
              </li>
            </ul>
          </div>
          <div className="footer-section contact">
            <h3>Contact</h3>
            <p>
              <i className="fas fa-phone"></i> +91 92664 79055
            </p>
            <p>
              <i className="fas fa-envelope"></i> care@kundligyaan.com
            </p>
            <p>
              <i className="fas fa-map-marker-alt"></i> GF-36, HOTMART, The
              Aranya, Sector 119, Noida
            </p>
          </div>
          <div className="footer-section blog">
            <h3>Blog</h3>
            <p>
              Be the first to get the latest posts from our innovation teams and
              from us.
            </p>
          </div>
        </div>
  
        <div className="footer-bottom">
          <div className="social-icons">
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#">
              <i className="fab fa-whatsapp"></i>
            </a>
          </div>
          <div className="copyright-line">
            <a href="#">@2024 KundaliGyaan All Rights Reserved</a>
            <a href="#">Terms</a>
            <a href="#">Privacy Policy</a>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  