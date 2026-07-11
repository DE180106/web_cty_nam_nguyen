import { useEffect, useMemo, useState } from "react";
import api from "../services/api";

const fallbackContent = {
  company: {
    name: "Cong Ty TNHH Cong Nghe Nam Nguyen",
    brand: "NNC",
    slogan: "Thiet ke website, phan mem va giai phap so cho doanh nghiep Viet",
    headline: "Tang toc hien dien thuong mai cua doanh nghiep bang website chuyen nghiep.",
    description:
      "NNC cung cap website gioi thieu doanh nghiep, landing page ban hang, he thong quan tri noi dung va cac giai phap phan mem theo nhu cau thuc te.",
    phone: "0383158080",
    email: "contact@nnc.vn",
    address: "So nha 36, Ngo 321 Duong Tu Minh, To 26, Phuong Quan Trieu, Tinh Thai Nguyen"
  },
  services: [],
  projects: [],
  testimonials: [],
  contacts: [],
  stats: []
};

const featureBullets = [
  "Noi dung ro rang, dung tinh than doanh nghiep cong nghe",
  "Responsive tot tren desktop, tablet va mobile",
  "CTA, lien he va bao gia de nhin, de thao tac"
];

const featureGrid = [
  "Website doanh nghiep",
  "Landing page ban hang",
  "Form lien he",
  "Responsive",
  "Noi dung ro rang",
  "Database MongoDB",
  "Cau truc de mo rong",
  "Code de bao tri"
];

const supportCards = [
  {
    title: "Regular Updates",
    text: "Noi dung va giao dien co the duoc mo rong theo tung giai doan phat trien cua doanh nghiep."
  },
  {
    title: "Knowledge Base",
    text: "Cau truc code, du lieu va noi dung duoc tach ro de de ban giao va de bao tri."
  },
  {
    title: "Proficient Support",
    text: "Tu van theo nhu cau thuc te, uu tien hieu qua trinh bay va kha nang chuyen doi."
  }
];

