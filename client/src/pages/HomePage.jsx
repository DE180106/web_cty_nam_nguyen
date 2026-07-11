import { useEffect, useMemo, useState } from "react";
import api from "../services/api";

const fallbackContent = {
  company: {
    name: "Công Ty TNHH Công Nghệ Nam Nguyễn",
    brand: "NNC",
    slogan: "Thiết kế website, phần mềm và giải pháp số cho doanh nghiệp Việt",
    headline: "Tăng tốc hiện diện thương mại của doanh nghiệp bằng website chuyên nghiệp.",
    description:
      "NNC cung cấp website giới thiệu doanh nghiệp, landing page bán hàng, hệ thống quản trị nội dung và các giải pháp phần mềm theo nhu cầu thực tế.",
    phone: "0383158080",
    email: "contact@nnc.vn",
    address: "Số nhà 36, Ngõ 321 Dương Tự Minh, Tổ 26, Phường Quan Triều, Tỉnh Thái Nguyên"
  },
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

const featureBullets = [
  "Website phù hợp doanh nghiệp thương mại và dịch vụ",
  "Hiển thị tốt trên máy tính, tablet và điện thoại",
  "Nội dung rõ ràng, CTA nổi bật, dễ chuyển đổi"
];

function HomePage() {
  const [content, setContent] = useState(fallbackContent);
  const [status, setStatus] = useState("Đang tải dữ liệu từ MongoDB...");
  const [formState, setFormState] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    companyName: "",
    serviceInterest: "",
    message: ""
  });
  const [formStatus, setFormStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await api.get("/site");
        const data = response.data.data;
        setContent((current) => ({
          ...current,
          ...data,
          company: data.company || current.company
        }));
        setFormState((current) => ({
          ...current,
          serviceInterest: data.services?.[0]?.name || current.serviceInterest || "Website doanh nghiệp"
        }));
        setStatus("Dữ liệu đã đồng bộ từ database NNC.");
      } catch (error) {
        setStatus("Không tải được dữ liệu từ server, đang hiển thị nội dung dự phòng.");
        console.error(error);
      }
    };

    loadContent();
  }, []);

  const company = content.company || fallbackContent.company;
  const services = content.services || [];
  const projects = content.projects || [];
  const testimonials = content.testimonials || [];
  const contacts = content.contacts || [];
  const stats = content.stats || [];

  const serviceOptions = useMemo(() => {
    if (services.length) {
      return services.map((service) => service.name);
    }
    return ["Website doanh nghiệp", "Landing page bán hàng", "Phần mềm quản lý"];
  }, [services]);

  useEffect(() => {
    if (!formState.serviceInterest && serviceOptions.length) {
      setFormState((current) => ({
        ...current,
        serviceInterest: serviceOptions[0]
      }));
    }
  }, [serviceOptions, formState.serviceInterest]);

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
        serviceInterest: serviceOptions[0] || "Website doanh nghiệp",
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
    <div className="finbiz-page">
      <section className="hero-finbiz">
        <div className="hero-bg-shape hero-bg-left" />
        <div className="hero-bg-shape hero-bg-right" />
        <div className="hero-bg-stripe" />

        <div className="hero-inner">
          <header className="topbar">
            <div className="brand brand-dark">
              <strong>{company.brand}</strong>
              <span>Business Solution</span>
            </div>
            <nav className="nav nav-light" aria-label="Điều hướng chính">
              <a href="#tour" className="is-active">
                Start Tour
              </a>
              <a href="/dich-vu">Demos</a>
              <a href="/gioi-thieu">Features</a>
            </nav>
            <a className="purchase-btn" href="#contact">
              Purchase Now
            </a>
          </header>

          <div className="hero-copy" id="tour">
            <span className="badge-pill">BUSINESS & CONSULTING TEMPLATE</span>
            <h1>{company.headline}</h1>
            <p className="hero-title-sub">
              for <em>Your Business</em>
            </p>
            <p className="hero-description">{company.description}</p>

            <div className="feature-row">
              {featureBullets.map((item) => (
                <span key={item}>✓ {item}</span>
              ))}
            </div>

            <div className="hero-actions">
              <a className="btn btn-primary" href="#services">
                View Demos
              </a>
              <a className="btn btn-secondary" href={`tel:${company.phone}`}>
                Gọi tư vấn
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="intro-band">
        <p className="eyebrow eyebrow-center">Great packs of ready-made templates.</p>
        <h2>Giải pháp thương mại rõ ràng, hiện đại và dễ mở rộng</h2>
        <p>
          Giao diện ưu tiên sự sáng sủa, nhấn đỏ đậm ở CTA, bố cục thoáng và nội dung bám đúng
          yêu cầu doanh nghiệp NNC.
        </p>
      </section>

      <section className="stats-strip">
        {stats.map((item) => (
          <article key={item.label} className="stat-chip">
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </article>
        ))}
      </section>

      <section className="content-section content-section-light" id="services">
        <div className="section-head section-head-center">
          <p className="eyebrow">Dịch vụ</p>
          <h2>Dịch vụ bám nhu cầu thương mại</h2>
          <p>
            Mỗi gói dịch vụ được mô tả rõ để khách hàng hiểu ngay lợi ích, phạm vi và CTA.
          </p>
        </div>

        <div className="cards-grid cards-grid-light">
          {services.map((service) => (
            <article key={service.slug} className={`service-card ${service.highlight ? "is-hot" : ""}`}>
              <p className="card-kicker">{service.price}</p>
              <h3>{service.name}</h3>
              <p>{service.summary}</p>
              <ul>
                {service.benefits.map((benefit) => (
                  <li key={benefit}>✓ {benefit}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section content-section-light two-col">
        <div className="panel-box">
          <p className="eyebrow">Về NNC</p>
          <h2>Uy tín, rõ việc, dễ nghiệm thu</h2>
          <p>
            NNC tập trung vào website có mục tiêu kinh doanh rõ ràng, thể hiện năng lực công ty và
            tạo cảm giác tin cậy ngay từ màn hình đầu tiên.
          </p>
          <div className="mini-list">
            <span>Thiết kế sạch, dễ hiểu</span>
            <span>Chuẩn responsive</span>
            <span>Tối ưu CTA và form</span>
          </div>
        </div>

        <div className="panel-box">
          <p className="eyebrow">Quy trình</p>
          <div className="workflow-grid">
            {workflow.map((item) => (
              <article key={item.step} className="workflow-card">
                <span>{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section content-section-light" id="projects">
        <div className="section-head section-head-center">
          <p className="eyebrow">Dự án</p>
          <h2>Dự án mẫu để tham khảo cấu trúc trình bày</h2>
        </div>

        <div className="cards-grid cards-grid-light cards-grid-projects">
          {projects.map((project) => (
            <article key={project.name} className="project-card">
              <span>{project.category}</span>
              <h3>{project.name}</h3>
              <p>{project.summary}</p>
              <strong>{project.status}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section content-section-light">
        <div className="section-head section-head-center">
          <p className="eyebrow">Khách hàng nói gì</p>
          <h2>Niềm tin đến từ trải nghiệm rõ ràng</h2>
        </div>

        <div className="testimonial-grid">
          {testimonials.map((item) => (
            <blockquote key={item.name} className="testimonial-card">
              <p>{item.quote}</p>
              <footer>
                <strong>{item.name}</strong>
                <span>{item.role}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="content-section content-section-light" id="contact">
        <div className="section-head section-head-center">
          <p className="eyebrow">Liên hệ</p>
          <h2>Sẵn sàng tư vấn và nhận báo giá</h2>
        </div>

        <div className="contact-layout-grid">
          <div className="contact-panel contact-panel-light">
            {contacts.map((item) => (
              <article key={item.label} className="contact-card contact-card-light">
                <p>{item.label}</p>
                <strong>{item.value}</strong>
                <span>{item.note}</span>
              </article>
            ))}
          </div>

          <form className="lead-form lead-form-light" onSubmit={handleSubmit}>
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

      <section className="cta-banner-finbiz">
        <div>
          <p className="eyebrow">Bắt đầu dự án</p>
          <h2>Biến website thành kênh bán hàng và giới thiệu thương hiệu.</h2>
          <p>
            Nếu bạn cần landing page thương mại rõ ràng, có thể mở rộng thành website doanh
            nghiệp hoặc hệ thống quản trị sau này, NNC có thể triển khai theo nhu cầu thực tế.
          </p>
        </div>
        <a className="purchase-btn purchase-btn-large" href={`tel:${company.phone}`}>
          Purchase Now
        </a>
      </section>

      <p className="sync-note">{status}</p>
    </div>
  );
}

export default HomePage;
