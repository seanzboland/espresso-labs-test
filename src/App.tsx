import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AgentProvider } from "./context/AgentContext";
import AgentList from "./components/AgentList";
import AgentForm from "./components/AgentForm";
import AgentDetail from "./components/AgentDetail";

const App: React.FC = () => {
  return (
    <AgentProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AgentList />} />
          <Route path="/add" element={<AgentForm />} />
          <Route path="/edit/:id" element={<AgentForm />} />
          <Route path="/agent/:id" element={<AgentDetail />} /> {/* Add this route */}
        </Routes>
      </Router>
    </AgentProvider>
  );
};

export default App;
