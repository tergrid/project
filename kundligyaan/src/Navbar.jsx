
import KundliGyaanLogo from "../src/assets/KundliGyaan_logo.png";



const Navbar = () => {
    return (
      <nav className="navbar">
        <div className="navbar-logo">
        
             
            <img src={KundliGyaanLogo} alt="KundliGyaan_logo_white"></img>
         
          <h1>Kundligyaan</h1>
        </div>
        <ul className="navbar-links">
         <div className="upperpanel">
         <li><a href="#free-kundli">Free Kundli</a></li>
          <li><a href="#kundli-matching">Kundli Matching</a></li>

          <div className="dropdown">
      <button className="dropdown-button">Horoscopes ▼</button>
      <ul className="dropdown-menu">
        <li><a href="#horoscope-2024">Horoscope 2024</a></li>
        <li><a href="#today">Today's Horoscope</a></li>
        <li><a href="#weekly">Weekly Horoscope</a></li>
        <li><a href="#monthly">Monthly Horoscope</a></li>
        <li><a href="#yearly">Yearly Horoscope</a></li>
        <li><a href="#daily">Daily Horoscope</a></li>
        <li><a href="#free-kundali">Free Kundali</a></li>
        <li><a href="#tomorrow">Tomorrow's Horoscope</a></li>
        <li><a href="#yesterday">Yesterday's Horoscope</a></li>
        <li><a href="#chinese">Chinese Horoscope</a></li>
      </ul>
    </div>
              
                 <button className="lang-switch">Eng ▼</button>
                 <button className="login-btn">Login</button>
         </div>
         
        <div className="downpanel">
        <li><a href="#chat">Chat with Astrologer</a></li>
          <li><a href="#talk">Talk to Astrologer</a></li>
          <li><a href="#pooja">Book a Pooja</a><span className="new-badge">New</span></li>
          <li><a href="#Kundimall">Kundimall</a></li>
          <li><a href="#store">KundliStore</a></li>
          <li><a href="#blog">Blog</a></li>
        </div>
        </ul>
        
      </nav>
    );
  };
export default Navbar;
