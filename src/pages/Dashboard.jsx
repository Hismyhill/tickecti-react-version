import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTickets,
  createTicketAsync,
  updateTicketAsync,
  deleteTicketAsync,
} from "../features/tickets/ticketSlice";
import TicketCard from "../components/TicketCard";
import TicketForm from "../components/TicketForm";
import Modal from "../components/Modal";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import { notifyError, notifySuccess } from "../utils/utils";
import { supabase } from "../config/supabase";
import { Ticket, Clock, Zap, CheckCircle2, PlusCircleIcon } from "lucide-react";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((s) => s.tickets);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(null);

  async function getUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("You must be logged in to create a ticket");
    return setUser(user);
  }
  useEffect(() => {
    getUser();
  }, []);

  async function handleCreate(data) {
    try {
      // Convert the status to match database format
      const status =
        data.status === "in_progress" ? "in-progress" : data.status;

      const payload = {
        ...data,
        status,
        user_id: user.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      console.log("Creating ticket with payload:", payload);
      await dispatch(createTicketAsync(payload)).unwrap();
      notifySuccess("Ticket created successfully");
      setCreateModalOpen(false);
    } catch (error) {
      console.error("Create ticket error:", error);
      notifyError(error.message || "Failed to create ticket");
    }
  }

  useEffect(() => {
    dispatch(fetchTickets())
      .unwrap()
      .catch(() => {
        notifyError("Failed to load tickets. Please retry.");
      });
  }, [dispatch]);

  const total = items.length;
  const open = items.filter((t) => t.status === "open").length;
  const inProgress = items.filter((t) => t.status === "in-progress").length;
  const closed = items.filter((t) => t.status === "closed").length;

  const getProgressPercentage = () => {
    if (total === 0) return 0;
    return Math.round((closed / total) * 100);
  };

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
        className={`flex-1 overflow-y-auto transition-all duration-300 relative z-0 ${
          isSidebarCollapsed ? "md:pl-20" : "md:pl-64"
        }`}
      >
        <div className="container py-8 px-4 md:px-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
              <p className="text-gray-600 mt-1 flex gap-4">
                <span className="text-base font-semibold">
                  {" "}
                  Welcome, {user?.user_metadata?.full_name.split(" ")[0]}
                </span>
                &mdash; Track and manage your support tickets
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <button
                onClick={() => setCreateModalOpen(true)}
                className="btn bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2"
              >
                <PlusCircleIcon className="w-6 h-6" />
                Create New Ticket
              </button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="card bg-linear-to-br from-blue-50 to-blue-100 border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-blue-600 font-semibold">Total Tickets</h4>
                  <div className="mt-2 text-3xl font-bold text-gray-800">
                    {total}
                  </div>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Ticket class="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 h-1 bg-blue-200 rounded-full overflow-hidden">
                <div
                  className="h-1 bg-blue-600 rounded-full"
                  style={{ width: `${getProgressPercentage()}%` }}
                ></div>
              </div>
              <div className="mt-2 text-sm text-blue-600">
                {getProgressPercentage()}% resolved
              </div>
            </div>

            <div className="card bg-linear-to-br from-green-50 to-green-100 border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-green-600 font-semibold">Open Tickets</h4>
                  <div className="mt-2 text-3xl font-bold text-gray-800">
                    {open}
                  </div>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Clock class="w-6 h-6 text-green-600" />
                </div>
              </div>
              <p className="mt-2 text-sm text-green-600">
                {open > 0 ? "Needs attention" : "All caught up!"}
              </p>
            </div>

            <div className="card bg-linear-to-br from-yellow-50 to-yellow-100 border border-yellow-200">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-yellow-600 font-semibold">In Progress</h4>
                  <div className="mt-2 text-3xl font-bold text-gray-800">
                    {inProgress}
                  </div>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Zap class="w-6 h-6 text-yellow-600" />
                </div>
              </div>
              <p className="mt-2 text-sm text-yellow-600">Being handled</p>
            </div>

            <div className="card bg-linear-to-br from-gray-50 to-gray-100 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-gray-600 font-semibold">
                    Closed Tickets
                  </h4>
                  <div className="mt-2 text-3xl font-bold text-gray-800">
                    {closed}
                  </div>
                </div>
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <CheckCircle2 class="w-6 h-6 text-gray-600" />
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Successfully resolved
              </p>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-4 mb-6 border-b border-gray-200">
            {["all", "open", "in-progress", "closed"].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 font-medium ${
                  selectedFilter === filter
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>

          {/* Recent Tickets */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">
                Recent Tickets
              </h3>
              <Link
                to="/tickets"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                View all tickets →
              </Link>
            </div>

            {loading ? (
              <div className="grid md:grid-cols-3 gap-6">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="card animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : items.length === 0 ? (
              <div className="card text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto flex items-center justify-center mb-4">
                  <Ticket className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No tickets found
                </h3>
                <p className="text-gray-500 mb-6">
                  Get started by creating your first support ticket
                </p>
                <button
                  onClick={() => setCreateModalOpen(true)}
                  className="btn bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg inline-flex items-center gap-2"
                >
                  Create New Ticket
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-6">
                {items
                  .filter(
                    (t) =>
                      selectedFilter === "all" || t.status === selectedFilter
                  )
                  .slice(0, 6)
                  .map((t) => (
                    <TicketCard
                      key={t.id}
                      ticket={t}
                      onEdit={() => setEditing(t)}
                      onDelete={handleDelete}
                    />
                  ))}
              </div>
            )}
          </section>

          {/* Create Ticket Modal */}
          <Modal
            isOpen={isCreateModalOpen}
            onClose={() => setCreateModalOpen(false)}
            title="Create New Ticket"
          >
            <TicketForm
              onSubmit={handleCreate}
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