function HomePage() {
  const [content, setContent] = useState(fallbackContent);
  const [status, setStatus] = useState("Dang tai du lieu tu MongoDB...");
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
          serviceInterest: data.services?.[0]?.name || current.serviceInterest || "Website doanh nghiep"
        }));
        setStatus("Du lieu da dong bo tu database NNC.");
      } catch (error) {
        setStatus("Khong tai duoc du lieu tu server, dang hien thi noi dung du phong.");
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
    if (services.length) return services.map((service) => service.name);
    return ["Website doanh nghiep", "Landing page ban hang", "Phan mem quan ly"];
  }, [services]);

  useEffect(() => {
    if (!formState.serviceInterest && serviceOptions.length) {
      setFormState((current) => ({ ...current, serviceInterest: serviceOptions[0] }));
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
      setFormStatus(response.data.message || "Da gui lien he thanh cong.");
      setFormState({
        fullName: "",
        phoneNumber: "",
        email: "",
        companyName: "",
        serviceInterest: serviceOptions[0] || "Website doanh nghiep",
        message: ""
      });
    } catch (error) {
      setFormStatus(
        error.response?.data?.message || "Gui lien he that bai. Vui long kiem tra lai thong tin."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="finbiz-page">
      <section className="hero-finbiz" id="tour">
        <div className="hero-bg-shape hero-bg-left" />
        <div className="hero-bg-shape hero-bg-right" />
        <div className="hero-bg-stripe" />

        <div className="hero-copy">
          <span className="badge-pill">BUSINESS & CONSULTING WEBSITE</span>
          <h1>{company.headline}</h1>
          <p className="hero-title-sub">
            for <em>Your Business</em>
          </p>
          <p className="hero-description">{company.description}</p>

          <div className="feature-row">
            {featureBullets.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>

          <div className="hero-actions">
            <a className="btn btn-primary" href="#services">
              View Demos
            </a>
            <a className="btn btn-secondary" href="#contact">
              Nhan bao gia
            </a>
          </div>
        </div>
      </section>

      <section className="intro-band">
        <p className="eyebrow eyebrow-center">Great packs of ready-made templates.</p>
        <h2>Giao dien thuong mai ro rang, sach va dang tin</h2>
        <p>
          Chon huong trinh bay phu hop cho website doanh nghiep, nhan manh nang luc,
          dich vu va thong tin lien he cua NNC.
        </p>
        <div className="segment-actions">
          <a className="segment-btn segment-btn-active" href="#services">
            Multipage Demos
          </a>
          <a className="segment-btn" href="#projects">
            Onepage Demos
          </a>
          <a className="segment-btn" href="#features">
            Core Features
          </a>
        </div>
      </section>

      <section className="preview-grid">
        {services.map((service, index) => (
          <article key={service.slug} className="preview-card">
            <div className={`preview-thumb preview-thumb-${(index % 3) + 1}`}>
              <div className="preview-topbar" />
              <div className="preview-hero">
                <span>{service.price}</span>
                <strong>{service.name}</strong>
              </div>
              <div className="preview-lines">
                <i />
                <i />
                <i />
              </div>
            </div>
            <h3>{service.name}</h3>
            <p>{service.summary}</p>
          </article>
        ))}
      </section>

      <section className="stats-strip">
        {stats.map((item) => (
          <article key={item.label} className="stat-chip">
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </article>
        ))}
      </section>

      <section className="content-section content-section-light" id="features">
        <div className="section-head section-head-center">
          <p className="eyebrow">Core Features</p>
          <h2>Cac yeu to cot loi cua landing page doanh nghiep</h2>
          <p>
            Noi dung, giao dien va du lieu duoc sap xep de phuc vu muc tieu thuong mai va ban giao.
          </p>
        </div>
        <div className="feature-tile-grid">
          {featureGrid.map((item) => (
            <article key={item} className="feature-tile">
              <span className="feature-icon" />
              <h3>{item}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section content-section-light" id="services">
        <div className="section-head section-head-center">
          <p className="eyebrow">Dich vu</p>
          <h2>Dich vu bam nhu cau thuong mai</h2>
        </div>
        <div className="cards-grid cards-grid-light">
          {services.map((service) => (
            <article key={service.slug} className={`service-card ${service.highlight ? "is-hot" : ""}`}>
              <p className="card-kicker">{service.price}</p>
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

      <section className="content-section content-section-light two-col">
        <div className="panel-box">
          <p className="eyebrow">Ve NNC</p>
          <h2>Uy tin, ro viec, de nghiem thu</h2>
          <p>
            NNC tap trung vao website co muc tieu kinh doanh ro rang, the hien nang luc cong ty
            va tao cam giac tin cay ngay tu man hinh dau tien.
          </p>
          <div className="mini-list">
            <span>Thiet ke sach</span>
            <span>Responsive</span>
            <span>Toi uu CTA</span>
          </div>
        </div>

        <div className="panel-box">
          <p className="eyebrow">Quy trinh</p>
          <div className="workflow-grid">
            {[
              ["01", "Tiep nhan yeu cau", "Phan tich muc tieu va nhu cau noi dung."],
              ["02", "Thiet ke giao dien", "Sap xep bo cuc va cac diem nhan chuyen doi."],
              ["03", "Trien khai", "Ket noi du lieu va toi uu hien thi tren moi thiet bi."]
            ].map(([step, title, text]) => (
              <article key={step} className="workflow-card">
                <span>{step}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section content-section-light" id="projects">
        <div className="section-head section-head-center">
          <p className="eyebrow">Inner Pages</p>
          <h2>Cac khoi noi dung co the mo rong trong du an that</h2>
        </div>
        <div className="preview-grid preview-grid-compact">
          {projects.map((project, index) => (
            <article key={project.name} className="preview-card">
              <div className={`preview-thumb preview-thumb-${((index + 1) % 3) + 1}`}>
                <div className="preview-topbar" />
                <div className="preview-body-alt">
                  <strong>{project.category}</strong>
                  <p>{project.status}</p>
                </div>
              </div>
              <h3>{project.name}</h3>
              <p>{project.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section content-section-light">
        <div className="section-head section-head-center">
          <p className="eyebrow">Testimonials</p>
          <h2>Phan hoi giup tang do tin cay</h2>
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
          <p className="eyebrow">Contact</p>
          <h2>San sang tu van va nhan bao gia</h2>
        </div>
        <div className="contact-layout-grid">
          <div className="contact-panel">
            {contacts.map((item) => (
              <article key={item.label} className="contact-card">
                <p>{item.label}</p>
                <strong>{item.value}</strong>
                <span>{item.note}</span>
              </article>
            ))}
          </div>
          <form className="lead-form" onSubmit={handleSubmit}>
            <label>
              Ho va ten
              <input name="fullName" value={formState.fullName} onChange={handleChange} />
            </label>
            <label>
              So dien thoai
              <input name="phoneNumber" value={formState.phoneNumber} onChange={handleChange} />
            </label>
            <label>
              Email
              <input name="email" type="email" value={formState.email} onChange={handleChange} />
            </label>
            <label>
              Ten cong ty
              <input name="companyName" value={formState.companyName} onChange={handleChange} />
            </label>
            <label>
              Dich vu quan tam
              <select name="serviceInterest" value={formState.serviceInterest} onChange={handleChange}>
                {serviceOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Noi dung lien he
              <textarea name="message" rows="4" value={formState.message} onChange={handleChange} />
            </label>
            <button className="btn btn-primary" type="submit" disabled={submitting}>
              {submitting ? "Dang gui..." : "Gui yeu cau"}
            </button>
            {formStatus ? <p className="form-status">{formStatus}</p> : null}
          </form>
        </div>
      </section>

      <section className="support-strip">
        {supportCards.map((item, index) => (
          <article key={item.title} className="support-card">
            <span className={`support-icon support-icon-${index + 1}`} />
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </section>

      <section className="cta-banner-finbiz">
        <div>
          <p className="eyebrow">Get NNC Now</p>
          <h2>Bien website thanh kenh ban hang va gioi thieu thuong hieu</h2>
          <p>
            Landing page co the mo rong thanh website doanh nghiep hoan chinh, co du lieu,
            form lien he va cac khoi noi dung phuc vu tu van ban hang.
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
