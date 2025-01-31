import React, { createContext, useContext, useState, useEffect } from "react";

export interface Agent {
  id: number;
  name: string;
  email: string;
  status: "Active" | "Inactive";
  lastSeen: string;
}

export interface AgentContextType {
  agents: Agent[];
  addAgent: (agent: Omit<Agent, "id" | "lastSeen">) => void;
  updateAgent: (id: number, updatedAgent: Omit<Agent, "id" | "lastSeen">) => void;
  deleteAgent: (id: number) => void;
}

const AgentContext = createContext<AgentContextType | undefined>(undefined);

export const AgentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [agents, setAgents] = useState<Agent[]>(JSON.parse(localStorage.getItem("agents") || "[]"));

  useEffect(() => {
    localStorage.setItem("agents", JSON.stringify(agents));
  }, [agents]);

  const addAgent = (agent: Omit<Agent, "id" | "lastSeen">) => {
    setAgents([...agents, { ...agent, id: Date.now(), lastSeen: new Date().toISOString() }]);
  };

  const updateAgent = (id: number, updatedAgent: Omit<Agent, "id" | "lastSeen">) => {
    setAgents(
      agents.map((agent) => (agent.id === id ? { ...agent, ...updatedAgent } : agent))
    );
  };

  const deleteAgent = (id: number) => {
    setAgents(agents.filter((agent) => agent.id !== id));
  };

  return (
    <AgentContext.Provider value={{ agents, addAgent, updateAgent, deleteAgent }}>
      {children}
    </AgentContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAgents = () => {
  const context = useContext(AgentContext);
  if (!context) throw new Error("useAgents must be used within AgentProvider");
  return context;
};