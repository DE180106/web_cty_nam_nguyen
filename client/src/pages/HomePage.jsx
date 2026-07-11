import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import api from "../services/api";

const fallbackCompany = {
  name: "Nam Nguyen Technology",
  brand: "NAM NGUYEN",
  slogan: "Laptop chinh hang, hieu nang cao va giao nhanh toan quoc",
  headline: "Hieu nang manh me",
  description:
    "Chinh hang 100%, tra gop 0%, bao hanh 24 thang. Tu van dung nhu cau va giao nhanh tren toan quoc.",
  phone: "18006868",
  email: "sales@namnguyen.vn",
  address: "123 Nguyen Hue, Quan 1, TP.HCM"
};

const trustBadges = ["Hang chinh hang", "Tra gop 0%", "BH 24 thang", "4.9 sao danh gia"];

const serviceHighlights = [
  {
    title: "Giao hang toan quoc",
    text: "Giao trong 2h tai TP.HCM va Ha Noi. Toan quoc trong 24-48h."
  },
  {
    title: "Bao hanh chinh hang",
    text: "Bao hanh 12-36 thang tai trung tam hang, ho tro tan nha."
  },
  {
    title: "Doi tra nhanh 30 ngay",
    text: "Doi tra trong 30 ngay neu loi nha san xuat, khong phat sinh phi."
  },
  {
    title: "Thanh toan an toan",
    text: "Ho tro tra gop 0% lai suat, thanh toan online ma hoa SSL."
  }
];

const categoryCards = [
  { title: "Gaming", subtitle: "RTX 4070-4090", count: "48 san pham" },
  { title: "Laptop Van phong", subtitle: "Mong nhe, ben bi", count: "36 san pham" },
  { title: "Do hoa", subtitle: "Man OLED 4K", count: "22 san pham" },
  { title: "MacBook", subtitle: "Chip M4 Series", count: "15 san pham" },
  { title: "Laptop AI", subtitle: "NPU tich hop", count: "18 san pham" },
  { title: "Phu kien", subtitle: "Chuot, tai nghe", count: "124 san pham" }
];

const fallbackFeaturedProducts = [
  {
    brand: "ASUS",
    name: "ASUS ROG Strix G16 2024",
    specs: {
      cpu: "i9-14900HX",
      ram: "32GB DDR5",
      ssd: "1TB NVMe",
      gpu: "RTX 4080 12GB",
      display: '16" QHD+ 240Hz'
    },
    price: 52990000,
    oldPrice: 62990000,
    badge: "HOT",
    discount: "-16%",
    reviewCount: 248,
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=80"
  },
  {
    brand: "MSI",
    name: "MSI Raider GE78 HX",
    specs: {
      cpu: "i9-14900HX",
      ram: "64GB DDR5",
      ssd: "2TB NVMe",
      gpu: "RTX 4090 16GB",
      display: '17.3" QHD 240Hz'
    },
    price: 79990000,
    oldPrice: 88990000,
    badge: "NEW",
    discount: "-11%",
    reviewCount: 167,
    image:
      "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?auto=format&fit=crop&w=1200&q=80"
  },
  {
    brand: "APPLE",
    name: 'Apple MacBook Pro 16" M4 Max',
    specs: {
      cpu: "M4 Max 16-core",
      ram: "48GB Unified Memory",
      ssd: "1TB SSD",
      gpu: "40-core GPU",
      display: '16" Liquid Retina XDR'
    },
    price: 89990000,
    oldPrice: 95990000,
    badge: "PREMIUM",
    discount: "-6%",
    reviewCount: 412,
    image:
      "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=1200&q=80"
  },
  {
    brand: "DELL",
    name: "Dell XPS 15 9530",
    specs: {
      cpu: "i7-13700H",
      ram: "32GB LPDDR5",
      ssd: "512GB NVMe",
      gpu: "RTX 4060 8GB",
      display: '15.6" OLED 3.5K'
    },
    price: 42990000,
    oldPrice: 51990000,
    badge: "SALE",
    discount: "-17%",
    reviewCount: 189,
    image:
      "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=1200&q=80"
  }
];

const brandLogos = ["MSI", "ACER", "DELL", "HP", "LENOVO", "APPLE", "GIGABYTE", "RAZER", "SAMSUNG", "ASUS"];

