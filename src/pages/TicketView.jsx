import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "@/utils/api";
import { toast } from "react-toastify";

export default function TicketView() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .request(`/tickets/${id}`)
      .then(setTicket)
      .catch((err) => {
        if (err.status === 401) {
          toast.error("Your session has expired — please log in again.");
          navigate("/auth/login");
        } else {
          toast.error("Failed to load ticket. Please retry.");
        }
      });
  }, [id, navigate]);

  if (!ticket) return <div className="container card">Loading…</div>;

  return (
    <div className="container">
      <div className="card">
        <h2 className="font-semibold">{ticket.title}</h2>
        <p className="mt-2 text-sm text-slate-600">{ticket.description}</p>
        <div className="mt-4">
          <strong>Status:</strong> {ticket.status}
        </div>
      </div>
    </div>
  );
}
