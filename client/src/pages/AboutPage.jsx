function AboutPage() {
  return (
    <div className="page-shell">
      <section className="content-section">
        <p className="eyebrow">Giới thiệu</p>
        <h1>Vì sao NNC phù hợp cho website thương mại</h1>
        <p className="lead">
          NNC tập trung vào website có mục tiêu kinh doanh rõ ràng: thể hiện năng lực doanh
          nghiệp, tăng độ tin cậy và tối ưu chuyển đổi từ khách truy cập thành khách hàng tiềm năng.
        </p>
      </section>

      <section className="cards-grid about-grid">
        <article className="info-card">
          <h3>Năng lực</h3>
          <p>Thiết kế web giới thiệu, landing page bán hàng và hệ thống quản trị nội dung.</p>
        </article>
        <article className="info-card">
          <h3>Định hướng</h3>
          <p>Giao diện sạch, dễ hiểu, đúng tone thương hiệu và có khả năng mở rộng dữ liệu.</p>
        </article>
        <article className="info-card">
          <h3>Giá trị</h3>
          <p>Website hoạt động ổn định, dễ bàn giao, dễ cập nhật và phù hợp triển khai thực tế.</p>
        </article>
      </section>
    </div>
  );
}

export default AboutPage;
