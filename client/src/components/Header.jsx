import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link className="brand brand-dark" to="/">
          <strong>NNC</strong>
          <span>Business Solution</span>
        </Link>
        <nav className="nav nav-light" aria-label="Điều hướng chính">
          <Link to="/">Start Tour</Link>
          <Link to="/dich-vu">Demos</Link>
          <Link to="/gioi-thieu">Features</Link>
          <a href="#contact">Contact</a>
        </nav>
        <a className="purchase-btn" href="#contact">
          Purchase Now
        </a>
      </div>
    </header>
  );
}

export default Header;
