import React from "react";
import { useAgents } from "../context/AgentContext";
import { Link, useNavigate } from "react-router-dom";
import "../styles/AgentList.css";

const AgentList: React.FC = () => {
  const { agents, deleteAgent } = useAgents();
  const navigate = useNavigate();

  return (
    <div className="agent-list-container">
      <h2>Agent List</h2>
      <div className="actions">
        <button
          className="add-agent-button"
          onClick={() => navigate("/add")}
        >
          Add Agent
        </button>
      </div>
      <table className="agent-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Last Seen</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {agents.map((agent) => (
            <tr key={agent.id}>
              <td>
                <Link to={`/agent/${agent.id}`}>
                  {agent.name}
                </Link>
              </td>
              <td>{agent.email}</td>
              <td>{agent.status}</td>
              <td>{agent.lastSeen}</td>
              <td className="actions-cell">
                <button onClick={() => navigate(`/edit/${agent.id}`)}>Edit</button>
                <button onClick={() => deleteAgent(agent.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AgentList;
