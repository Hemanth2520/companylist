import { FiTwitter, FiLinkedin, FiMail, FiGlobe } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <div className="footer__brand-logo">CompanyList</div>
            <p className="footer__brand-desc">
              A transparent and user-friendly online platform that connects businesses,
              investors, franchises, and M&A advisors globally. Discover your next
              great investment opportunity.
            </p>
            <div className="footer__social">
              <button className="footer__social-btn" aria-label="Twitter"><FiTwitter /></button>
              <button className="footer__social-btn" aria-label="LinkedIn"><FiLinkedin /></button>
              <button className="footer__social-btn" aria-label="Website"><FiGlobe /></button>
              <button className="footer__social-btn" aria-label="Email"><FiMail /></button>
            </div>
          </div>

          <div>
            <p className="footer__col-title">Businesses</p>
            <div className="footer__links">
              <span className="footer__link">Businesses for Sale</span>
              <span className="footer__link">Investment Opportunities</span>
              <span className="footer__link">Franchise Opportunities</span>
              <span className="footer__link">Distressed Assets</span>
            </div>
          </div>

          <div>
            <p className="footer__col-title">Advisors</p>
            <div className="footer__links">
              <span className="footer__link">Investment Banks</span>
              <span className="footer__link">Business Brokers</span>
              <span className="footer__link">M&A Consultants</span>
              <span className="footer__link">Legal Advisors</span>
            </div>
          </div>

          <div>
            <p className="footer__col-title">Legal</p>
            <div className="footer__links">
              <span className="footer__link">Privacy Policy</span>
              <span className="footer__link">Terms of Use</span>
              <span className="footer__link">Refund Policy</span>
              <span className="footer__link">Contact Us</span>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          © 2024 CompanyList Online Services Private Limited. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
