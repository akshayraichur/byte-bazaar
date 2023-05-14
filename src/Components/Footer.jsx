const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-company">
        <h2 className="footer-company-name">Byte Bazaar</h2>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque provident nobis asperiores hic repellat
          ab, laboriosam fugit est dolorum debitis nisi.
        </p>
        <p>Belagavi, Karnataka, India.</p>
      </div>
      <div className="footer-company-details">
        <h2 className="footer-company-name">Company</h2>
        <p className="footer-company-details-text">About us</p>
        <p className="footer-company-details-text">Careers</p>
      </div>
      <div className="footer-company-details">
        <h2 className="footer-company-name">Social</h2>
        <div>
          <a
            className="footer-company-details-text"
            href="https://www.linkedin.com/in/akshay-raichur"
            target="_blank"
            rel="noreferrer"
          >
            Linkedin
          </a>
        </div>
        <div>
          <a
            className="footer-company-details-text"
            href="https://github.com/akshayraichur"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
        <div>
          <a
            className="footer-company-details-text"
            href="https://twitter.com/akshayvraichur"
            target="_blank"
            rel="noreferrer"
          >
            Twitter
          </a>
        </div>
        <div>
          <a
            className="footer-company-details-text"
            href="https://instagram.com/akshay.raichur"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
