import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <Link className="brand" to="/">
        <strong>NNC</strong>
        <span>Website thương mại và phần mềm cho doanh nghiệp</span>
      </Link>
      <nav className="nav" aria-label="Điều hướng chính">
        <a href="#services">Dịch vụ</a>
        <a href="#projects">Dự án</a>
        <a href="#contact">Liên hệ</a>
      </nav>
    </header>
  );
}

export default Header;
