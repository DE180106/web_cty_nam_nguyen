function AboutPage() {
  return (
    <div className="page-shell">
      <section className="content-section">
        <p className="eyebrow">Gioi thieu</p>
        <h1>Vi sao NNC phu hop cho website doanh nghiep va landing page thuong mai</h1>
        <p className="lead">
          NNC tap trung vao website co muc tieu kinh doanh ro rang: the hien nang luc cong ty,
          dich vu, loi ich khach hang nhan duoc va do uy tin can co de chot khach hang tiem nang.
        </p>
      </section>

      <section className="cards-grid about-grid">
        <article className="info-card">
          <h3>Nang luc</h3>
          <p>Thiet ke website gioi thieu, landing page ban hang va he thong quan tri noi dung.</p>
        </article>
        <article className="info-card">
          <h3>Dinh huong</h3>
          <p>Giao dien sach, de hieu, dung tone thuong hieu va co kha nang mo rong du lieu.</p>
        </article>
        <article className="info-card">
          <h3>Gia tri</h3>
          <p>Website hoat dong on dinh, de ban giao, de cap nhat va phu hop trien khai thuc te.</p>
        </article>
      </section>
    </div>
  );
}

export default AboutPage;
