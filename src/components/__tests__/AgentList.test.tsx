import { render, screen, fireEvent } from "@testing-library/react";
import { AgentProvider } from "../../context/AgentContext";
import AgentList from "../AgentList";
import { BrowserRouter as Router } from "react-router-dom";

describe("AgentList Component", () => {
  it("renders the agent list and add button", () => {
    render(
      <Router>
        <AgentProvider>
          <AgentList />
        </AgentProvider>
      </Router>
    );

    expect(screen.getByText("Agent List")).toBeInTheDocument();
    expect(screen.getByText("Add Agent")).toBeInTheDocument();
  });

  it("displays agents in the list", () => {
    const mockAgents = [
      { id: 1, name: "John Doe", email: "john@example.com", status: "Active", lastSeen: "2023-10-01" },
    ];

    jest.spyOn(Storage.prototype, "getItem").mockReturnValueOnce(JSON.stringify(mockAgents));

    render(
      <Router>
        <AgentProvider>
          <AgentList />
        </AgentProvider>
      </Router>
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("navigates to the add agent page when the add button is clicked", () => {
    render(
      <Router>
        <AgentProvider>
          <AgentList />
        </AgentProvider>
      </Router>
    );

    fireEvent.click(screen.getByText("Add Agent"));
    expect(window.location.pathname).toBe("/add");
  });
});