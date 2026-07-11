import { useState } from "react";
import { Link } from "react-router-dom";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage(
      email
        ? `Da ghi nhan yeu cau khoi phuc cho ${email}. Day la giao dien demo frontend, backend reset password chua duoc bat.`
        : "Vui long nhap email truoc khi gui yeu cau."
    );
  };

  return (
    <section className="auth-portal">
      <div className="auth-portal-card">
        <div className="auth-portal-logo">P</div>
        <h1>Reset your password</h1>

        <form className="auth-portal-form" onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email or phone number"
          />
          {message ? <p className="sync-note auth-portal-note">{message}</p> : null}
          <button className="auth-portal-submit" type="submit">
            Send request
          </button>
        </form>

        <div className="auth-portal-links">
          <Link to="/dang-nhap">Back to login</Link>
          <p>
            Need an account? <Link to="/dang-ky">Sign Up</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default ForgotPasswordPage;
