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

const workflow = [
  {
    step: "01",
    title: "Tiếp nhận yêu cầu",
    text: "Lắng nghe mục tiêu kinh doanh, nội dung cần làm và cách khách hàng muốn chuyển đổi."
  },
  {
    step: "02",
    title: "Thiết kế giao diện",
    text: "Dựng cấu trúc landing page, bố cục CTA và trải nghiệm phù hợp thương hiệu."
  },
  {
    step: "03",
    title: "Triển khai & tối ưu",
    text: "Hoàn thiện code, kết nối dữ liệu và tối ưu tốc độ hiển thị trên mọi thiết bị."
  }
];

function HomePage() {
  const [content, setContent] = useState(initialState);
  const [status, setStatus] = useState("Đang tải dữ liệu thương mại...");
  const [formState, setFormState] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    companyName: "",
    serviceInterest: "Website doanh nghiệp",
    message: ""
  });
  const [formStatus, setFormStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

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

  const serviceOptions = content.services.length
    ? content.services.map((service) => service.name)
    : ["Website doanh nghiệp", "Landing page bán hàng", "Phần mềm quản lý"];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setFormStatus("");

    try {
      const response = await api.post("/leads", formState);
      setFormStatus(response.data.message || "Đã gửi liên hệ thành công.");
      setFormState({
        fullName: "",
        phoneNumber: "",
        email: "",
        companyName: "",
        serviceInterest: serviceOptions[0],
        message: ""
      });
    } catch (error) {
      setFormStatus(
        error.response?.data?.message || "Gửi liên hệ thất bại. Vui lòng kiểm tra lại thông tin."
      );
    } finally {
      setSubmitting(false);
    }
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

      <section className="content-section">
        <div className="section-head">
          <p className="eyebrow">Quy trình</p>
          <h2>Làm nhanh, rõ việc, dễ nghiệm thu</h2>
        </div>
        <div className="workflow-grid">
          {workflow.map((item) => (
            <article key={item.step} className="workflow-card">
              <span>{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section contact-layout" id="contact">
        <div className="section-head">
          <p className="eyebrow">Liên hệ</p>
          <h2>Sẵn sàng tư vấn và nhận báo giá</h2>
        </div>
        <div className="contact-layout-grid">
          <div className="contact-panel">
            {content.contacts.map((item) => (
              <article key={item.label} className="contact-card">
                <p>{item.label}</p>
                <strong>{item.value}</strong>
                <span>{item.note}</span>
              </article>
            ))}
          </div>
          <form className="lead-form" onSubmit={handleSubmit}>
            <label>
              Họ và tên
              <input name="fullName" value={formState.fullName} onChange={handleChange} />
            </label>
            <label>
              Số điện thoại
              <input name="phoneNumber" value={formState.phoneNumber} onChange={handleChange} />
            </label>
            <label>
              Email
              <input name="email" type="email" value={formState.email} onChange={handleChange} />
            </label>
            <label>
              Tên công ty
              <input name="companyName" value={formState.companyName} onChange={handleChange} />
            </label>
            <label>
              Dịch vụ quan tâm
              <select name="serviceInterest" value={formState.serviceInterest} onChange={handleChange}>
                {serviceOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Nội dung liên hệ
              <textarea name="message" rows="4" value={formState.message} onChange={handleChange} />
            </label>
            <button className="btn btn-primary" type="submit" disabled={submitting}>
              {submitting ? "Đang gửi..." : "Gửi yêu cầu"}
            </button>
            {formStatus ? <p className="form-status">{formStatus}</p> : null}
          </form>
        </div>
      </section>

      <section className="cta-banner">
        <div>
          <p className="eyebrow">Bắt đầu dự án</p>
          <h2>Biến website thành kênh bán hàng và giới thiệu thương hiệu.</h2>
          <p>
            Nếu bạn cần một landing page thương mại rõ ràng, có thể mở rộng thành website
            doanh nghiệp hoặc hệ thống quản trị sau này, NNC có thể triển khai theo nhu cầu thực tế.
          </p>
        </div>
        <a className="btn btn-primary" href={`tel:${company.phone}`}>
          Liên hệ ngay
        </a>
      </section>
    </div>
  );
}

export default HomePage;