const newsItems = [
  {
    tag: "TIN TUC",
    title: "RTX 5090 Laptop: Ky nguyen moi cua laptop gaming cao cap",
    excerpt: "NVIDIA chinh thuc ra mat dong GPU RTX 5090 danh rieng cho laptop, mang den hieu nang chua tung co...",
    meta: "08/07/2026  -  5 phut doc",
    image:
      "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1200&q=80"
  },
  {
    tag: "REVIEW",
    title: "Top 10 Laptop Gaming Tot Nhat 2026: Lua chon cho moi ngan sach",
    excerpt: "Thi truong laptop gaming 2026 ngay cang da dang voi nhieu lua chon hap dan tu phan khuc trung...",
    meta: "05/07/2026  -  8 phut doc",
    image:
      "https://images.unsplash.com/photo-1603481546579-65d935ba9cdd?auto=format&fit=crop&w=1200&q=80"
  },
  {
    tag: "APPLE",
    title: "Apple M4 Ultra: Chip xu ly manh nhat the gioi cho MacBook Pro",
    excerpt: "Apple vua ra mat chip M4 Ultra voi hieu nang vuot troi, danh dau buoc nhay vot lon trong lich su Mac...",
    meta: "02/07/2026  -  6 phut doc",
    image:
      "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?auto=format&fit=crop&w=1200&q=80"
  }
];

const footerBenefits = ["Giao hang nhanh", "Bao hanh 24 thang", "Doi tra 30 ngay", "Tra gop 0%"];

