import { useAuth } from "../context/AuthContext";

function UserDashboardPage() {
  const { user, logout } = useAuth();

  return (
    <section className="auth-page">
      <div className="auth-card">
        <p className="eyebrow">Dashboard user</p>
        <h1>Xin chao {user?.fullName}</h1>
        <p className="sync-note">
          Day la giao dien tuong trung sau khi dang nhap thanh cong. Vai tro hien tai: {user?.role}.
        </p>

        <div className="account-summary-grid">
          <article className="account-summary-card">
            <strong>{user?.email}</strong>
            <span>Email dang nhap</span>
          </article>
          <article className="account-summary-card">
            <strong>{user?.role}</strong>
            <span>Quyen truy cap</span>
          </article>
        </div>

        <button className="btn btn-secondary" type="button" onClick={logout}>
          Dang xuat
        </button>
      </div>
    </section>
  );
}

export default UserDashboardPage;
