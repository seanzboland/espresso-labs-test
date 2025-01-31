import React from "react";
import { render, screen } from "@testing-library/react";
import { AgentProvider } from "../../context/AgentContext";
import AgentDetail from "../AgentDetail";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

describe("AgentDetail Component", () => {
  it("renders the agent details", () => {
    const agent = { id: 1, name: "John Doe", email: "john@example.com", status: "Active", lastSeen: "2023-10-01" };

    render(
      <Router>
        <AgentProvider initialAgents={[agent]}>
          <Routes>
            <Route path="/agent/:id" element={<AgentDetail />} />
          </Routes>
        </AgentProvider>
      </Router>
    );

    expect(screen.getByText("Agent Detail")).toBeInTheDocument();
    expect(screen.getByText("Name: John Doe")).toBeInTheDocument();
    expect(screen.getByText("Email: john@example.com")).toBeInTheDocument();
    expect(screen.getByText("Status: Active")).toBeInTheDocument();
  });

  it("displays a message if the agent is not found", () => {
    render(
      <Router>
        <AgentProvider>
          <Routes>
            <Route path="/agent/:id" element={<AgentDetail />} />
          </Routes>
        </AgentProvider>
      </Router>
    );

    expect(screen.getByText("Agent not found")).toBeInTheDocument();
  });
});