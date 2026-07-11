import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link className="brand brand-dark" to="/">
          <strong>NNC</strong>
          <span>Business Solution</span>
        </Link>
        <nav className="nav nav-light" aria-label="Dieu huong chinh">
          <a href="/#tour">Start Tour</a>
          <a href="/#services">Demos</a>
          <a href="/#features">Features</a>
          <a href="/#contact">Contact</a>
        </nav>
        <a className="purchase-btn" href="/#contact">
          Purchase Now
        </a>
      </div>
    </header>
  );
}

export default Header;
