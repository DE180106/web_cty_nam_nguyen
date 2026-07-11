function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner site-footer-ecom" id="footer-contact">
        <section className="footer-brand-block">
          <div className="brand brand-ecom footer-brand">
            <span className="brand-mark">NN</span>
            <span className="brand-copy">
              <strong>NAM NGUYEN</strong>
              <span>TECHNOLOGY</span>
            </span>
          </div>
          <p>
            Chuyen cung cap laptop chinh hang, gaming cao cap voi gia tot nhat thi truong.
            Bao hanh uy tin, giao hang nhanh toan quoc.
          </p>
          <ul>
            <li>123 Nguyen Hue, Q1, TP.HCM</li>
            <li>1800 6868</li>
            <li>sales@namnguyen.vn</li>
            <li>7:30 - 22:00 hang ngay</li>
          </ul>
        </section>

        <section className="footer-links-block">
          <h3>Danh muc san pham</h3>
          <a href="/#featured-products">Laptop Gaming</a>
          <a href="/#categories">Laptop Van phong</a>
          <a href="/#featured-products">Laptop Do hoa</a>
          <a href="/#featured-products">MacBook</a>
          <a href="/#newsletter">Phu kien</a>
          <a href="/#newsletter">Flash Sale</a>
        </section>

        <section className="footer-links-block">
          <h3>Chinh sach & ho tro</h3>
          <a href="/#newsletter">Chinh sach bao hanh</a>
          <a href="/#newsletter">Chinh sach doi tra</a>
          <a href="/#newsletter">Chinh sach van chuyen</a>
          <a href="/#newsletter">Chinh sach tra gop</a>
          <a href="/#newsletter">Dieu khoan su dung</a>
          <a href="/#newsletter">Cau hoi thuong gap</a>
        </section>

        <section className="footer-map-block">
          <h3>Tim showroom</h3>
          <div className="footer-map-card">
            <strong>123 Nguyen Hue, Quan 1</strong>
            <span>TP. Ho Chi Minh</span>
            <a href="https://maps.google.com" target="_blank" rel="noreferrer">
              Xem ban do
            </a>
          </div>
          <div className="footer-hotline-card">
            <p>HOTLINE MIEN PHI 24/7</p>
            <strong>1800 6868</strong>
            <span>Chat voi tu van vien ngay</span>
          </div>
        </section>
      </div>

      <div className="site-footer-bottom">
        <p>© 2026 Nam Nguyen Technology. Tat ca quyen duoc bao luu.</p>
        <span>DKKD: 0102030405</span>
      </div>
    </footer>
  );
}

export default Footer;
