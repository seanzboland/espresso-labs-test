import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { AgentProvider } from "../../context/AgentContext";
import AgentForm from "../AgentForm";
import { BrowserRouter as Router } from "react-router-dom";

describe("AgentForm Component", () => {
  it("renders the form for adding an agent", () => {
    render(
      <Router>
        <AgentProvider>
          <AgentForm />
        </AgentProvider>
      </Router>
    );

    expect(screen.getByText("Add Agent")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add Agent" })).toBeInTheDocument();
  });

  it("submits the form and adds a new agent", () => {
    const { getByPlaceholderText, getByRole } = render(
      <Router>
        <AgentProvider>
          <AgentForm />
        </AgentProvider>
      </Router>
    );

    fireEvent.change(getByPlaceholderText("Name"), { target: { value: "Jane Doe" } });
    fireEvent.change(getByPlaceholderText("Email"), { target: { value: "jane@example.com" } });
    fireEvent.click(getByRole("button", { name: "Add Agent" }));

    expect(window.location.pathname).toBe("/");
  });

  it("renders the form for editing an agent", () => {
    const agent = { id: 1, name: "John Doe", email: "john@example.com", status: "Active", lastSeen: "2023-10-01" };

    render(
      <Router>
        <AgentProvider initialAgents={[agent]}>
          <AgentForm />
        </AgentProvider>
      </Router>
    );

    expect(screen.getByText("Edit Agent")).toBeInTheDocument();
    expect(screen.getByDisplayValue("John Doe")).toBeInTheDocument();
    expect(screen.getByDisplayValue("john@example.com")).toBeInTheDocument();
  });
});