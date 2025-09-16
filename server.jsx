import React, { useState, useEffect } from 'react';

const colors = ['#FF5733','#33FF57','#3357FF','#F333FF','#33FFF3'];

const Dashboard = ({ token }) => {
  const [data, setData] = useState({ hashrate: '0 MH/s', earnings: '$0.00', miners: 0, referral: null });
  const [color, setColor] = useState(colors[0]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/dashboard', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (res.ok) {
          const json = await res.json();
          setData(json);
          setColor(colors[Math.floor(Math.random()*colors.length)]);
        }
      } catch (err) { console.error(err); }
    };
    const interval = setInterval(fetchData, 3000); // realtime update
    fetchData();
    return () => clearInterval(interval);
  }, [token]);

  return (
    <div style={{ padding:'20px', fontFamily:'Arial', transition:'all 0.5s', backgroundColor: color, color:'#fff', borderRadius:'12px'}}>
      <h1>LostMining Clone Dashboard</h1>
      <h2>Hashrate: {data.hashrate}</h2>
      <h2>Total Earnings: {data.earnings}</h2>
      <h2>Active Miners: {data.miners}</h2>
      {data.referral && <h3>Referred by: {data.referral}</h3>}
      <button style={{marginTop:'20px', padding:'10px', borderRadius:'8px', cursor:'pointer'}}>Claim Rewards</button>
    </div>
  );
};

export default Dashboard;
