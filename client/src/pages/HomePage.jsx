import { useEffect, useState } from "react";
import api from "../services/api";

const initialState = {
  company: null,
  services: [],
  projects: [],
  testimonials: [],
  contacts: [],
  stats: []
};

function HomePage() {
  const [content, setContent] = useState(initialState);
  const [status, setStatus] = useState("Đang tải dữ liệu thương mại...");

  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await api.get("/site");
        setContent(response.data.data);
        setStatus("Dữ liệu đã sẵn sàng.");
      } catch (error) {
        setStatus("Không tải được dữ liệu từ server. Vẫn hiển thị bản giao diện mẫu.");
        console.error(error);
      }
    };

    loadContent();
  }, []);

  const company = content.company || {
    name: "Công Ty TNHH Công Nghệ Nam Nguyễn",
    brand: "NNC",
    slogan: "Thiết kế website, phần mềm và giải pháp số cho doanh nghiệp Việt",
    headline: "Tăng tốc hiện diện thương mại của doanh nghiệp bằng website chuyên nghiệp.",
    description:
      "NNC cung cấp website giới thiệu doanh nghiệp, landing page bán hàng và hệ thống quản trị nội dung.",
    phone: "0383158080",
    email: "contact@nnc.vn",
    address: "Số nhà 36, Ngõ 321 Dương Tự Minh, Tổ 26, Phường Quan Triều, Tỉnh Thái Nguyên"
  };

  return (
    <div className="page-shell">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Thương mại số cho doanh nghiệp</p>
          <h1>{company.headline}</h1>
          <p className="lead">{company.description}</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href={`tel:${company.phone}`}>
              Gọi ngay
            </a>
            <a className="btn btn-secondary" href={`mailto:${company.email}`}>
              Nhận báo giá
            </a>
          </div>
          <p className="hero-note">{status}</p>
        </div>

        <aside className="hero-card">
          <span className="hero-brand">{company.brand}</span>
          <h2>{company.name}</h2>
          <p>{company.slogan}</p>
          <ul className="contact-list">
            <li>
              <strong>Hotline:</strong> {company.phone}
            </li>
            <li>
              <strong>Email:</strong> {company.email}
            </li>
            <li>
              <strong>Địa chỉ:</strong> {company.address}
            </li>
          </ul>
        </aside>
      </section>

      <section className="stats-grid">
        {content.stats.map((item) => (
          <article key={item.label} className="stat-card">
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </article>
        ))}
      </section>

      <section className="content-section" id="services">
        <div className="section-head">
          <p className="eyebrow">Dịch vụ</p>
          <h2>Giải pháp phù hợp để bán hàng và xây thương hiệu</h2>
        </div>
        <div className="cards-grid">
          {content.services.map((service) => (
            <article key={service.slug} className={`info-card ${service.highlight ? "featured" : ""}`}>
              <p className="card-price">{service.price}</p>
              <h3>{service.name}</h3>
              <p>{service.summary}</p>
              <ul>
                {service.benefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section split" id="projects">
        <div>
          <div className="section-head">
            <p className="eyebrow">Dự án</p>
            <h2>Giao diện thương mại, rõ ràng và dễ chuyển đổi</h2>
          </div>
          <div className="cards-grid compact">
            {content.projects.map((project) => (
              <article key={project.name} className="mini-card">
                <span>{project.category}</span>
                <h3>{project.name}</h3>
                <p>{project.summary}</p>
                <strong>{project.status}</strong>
              </article>
            ))}
          </div>
        </div>
        <div>
          <div className="section-head">
            <p className="eyebrow">Khách hàng nói gì</p>
            <h2>Niềm tin đến từ trải nghiệm rõ ràng</h2>
          </div>
          <div className="testimonial-stack">
            {content.testimonials.map((item) => (
              <blockquote key={item.name} className="quote-card">
                <p>{item.quote}</p>
                <footer>
                  <strong>{item.name}</strong>
                  <span>{item.role}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section" id="contact">
        <div className="section-head">
          <p className="eyebrow">Liên hệ</p>
          <h2>Sẵn sàng tư vấn và nhận báo giá</h2>
        </div>
        <div className="contact-panel">
          {content.contacts.map((item) => (
            <article key={item.label} className="contact-card">
              <p>{item.label}</p>
              <strong>{item.value}</strong>
              <span>{item.note}</span>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
