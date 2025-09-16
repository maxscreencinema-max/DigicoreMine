cat > src/components/MiningPool.jsx <<EOL
import React, { useEffect, useState } from 'react';
const MiningPool = ({ token }) => {
  const [pools,setPools]=useState([]);
  const [poolName,setPoolName]=useState('');
  const fetchPools=async()=>{const res=await fetch('http://localhost:3000/api/pools'); if(res.ok)setPools(await res.json());}
  const createPool=async()=>{const res=await fetch('http://localhost:3000/api/pools',{method:'POST',headers:{'Content-Type':'application/json',Authorization:\`Bearer \${token}\`},body:JSON.stringify({name:poolName})}); if(res.ok){alert('Pool created');setPoolName('');fetchPools();}}
  useEffect(()=>{fetchPools();},[]);
  return (<div className="p-6"><h2 className="text-2xl font-bold mb-2">Mining Pools</h2><input placeholder="New Pool Name" value={poolName} onChange={e=>setPoolName(e.target.value)} className="border p-2 m-2"/><button onClick={createPool} className="bg-blue-500 text-white p-2 rounded">Create Pool</button><ul className="mt-4 list-disc pl-5">{pools.map((p,i)=><li key={i}>{p.name} - Owner: {p.owner} - Miners: {p.miners.join(', ')}</li>)}</ul></div>);
};
export default MiningPool;
EOL
