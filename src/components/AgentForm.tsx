import React, { useState } from "react";
import { useAgents } from "../context/AgentContext";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/AgentForm.css"; // Make sure the styles are imported

const AgentForm: React.FC = () => {
  const { agents, addAgent, updateAgent } = useAgents();
  const navigate = useNavigate();
  const { id } = useParams();
  const existingAgent = agents.find((agent) => agent.id === Number(id));
  const [name, setName] = useState(existingAgent?.name || "");
  const [email, setEmail] = useState(existingAgent?.email || "");
  const [status, setStatus] = useState<"Active" | "Inactive">(
    existingAgent?.status || "Active"
  );

  const handleClose = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      navigate("/");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (existingAgent) {
      updateAgent(existingAgent.id, { name, email, status });
    } else {
      addAgent({ name, email, status });
    }
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="agent-form-container" onClick={handleClose}>
      <form className="agent-form" onSubmit={handleSubmit}>
        <h1>{existingAgent ? "Edit Agent" : "Add Agent"}</h1>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as "Active" | "Inactive")}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <div className="button-group">
          <button className="submit-button" type="submit">
            {existingAgent ? "Update" : "Add"} Agent
          </button>
          <button type="button" className="cancel-button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AgentForm;
