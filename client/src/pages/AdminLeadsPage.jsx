import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function AdminLeadsPage() {
  const { user, logout } = useAuth();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/leads")
      .then((response) => setLeads(response.data.data || []))
      .catch((requestError) => {
        setError(
          requestError.response?.data?.message ||
            "Khong the tai danh sach khach hang."
        );
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="admin-page">
      <div className="admin-page-head">
        <div>
          <p className="eyebrow">Quan tri dang nhap</p>
          <h1>Danh sach lead tu website</h1>
          <p className="sync-note">
            Nguoi dung: {user?.fullName} | Vai tro: {user?.role}
          </p>
        </div>
        <button className="btn btn-secondary" type="button" onClick={logout}>
          Dang xuat
        </button>
      </div>

      {loading ? (
        <div className="admin-empty">Dang tai du lieu...</div>
      ) : null}

      {!loading && error ? <div className="admin-empty">{error}</div> : null}

      {!loading && !error ? (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Khach hang</th>
                <th>Thong tin</th>
                <th>Dich vu</th>
                <th>Noi dung</th>
                <th>Trang thai</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead._id}>
                  <td>
                    <strong>{lead.fullName}</strong>
                    <span>{lead.companyName || "Chua cap nhat cong ty"}</span>
                  </td>
                  <td>
                    <span>{lead.email}</span>
                    <span>{lead.phoneNumber}</span>
                  </td>
                  <td>{lead.serviceInterest}</td>
                  <td>{lead.message}</td>
                  <td>{lead.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </section>
  );
}

export default AdminLeadsPage;
