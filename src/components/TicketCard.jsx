import PropTypes from "prop-types";
import { Pencil, Trash } from "lucide-react";

export default function TicketCard({ ticket, onEdit, onDelete }) {
  const statusClasses = {
    open: "bg-open/10 text-open",
    in_progress: "bg-in_progress/10 text-in_progress",
    closed: "bg-closed/10 text-closed",
  };
  return (
    <article
      className="card"
      role="article"
      aria-labelledby={`ticket-${ticket.id}-title`}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 id={`ticket-${ticket.id}-title`} className="font-semibold">
            {ticket.title}
          </h3>
          <p
            className="mt-2 text-sm text-slate-600"
            aria-label="Ticket description"
          >
            {ticket.description?.slice(0, 200)}
            {ticket.description?.length > 200 && "..."}
          </p>
        </div>
        <div className="text-right flex flex-col items-end gap-2">
          <span
            className={`status-tag ${statusClasses[ticket.status]}`}
            role="status"
            aria-label={`Ticket status: ${ticket.status.replace("_", " ")}`}
          >
            {ticket.status.replace("_", " ")}
          </span>
          <div className="flex gap-2" role="group" aria-label="Ticket actions">
            <button
              onClick={() => onEdit(ticket)}
              aria-label={`Edit ticket: ${ticket.title}`}
              className="text-sm p-2 cursor-pointer hover:bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Pencil className="size-4" />
            </button>
            <button
              onClick={() => onDelete(ticket.id)}
              aria-label={`Delete ticket: ${ticket.title}`}
              className="text-sm p-2 cursor-pointer hover:bg-red-50 text-red-600 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <Trash className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

TicketCard.propTypes = {
  ticket: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    status: PropTypes.oneOf(["open", "in_progress", "closed"]).isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
