import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTickets,
  deleteTicketAsync,
  createTicketAsync,
  updateTicketAsync,
} from "../features/tickets/ticketSlice";
import TicketCard from "../components/TicketCard";
import TicketForm from "../components/TicketForm";
import Modal from "../components/Modal";
import { notifyError, notifySuccess } from "../utils/utils";
import Sidebar from "../components/Sidebar";
import { supabase } from "../config/supabase";

export default function Tickets() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((s) => s.tickets);
  const [filter, setFilter] = useState("all");
  const [editing, setEditing] = useState(null);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    dispatch(fetchTickets())
      .unwrap()
      .catch(() => notifyError("Failed to load tickets. Please retry."));
  }, [dispatch]);

  function filtered() {
    if (!items) return [];
    if (filter === "all") return items;
    return items.filter((t) => t.status === filter);
  }

  async function handleCreate(data) {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("You must be logged in to create a ticket");

      const status =
        data.status === "in_progress" ? "in-progress" : data.status;
      const payload = {
        ...data,
        status,
        user_id: user.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      await dispatch(createTicketAsync(payload)).unwrap();
      notifySuccess("Ticket created");
    } catch (error) {
      notifyError("Failed to create ticket:", error.mesage);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete ticket? This action cannot be undone.")) return;
    try {
      await dispatch(deleteTicketAsync(id)).unwrap();
      notifySuccess("Ticket deleted");
    } catch {
      notifyError("Failed to delete ticket");
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        onCreateTicket={() => setCreateModalOpen(true)}
        isCollapsed={isSidebarCollapsed}
        onCollapse={setIsSidebarCollapsed}
      />
      <div
        className={`flex-1 overflow-y-auto transition-all duration-300 ${
          isSidebarCollapsed ? "md:pl-20" : "md:pl-64"
        }`}
      >
        <div className="container py-8 px-4 md:px-8">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Tickets</h1>
              <p className="text-gray-600 mt-1">
                Manage and track your tickets
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex gap-4">
              <button
                onClick={() => setCreateModalOpen(true)}
                className="btn bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                New Ticket
              </button>
            </div>
          </div>

          {/* Filters Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex-1">
                <div className="flex gap-2">
                  {["all", "open", "in_progress", "closed"].map((status) => (
                    <button
                      key={status}
                      onClick={() => setFilter(status)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        filter === status
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {status.charAt(0).toUpperCase() +
                        status.slice(1).replace("_", " ")}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <select
                  className="form-select rounded-lg border-gray-300 text-gray-700 text-sm focus:ring-blue-500 focus:border-blue-500"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="priority">Priority</option>
                </select>
              </div>
            </div>
          </div>

          {/* Tickets Grid */}
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div key={n} className="card animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : filtered().length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No tickets found
              </h3>
              <p className="text-gray-500 mb-6">
                Create a new ticket to get started
              </p>
              <button
                onClick={() => setCreateModalOpen(true)}
                className="btn bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg inline-flex items-center gap-2"
              >
                Create New Ticket
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered().map((t) => (
                <TicketCard
                  key={t.id}
                  ticket={t}
                  onEdit={(ticket) => setEditing(ticket)}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}

          {/* Create Ticket Modal */}
          <Modal
            isOpen={isCreateModalOpen}
            onClose={() => setCreateModalOpen(false)}
            title="Create New Ticket"
          >
            <TicketForm
              onSubmit={async (data) => {
                await handleCreate(data);
                setCreateModalOpen(false);
              }}
              onCancel={() => setCreateModalOpen(false)}
              submitLabel="Create Ticket"
            />
          </Modal>

          {/* Edit Ticket Modal */}
          <Modal
            isOpen={!!editing}
            onClose={() => setEditing(null)}
            title="Edit Ticket"
          >
            {editing && (
              <TicketForm
                initial={editing}
                onSubmit={async (data) => {
                  try {
                    await dispatch(
                      updateTicketAsync({ id: editing.id, payload: data })
                    ).unwrap();
                    setEditing(null);
                    notifySuccess("Ticket updated successfully");
                  } catch (error) {
                    notifyError(error.message || "Failed to update ticket");
                  }
                }}
                onCancel={() => setEditing(null)}
                submitLabel="Update Ticket"
              />
            )}
          </Modal>
        </div>
      </div>
    </div>
  );
}
