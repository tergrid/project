import '../styles/MainSection.css';
import Baba from "../src/assets/baba.webp";
import ChatAstro from "../src/assets/chatwithastro.png";
import CallAstro from "../src/assets/callwithastro.png";
import Shop from "../src/assets/shop.png";
import Puja from "../src/assets/puja.jpg";

function MainSection() {
  return (
    <div className="container-main">
      {/* Upper Section */}
      <div className="upper">
        <div className="left">
          <img src={Baba} alt="Astrologer Baba" />
        </div>
        <div className="right">
          <h3>200+ Celebs recommend KundliGyaan</h3>
          <h1>Chat With Astrologer</h1>
          <button>Chat Now</button>
        </div>
      </div>

      {/* Lower Section */}
      <div className="lower">
        <div className="grid">
          {/* Grid Item 1 */}
          <button>
            <div className="grid1" id="grid1">
              <img src={ChatAstro} alt="Chat with Astrologer" />
              <a href="#">Chat With Astrologer</a>
            </div>
          </button>

          {/* Grid Item 2 */}
          <button>
            <div className="grid2" id="grid2">
              <img src={CallAstro} alt="Call with Astrologer" />
              <a href="#">Talk With Astrologer</a>
            </div>
          </button>

          {/* Grid Item 3 */}
          <button>
            <div className="grid3" id="grid3">
              <img src={Shop} alt="Shop" />
              <a href="#">Shop</a>
            </div>
          </button>

          {/* Grid Item 4 */}
          <button>
            <div className="grid4" id="grid4">
              <img src={Puja} alt="Book a Puja" />
              <a href="#">Book a Puja</a>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainSection;
