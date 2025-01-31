import React from "react";
import AgentList from "../components/AgentList";

import "../styles/Home.css";


const Home: React.FC = () => {
  return (
    <div>
      <h1>Agent Management</h1>
      <AgentList />
    </div>
  );
};

export default Home;
