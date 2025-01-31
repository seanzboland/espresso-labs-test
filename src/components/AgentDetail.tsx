import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAgents } from "../context/AgentContext";

import "../styles/AgentDetail.css";

const AgentDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { agents } = useAgents();
  const agent = agents.find((agent) => agent.id === Number(id));

  if (!agent) {
    return <div>Agent not found</div>;
  }

  return (
    <div className="agent-detail-container">
      <h2>Agent Detail</h2>
      <div className="agent-detail">
        <p><strong>Name:</strong> {agent.name}</p>
        <p><strong>Email:</strong> {agent.email}</p>
        <p><strong>Status:</strong> {agent.status}</p>
        <p><strong>Last Seen:</strong> {agent.lastSeen}</p>
      </div>
      <button onClick={() => navigate("/")} className="back-button">
        Back to Agent List
      </button>
    </div>
  );
};

export default AgentDetail;
