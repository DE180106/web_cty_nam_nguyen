import { useEffect, useState } from "react";
import api from "../services/api";

function HomePage() {
  const [message, setMessage] = useState("Đang kết nối backend...");

  useEffect(() => {
    const checkServer = async () => {
      try {
        const response = await api.get("/health");
        setMessage(response.data.message);
      } catch (error) {
        setMessage("Không thể kết nối backend.");
        console.error(error);
      }
    };

    checkServer();
  }, []);

  return (
    <section>
      <h2>Trang chủ</h2>
      <p>{message}</p>
    </section>
  );
}

export default HomePage;
