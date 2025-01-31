import React from "react";
import { render, screen } from "@testing-library/react";
import { Agent, AgentProvider, useAgents } from "../AgentContext";

const TestComponent = () => {
  const { agents } = useAgents();
  return (
    <div>
      {agents.map((agent) => (
        <div key={agent.id}>{agent.name}</div>
      ))}
    </div>
  );
};

describe("AgentContext", () => {
  it("provides the initial agents", () => {
    const mockAgents = [
      { id: 1, name: "John Doe", email: "john@example.com", status: "Active", lastSeen: "2023-10-01" },
    ];

    jest.spyOn(Storage.prototype, "getItem").mockReturnValueOnce(JSON.stringify(mockAgents));

    render(
      <AgentProvider>
        <TestComponent />
      </AgentProvider>
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });
});