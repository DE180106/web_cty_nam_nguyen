import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RegisterPage() {
  const { register, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [socialMessage, setSocialMessage] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate(user?.role === "admin" ? "/quan-tri" : "/tai-khoan", {
        replace: true
      });
    }
  }, [isAuthenticated, navigate, user?.role]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const nextUser = await register(form);
      navigate(nextUser.role === "admin" ? "/quan-tri" : "/tai-khoan", {
        replace: true
      });
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Dang ky that bai. Vui long kiem tra lai thong tin."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleSocialRegister = (provider) => {
    setSocialMessage(
      `Dang ky bang ${provider} da co giao dien frontend, nhung chua cau hinh OAuth app id/secret o backend.`
    );
  };

  return (
    <section className="auth-portal">
      <div className="auth-portal-card">
        <div className="auth-portal-logo">P</div>
        <h1>Create your account</h1>

        <form className="auth-portal-form" onSubmit={handleSubmit}>
          <input
            value={form.fullName}
            onChange={(event) =>
              setForm((current) => ({ ...current, fullName: event.target.value }))
            }
            placeholder="Full name"
          />
          <input
            type="email"
            value={form.email}
            onChange={(event) =>
              setForm((current) => ({ ...current, email: event.target.value }))
            }
            placeholder="Email or phone number"
          />
          <input
            type="password"
            value={form.password}
            onChange={(event) =>
              setForm((current) => ({ ...current, password: event.target.value }))
            }
            placeholder="Password"
          />
          <input
            type="password"
            value={form.confirmPassword}
            onChange={(event) =>
              setForm((current) => ({ ...current, confirmPassword: event.target.value }))
            }
            placeholder="Confirm password"
          />
          {error ? <p className="form-error auth-portal-error">{error}</p> : null}
          <button className="auth-portal-submit" type="submit" disabled={submitting}>
            {submitting ? "Dang xu ly..." : "Sign up"}
          </button>
        </form>

        <p className="auth-portal-divider">OR</p>

        <div className="auth-portal-socials">
          <button className="auth-social-btn auth-social-facebook" type="button" onClick={() => handleSocialRegister("Facebook")}>
            <span>f</span>
            Continue with Facebook
          </button>
          <button className="auth-social-btn auth-social-google" type="button" onClick={() => handleSocialRegister("Google")}>
            <span>G</span>
            Continue with Google
          </button>
        </div>

        {socialMessage ? <p className="sync-note auth-portal-note">{socialMessage}</p> : null}

        <div className="auth-portal-links">
          <Link to="/quen-mat-khau">Forgot your password?</Link>
          <p>
            Already have an account? <Link to="/dang-nhap">Log in</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default RegisterPage;
