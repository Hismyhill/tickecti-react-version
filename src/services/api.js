const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

async function request(path, options = {}) {
  const sessionRaw = localStorage.getItem("ticketapp_session");
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };
  if (sessionRaw) {
    try {
      const token = JSON.parse(sessionRaw).token;
      if (token) headers["Authorization"] = `Bearer ${token}`;
    } catch (e) {
      console.log(e);
      localStorage.removeItem("ticketapp_session");
    }
  }

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  if (res.status === 401) {
    localStorage.removeItem("ticketapp_session");
    const err = new Error("unauthorized");
    err.status = 401;
    throw err;
  }
  if (!res.ok) {
    const text = await res.text().catch(() => null);
    const err = new Error(text || "network error");
    err.status = res.status;
    throw err;
  }
  const ct = res.headers.get("content-type") || "";
  if (ct.includes("application/json")) return await res.json();
  return null;
}

export default { request, API_BASE };