function HomePage() {
  const [company, setCompany] = useState(fallbackCompany);
  const [featuredProducts, setFeaturedProducts] = useState(fallbackFeaturedProducts);
  const [newsletterStatus, setNewsletterStatus] = useState("");

  useEffect(() => {
    const loadContent = async () => {
      try {
        const [siteResponse, productResponse] = await Promise.all([
          api.get("/site"),
          api.get("/products", {
            params: {
              featured: true,
              limit: 8
            }
          })
        ]);

        const remoteCompany = siteResponse.data?.data?.company;
        const remoteProducts = productResponse.data?.data || [];

        if (remoteCompany) {
          setCompany({
            ...fallbackCompany,
            ...remoteCompany,
            brand: "NAM NGUYEN"
          });
        }

        if (remoteProducts.length) {
          setFeaturedProducts(remoteProducts);
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadContent();
  }, []);

  const handleNewsletterSubmit = (event) => {
    event.preventDefault();
    setNewsletterStatus("Da ghi nhan email. Chung toi se gui uu dai som nhat.");
  };

  return (
    <div className="ecom-page">
      <section className="hero-ecom">
        <div className="hero-grid-overlay" />

        <div className="hero-content">
          <div className="hero-copy-panel">
            <p className="section-label">Laptop chinh hang</p>
            <h1>
              Hieu nang
              <span>manh me</span>
            </h1>
            <p className="hero-description-ecom">{company.description}</p>

            <div className="hero-badge-row">
              {trustBadges.map((item) => (
                <span key={item} className="hero-chip">
                  {item}
                </span>
              ))}
            </div>

            <div className="hero-actions-ecom">
              <a className="ecom-btn ecom-btn-primary" href="#featured-products">
                Mua ngay
              </a>
              <a className="ecom-btn ecom-btn-secondary" href="#categories">
                Xem san pham
              </a>
            </div>

            <div className="hero-stats">
              <article>
                <strong>5,000+</strong>
                <span>San pham</span>
              </article>
              <article>
                <strong>50,000+</strong>
                <span>Khach hang</span>
              </article>
              <article>
                <strong>3 nam</strong>
                <span>Kinh nghiem</span>
              </article>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-preview-card">
              <div className="hero-preview-header">
                <span>NAM NGUYEN</span>
                <span>UU dai thang 7</span>
              </div>
              <div className="hero-preview-body">
                <div className="hero-preview-copy">
                  <p>Laptop cao cap</p>
                  <h2>Hieu nang vuot troi</h2>
                  <strong>MacBook Air M4</strong>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1517336714739-489689fd1ca8?auto=format&fit=crop&w=1200&q=80"
                  alt="Laptop premium"
                />
              </div>
              <div className="hero-floating-chip hero-floating-chip-left">
                <span>Chip</span>
                <strong>Intel Core i9</strong>
                <small>14th Gen HX</small>
              </div>
              <div className="hero-floating-chip hero-floating-chip-right">
                <span>RTX GPU</span>
                <strong>RTX 4090</strong>
                <small>16GB GDDR7</small>
              </div>
              <div className="hero-sale-bubble">
                <span>Uu dai</span>
                <strong>15%</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-bottom-strip">
          {["San pham chinh hang", "Ho tro ky thuat 24/7", "7 ngay doi tra", "Bao hanh chinh hang"].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      <section className="service-highlight-grid">
        {serviceHighlights.map((item) => (
          <article key={item.title} className="service-highlight-card">
            <div className="service-highlight-icon" />
            <div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="ecom-section" id="categories">
        <div className="section-heading">
          <div>
            <p className="section-label">Danh muc</p>
            <h2>Kham pha theo nhu cau</h2>
          </div>
          <a className="section-link" href="#featured-products">
            Xem tat ca
          </a>
        </div>

        <div className="category-grid">
          {categoryCards.map((item) => (
            <article key={item.title} className="category-card">
              <div className="category-icon-box" />
              <div className="category-card-glow" />
              <h3>{item.title}</h3>
              <p>{item.subtitle}</p>
              <span>{item.count}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="ecom-section" id="featured-products">
        <div className="section-heading">
          <div>
            <p className="section-label">Noi bat</p>
            <h2>San pham noi bat</h2>
          </div>
          <div className="filter-tabs">
            {["Tat ca", "Gaming", "MacBook", "Van phong"].map((item, index) => (
              <button key={item} className={`filter-tab ${index === 0 ? "is-active" : ""}`} type="button">
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="product-grid">
          {featuredProducts.map((product) => (
            <ProductCard key={product._id || product.slug || product.name} product={product} />
          ))}
        </div>

        <div className="center-cta">
          <a className="outline-cta" href="#newsletter">
            Xem tat ca san pham
          </a>
        </div>
      </section>

      <section className="flash-sale-band">
        <div className="flash-sale-copy">
          <p className="section-label section-label-light">Uu dai dac biet</p>
          <h2>FLASH SALE</h2>
          <p>Giam den 40% tat ca laptop gaming</p>
        </div>

        <div className="flash-sale-timer">
          <span>
            <strong>06</strong>
            Gio
          </span>
          <i>:</i>
          <span>
            <strong>23</strong>
            Phut
          </span>
          <i>:</i>
          <span>
            <strong>47</strong>
            Giay
          </span>
        </div>

        <a className="flash-sale-btn" href="#featured-products">
          Xem uu dai ngay
        </a>
      </section>

      <section className="ecom-section brand-section">
        <p className="section-label section-label-center">Thuong hieu doi tac</p>
        <div className="brand-grid">
          {brandLogos.map((brand) => (
            <article key={brand} className="brand-card">
              {brand}
            </article>
          ))}
        </div>
      </section>

      <section className="ecom-section">
        <div className="section-heading">
          <div>
            <p className="section-label">Tin tuc</p>
            <h2>Tin tuc cong nghe</h2>
          </div>
          <a className="section-link" href="#newsletter">
            Xem tat ca
          </a>
        </div>

        <div className="news-grid">
          {newsItems.map((item) => (
            <article key={item.title} className="news-card">
              <div className="news-image-wrap">
                <span className="news-tag">{item.tag}</span>
                <img src={item.image} alt={item.title} />
              </div>
              <div className="news-card-body">
                <p className="news-meta">{item.meta}</p>
                <h3>{item.title}</h3>
                <p>{item.excerpt}</p>
                <a href="#newsletter">Doc them</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="testimonial-section">
        <p className="section-label section-label-center">Danh gia</p>
        <h2>Khach hang noi gi ve chung toi</h2>

        <div className="testimonial-stats">
          <article>
            <strong>50,000+</strong>
            <span>Khach hang</span>
          </article>
          <article>
            <strong>4.9/5</strong>
            <span>Danh gia TB</span>
          </article>
          <article>
            <strong>98%</strong>
            <span>Hai long</span>
          </article>
        </div>

        <article className="testimonial-feature-card">
          <p>
            "Mua ASUS ROG tai day, giao hang sieu nhanh, may dung hang chinh hang, hieu nang cuc dinh.
            Rat hai long voi dich vu tu van nhiet tinh."
          </p>
          <div className="testimonial-footer">
            <div>
              <strong>Nguyen Minh Tuan</strong>
              <span>Game thu chuyen nghiep</span>
            </div>
            <em>ASUS ROG Strix G16</em>
          </div>
        </article>
      </section>

      <section className="newsletter-section" id="newsletter">
        <div className="hero-grid-overlay" />
        <div className="newsletter-inner">
          <p className="section-label section-label-center">Nhan uu dai doc quyen</p>
          <h2>Nhan uu dai doc quyen</h2>
          <p>Dang ky nhan ban tin de nhan ma giam gia 10% cho don hang dau tien.</p>

          <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
            <input placeholder="Nhap email cua ban..." type="email" />
            <button className="ecom-btn ecom-btn-primary" type="submit">
              Dang ky
            </button>
          </form>
          {newsletterStatus ? <p className="newsletter-status">{newsletterStatus}</p> : null}
        </div>
      </section>

      <section className="footer-benefits">
        {footerBenefits.map((item) => (
          <article key={item} className="footer-benefit-item">
            <div className="service-highlight-icon" />
            <div>
              <h3>{item}</h3>
              <p>{item === "Giao hang nhanh" ? "2h tai TP.HCM & Ha Noi" : "Dich vu va chinh sach minh bach"}</p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

export default HomePage;
