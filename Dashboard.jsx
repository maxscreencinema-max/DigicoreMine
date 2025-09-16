mkdir -p src/components
cat > src/components/Dashboard.jsx <<EOL
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
const socket = io('http://localhost:3000');
const Dashboard = () => {
  const [stats,setStats]=useState({hashrate:'0 MH/s',earnings:'$0.00',miners:0});
  useEffect(()=>{
    socket.on('miningStats',data=>setStats(data[0]||stats));
    return ()=>socket.off('miningStats');
  },[]);
  return (
    <div className="p-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white rounded-xl">
      <h1 className="text-3xl font-bold mb-4">LostMining Clone Dashboard</h1>
      <p>Hashrate: {stats.hashrate}</p>
      <p>Total Earnings: {stats.earnings}</p>
      <p>Active Miners: {stats.miners}</p>
    </div>
  );
};
export default Dashboard;
EOL
