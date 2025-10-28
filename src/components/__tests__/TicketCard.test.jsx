import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import TicketCard from "./TicketCard";

describe("TicketCard", () => {
  const mockTicket = {
    id: 1,
    title: "Test Ticket",
    description: "Test Description",
    status: "open",
  };

  const mockOnEdit = vi.fn();
  const mockOnDelete = vi.fn();

  it("renders ticket information correctly", () => {
    render(
      <TicketCard
        ticket={mockTicket}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    // Check if title is rendered
    expect(screen.getByText("Test Ticket")).toBeInTheDocument();

    // Check if description is rendered
    expect(screen.getByText("Test Description")).toBeInTheDocument();

    // Check if status is rendered
    expect(screen.getByRole("status")).toHaveTextContent("open");
  });

  it("calls onEdit when edit button is clicked", () => {
    render(
      <TicketCard
        ticket={mockTicket}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    fireEvent.click(screen.getByLabelText(/edit ticket/i));
    expect(mockOnEdit).toHaveBeenCalledWith(mockTicket);
  });

  it("calls onDelete when delete button is clicked", () => {
    render(
      <TicketCard
        ticket={mockTicket}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    fireEvent.click(screen.getByLabelText(/delete ticket/i));
    expect(mockOnDelete).toHaveBeenCalledWith(mockTicket.id);
  });

  it("has proper accessibility attributes", () => {
    render(
      <TicketCard
        ticket={mockTicket}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    // Check if article has proper aria-labelledby
    const article = screen.getByRole("article");
    expect(article).toHaveAttribute(
      "aria-labelledby",
      `ticket-${mockTicket.id}-title`
    );

    // Check if action buttons are properly labeled
    expect(screen.getByLabelText(/edit ticket/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/delete ticket/i)).toBeInTheDocument();

    // Check if status has proper role and label
    const status = screen.getByRole("status");
    expect(status).toHaveAttribute("aria-label", "Ticket status: open");
  });
});
