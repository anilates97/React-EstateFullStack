import "./Footer.css";

function Footer() {
  return (
    <section>
      <div className="paddings innerWidth flexCenter f-container">
        {/* Left Side */}

        <div className="flexColStart f-left">
          <img src="./logo2.png" alt="logo2" width={120} />

          <span className="secondaryText">
            Our vision is to make all people <br />
            the best place to live for them.
          </span>
        </div>

        {/* Right Side */}

        <div className="flexColStart f-right">
          <span className="primaryText">Information</span>
          <span className="secondaryText">Gebze/Kocaeli</span>

          <div className="flexCenter f-menu">
            <span>Property</span>
            <span>Services</span>
            <span>Product</span>
            <span>About Us</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
