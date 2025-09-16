cat > src/components/Wallet.jsx <<EOL
import React, { useEffect, useState } from 'react';
const Wallet = ({ token }) => {
  const [wallet,setWallet]=useState({balance:0,history:[]});
  const [amount,setAmount]=useState('');
  const fetchWallet=async()=>{ const res=await fetch('http://localhost:3000/api/wallet',{headers:{Authorization:\`Bearer \${token}\`}}); if(res.ok)setWallet(await res.json()); }
  const handleWithdraw=async()=>{ const res=await fetch('http://localhost:3000/api/wallet/withdraw',{method:'POST',headers:{'Content-Type':'application/json',Authorization:\`Bearer \${token}\`},body:JSON.stringify({amount:parseFloat(amount)})}); if(res.ok){alert('Withdrawal success');fetchWallet();}else alert(await res.text());}
  useEffect(()=>{fetchWallet();},[]);
  return (<div className="p-6"><h2 className="text-2xl font-bold mb-2">Wallet</h2><p>Balance: ${wallet.balance.toFixed(2)}</p><input type="number" placeholder="Withdraw Amount" value={amount} onChange={e=>setAmount(e.target.value)} className="border p-2 m-2"/><button onClick={handleWithdraw} className="bg-green-500 text-white p-2 rounded">Withdraw</button><h3 className="mt-4 font-semibold">History:</h3><ul className="list-disc pl-5">{wallet.history.map((h,i)=><li key={i}>{h.amount} - {new Date(h.date).toLocaleString()}</li>)}</ul></div>);
};
export default Wallet;
EOL
